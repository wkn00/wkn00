// cv-mailer: emails the CV to a visitor who asks for it.
//
// Runs as a sidecar next to nginx in the wael-frontend pod; nginx proxies
// /api/ here over localhost, so this only listens on 127.0.0.1.
//
// POST /api/cv {"email": "...", "website": ""}
//   1. syntax check
//   2. the domain (or a parent of it) is on a disposable-domain blocklist -> reject
//   3. the domain has no MX record, or a null MX -> reject (it can't receive mail)
//   4. any MX host belongs to a blocklisted domain -> reject (custom domains
//      pointed at a throwaway inbox provider)
//   5. rate limits, then send the PDF as an attachment over Gmail SMTP
// "website" is a honeypot: the form hides it, so only bots fill it in.

import http from "node:http";
import fs from "node:fs";
import { promises as dns } from "node:dns";
import nodemailer from "nodemailer";

const PORT = Number(process.env.PORT ?? 8080);
const CV_PATH = process.env.CV_PATH ?? "/cv/Wael_Kattan_CV.pdf";
const BLOCKLIST_PATH = process.env.BLOCKLIST_PATH ?? new URL("./blocklist.txt", import.meta.url).pathname;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
// DRY_RUN=1 runs every check but logs instead of sending (local testing).
const DRY_RUN = process.env.DRY_RUN === "1";

// Mainstream providers that must never be treated as disposable, whatever
// the upstream lists say.
const ALWAYS_OK = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "msn.com",
  "yahoo.com", "icloud.com", "me.com", "proton.me", "protonmail.com", "aol.com",
  "online.no", "live.no", "hotmail.no", "outlook.no", "yahoo.no",
]);

const blocklist = new Set(
  fs.readFileSync(BLOCKLIST_PATH, "utf8")
    .split("\n")
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l && !l.startsWith("#") && !ALWAYS_OK.has(l))
);
console.log(`loaded ${blocklist.size} disposable domains`);

/* True when the domain or any parent of it is blocklisted (x.mailinator.com). */
function isBlocked(domain) {
  const parts = domain.toLowerCase().replace(/\.$/, "").split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    if (blocklist.has(parts.slice(i).join("."))) return true;
  }
  return false;
}

const EMAIL_RE = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)$/i;

const withTimeout = (p, ms) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);

async function checkEmail(raw) {
  const email = String(raw ?? "").trim().toLowerCase();
  const m = email.length <= 254 && EMAIL_RE.exec(email);
  if (!m || email.split("@")[0].length > 64 || !/[a-z]/.test(m[1].split(".").pop())) {
    return { ok: false, code: "invalid", message: "That doesn't look like a valid email address." };
  }
  const domain = m[1];
  const disposable = {
    ok: false,
    code: "disposable",
    message: "Temporary or disposable email addresses aren't accepted. Please use your regular email.",
  };
  if (isBlocked(domain)) return disposable;

  let mx;
  try {
    mx = await withTimeout(dns.resolveMx(domain), 5000);
  } catch (e) {
    if (e.message === "timeout" || e.code === "ETIMEOUT" || e.code === "ESERVFAIL") {
      return { ok: false, code: "dns", message: "Couldn't verify that email domain right now. Please try again." };
    }
    mx = [];
  }
  mx = mx.filter((r) => r.exchange && r.exchange !== ".");
  if (mx.length === 0) {
    return { ok: false, code: "no_mx", message: "That email domain can't receive mail. Please check the address." };
  }
  if (mx.some((r) => isBlocked(r.exchange))) return disposable;

  return { ok: true, email };
}

// In-memory limits. With two replicas each pod counts on its own, so the
// effective ceilings are up to twice these; that is fine for this purpose.
const HOUR = 3600_000;
const DAY = 24 * HOUR;
const hits = new Map(); // key -> timestamps
function limited(key, max, windowMs) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}
setInterval(() => {
  const now = Date.now();
  for (const [k, list] of hits) if (list.every((t) => now - t > DAY)) hits.delete(k);
}, HOUR).unref();

const transport =
  GMAIL_USER && GMAIL_APP_PASSWORD
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      })
    : null;
if (!transport && !DRY_RUN) console.warn("GMAIL_USER / GMAIL_APP_PASSWORD not set: sending is disabled");

async function sendCv(to) {
  const pdf = fs.readFileSync(CV_PATH); // read per send so a rotated Secret is picked up
  const mail = {
    from: `"Wael Kattan" <${GMAIL_USER}>`,
    to,
    replyTo: GMAIL_USER,
    subject: "Wael Kattan - CV",
    text: [
      "Hi,",
      "",
      "Thanks for your interest. My CV is attached as a PDF.",
      "",
      "You can reach me by replying to this email or on +47 9666 84 27.",
      "Portfolio: https://wael.elfaheem.com",
      "",
      "Best regards,",
      "Wael Kattan",
    ].join("\n"),
    attachments: [{ filename: "Wael_Kattan_CV.pdf", content: pdf, contentType: "application/pdf" }],
  };
  if (DRY_RUN) {
    console.log(`[dry-run] would send ${pdf.length} byte CV to ${to}`);
    return;
  }
  await transport.sendMail(mail);
}

function reply(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/health") return reply(res, 200, { ok: true });
  if (req.url !== "/api/cv") return reply(res, 404, { ok: false });
  if (req.method !== "POST") return reply(res, 405, { ok: false });

  let size = 0;
  const chunks = [];
  req.on("data", (c) => {
    size += c.length;
    if (size > 2048) req.destroy();
    else chunks.push(c);
  });
  req.on("end", async () => {
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return reply(res, 400, { ok: false, code: "invalid", message: "Bad request." });
    }
    // Honeypot filled in: pretend it worked so the bot moves on.
    if (body.website) return reply(res, 200, { ok: true });

    const ip = req.headers["x-real-ip"] || req.socket.remoteAddress;
    if (limited(`ip:${ip}`, 8, HOUR)) {
      return reply(res, 429, { ok: false, code: "rate", message: "Too many requests. Please try again later." });
    }

    const check = await checkEmail(body.email);
    if (!check.ok) {
      console.log(`rejected ${check.code}: ${String(body.email).slice(0, 80)}`);
      return reply(res, 422, check);
    }

    if (!transport && !DRY_RUN) {
      return reply(res, 503, {
        ok: false,
        code: "unavailable",
        message: "Sending isn't available right now. Please contact me directly instead.",
      });
    }
    if (limited(`to:${check.email}`, 2, DAY) || limited("global", 150, DAY)) {
      return reply(res, 429, { ok: false, code: "rate", message: "Too many requests. Please try again later." });
    }

    try {
      await sendCv(check.email);
      console.log(`sent CV to ${check.email}`);
      reply(res, 200, { ok: true });
    } catch (e) {
      console.error(`send failed for ${check.email}: ${e.message}`);
      // 500, not 502: Cloudflare swaps an origin 502 for its own error page
      reply(res, 500, {
        ok: false,
        code: "send",
        message: "Couldn't send the email right now. Please try again later, or contact me directly.",
      });
    }
  });
});

server.listen(PORT, process.env.HOST ?? "127.0.0.1", () => console.log(`cv-mailer on :${PORT}`));
for (const sig of ["SIGTERM", "SIGINT"]) process.on(sig, () => server.close(() => process.exit(0)));
