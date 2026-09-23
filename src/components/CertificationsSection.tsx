import { useEffect, useRef, useState, type MouseEvent } from "react";
import { format, parseISO } from "date-fns";
import {
  BadgeCheck,
  CalendarClock,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/* Self-hosted copies of the issuers' badge art, so the section never depends
   on (or leaks visits to) learn.microsoft.com and badgr at page load. */
import fundamentalsBadge from "@/assets/certs/ms-fundamentals.svg";
import associateBadge from "@/assets/certs/ms-associate.svg";
import expertBadge from "@/assets/certs/ms-expert.svg";
import postmanBadge from "@/assets/certs/postman.webp";

type Cert = {
  code: string;
  level: string;
  title: string;
  exam?: string;
  blurb: string;
  /* ISO date; null while the exam is still ahead. */
  earned: string | null;
  planned?: string;
  link: string;
  badge: string;
};

/* Microsoft's Azure role-based path, in the order it is walked. */
const azurePath: Cert[] = [
  {
    code: "AZ-900",
    level: "Fundamentals",
    title: "Azure Fundamentals",
    blurb:
      "Cloud concepts, core Azure architecture and services, cost management, governance and compliance.",
    earned: "2026-01-12",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/waelkattan/D8D6748001BDAA5C?sharingId=CD1723331A944650",
    badge: fundamentalsBadge,
  },
  {
    code: "AZ-104",
    level: "Associate",
    title: "Azure Administrator Associate",
    blurb:
      "Running Azure for real: identities and governance, storage, compute, virtual networking, monitoring and backup.",
    earned: "2026-09-14",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/waelkattan/685E378CAFAA7E3?sharingId=CD1723331A944650",
    badge: associateBadge,
  },
  {
    code: "AZ-305",
    level: "Expert",
    title: "Azure Solutions Architect Expert",
    exam: "Designing Microsoft Azure Infrastructure Solutions",
    blurb:
      "Designing whole solutions: identity and governance, data storage, business continuity and infrastructure.",
    earned: null,
    planned: "2027",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/",
    badge: expertBadge,
  },
];

const otherCerts = [
  {
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    earned: "2025-05-22",
    link: "https://api.badgr.io/public/assertions/paubQ3MsT-2PVTc-tERBCQ?identity__email=qatanwail%40gmail.com",
    badge: postmanBadge,
  },
];

const earnedPath = azurePath.filter((c) => c.earned);
const latest = [...earnedPath].sort((a, b) => b.earned!.localeCompare(a.earned!))[0];
const next = azurePath.find((c) => !c.earned);
// parseISO reads a bare date as local midnight; new Date() would read it as
// UTC and show the day before anywhere west of Greenwich.
const fmt = (iso: string, pattern = "d MMM yyyy") => format(parseISO(iso), pattern);

/* Flips to true the first time the element scrolls into view. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/* A card that leans toward the cursor, with a soft highlight under it. */
const CertCard = ({ cert, step }: { cert: Cert; step: number }) => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isLatest = cert === latest;
  const earned = Boolean(cert.earned);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    if (reducedMotion) return;
    el.style.setProperty("--rx", `${(0.5 - py) * 9}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 11}deg`);
  };

  const onMouseLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 pt-8 text-center backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out",
        earned
          ? "border-border/70 bg-card/70 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
          : "border-dashed border-border bg-card/35",
        isLatest && "border-primary/50 shadow-xl shadow-primary/10"
      )}
      style={{
        transform:
          "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 0%), hsl(var(--primary) / 0.16), transparent 45%)",
        }}
      />

      {isLatest && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
          <Sparkles className="h-3 w-3" /> Latest
        </span>
      )}

      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:hidden">
        Step {step} · {cert.level}
      </p>

      <div className="relative mx-auto mb-5 h-32 w-32">
        {earned && (
          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-full bg-primary/35 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
          />
        )}
        <img
          src={cert.badge}
          alt={
            earned
              ? `Microsoft Certified: ${cert.title} badge`
              : `${cert.title} badge — not yet earned`
          }
          loading="lazy"
          className={cn(
            "relative h-full w-full drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3",
            !earned && "opacity-40 grayscale"
          )}
        />
      </div>

      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wider",
          earned ? "text-primary" : "text-muted-foreground"
        )}
      >
        {earned ? "Microsoft Certified" : "Next goal"}
      </p>
      <h3 className="mt-1 text-lg font-semibold leading-snug">{cert.title}</h3>
      {cert.exam && (
        <p className="mt-1 text-xs text-muted-foreground">Exam: {cert.exam}</p>
      )}
      <p className="mt-3 text-sm text-muted-foreground">{cert.blurb}</p>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground">
            {cert.code}
          </span>
          {earned ? (
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <BadgeCheck className="h-4 w-4" /> Earned {fmt(cert.earned!)}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-300/90">
              <CalendarClock className="h-4 w-4" /> Planned for {cert.planned}
            </span>
          )}
        </div>

        <Button
          asChild
          size="sm"
          variant={earned ? "default" : "outline"}
          className="mt-4 w-full"
        >
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5"
          >
            {earned ? (
              <>
                <ShieldCheck className="h-4 w-4" /> Verify credential
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4" /> About the certification
              </>
            )}
          </a>
        </Button>
      </div>
    </article>
  );
};

/* Desktop stepper above the cards: solid where the path is walked, dashed ahead. */
const PathTrack = () => {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const doneFraction = (earnedPath.length - 1) / (azurePath.length - 1);

  return (
    <div ref={ref} className="relative mb-8 hidden md:grid md:grid-cols-3" aria-hidden="true">
      <div className="absolute left-[16.667%] right-[16.667%] top-5 h-0.5">
        <div className="absolute inset-0 border-t-2 border-dashed border-border" />
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 via-primary to-primary transition-[width] ease-out [transition-duration:1400ms]"
          style={{ width: seen ? `${doneFraction * 100}%` : "0%" }}
        />
      </div>

      {azurePath.map((cert, i) => {
        const earned = Boolean(cert.earned);
        return (
          <div key={cert.code} className="relative flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-500",
                earned
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "border-2 border-dashed border-muted-foreground/40 bg-background text-muted-foreground",
                cert === latest && "ring-4 ring-primary/25",
                seen ? "scale-100 opacity-100" : "scale-75 opacity-0"
              )}
              style={{ transitionDelay: `${i * 350}ms` }}
            >
              {earned ? <Check className="h-5 w-5" /> : i + 1}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {cert.level}
            </span>
            <span className="text-xs text-muted-foreground">
              {earned ? fmt(cert.earned!, "MMM yyyy") : `Planned ${cert.planned}`}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const CertificationsSection = () => {
  const earnedCount = earnedPath.length + otherCerts.length;

  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Certifications</h2>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-lg text-muted-foreground">
            I'm working through Microsoft's Azure path, from cloud fundamentals
            to administering Azure day to day, and next to designing it as a
            solutions architect.
          </p>

          <dl className="grid grid-cols-3 gap-3 text-center sm:gap-4">
            <div className="surface-card px-3 py-3 sm:px-4">
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Earned</dt>
              <dd className="whitespace-nowrap text-xl font-bold sm:text-2xl text-foreground">{earnedCount}</dd>
            </div>
            <div className="surface-card px-3 py-3 sm:px-4">
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Latest</dt>
              <dd className="whitespace-nowrap text-xl font-bold sm:text-2xl text-primary">{latest.code}</dd>
            </div>
            {next && (
              <div className="surface-card border-dashed px-3 py-3 sm:px-4">
                <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Next up</dt>
                <dd className="whitespace-nowrap text-xl font-bold sm:text-2xl text-muted-foreground">{next.code}</dd>
              </div>
            )}
          </dl>
        </div>

        <PathTrack />

        <ol className="grid gap-6 md:grid-cols-3">
          {azurePath.map((cert, i) => (
            <li key={cert.code}>
              <CertCard cert={cert} step={i + 1} />
            </li>
          ))}
        </ol>

        <h3 className="mb-4 mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Also certified
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {otherCerts.map((cert) => (
            <a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group flex items-center gap-5 p-5 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <img
                src={cert.badge}
                alt={`${cert.name} badge`}
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-full shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold leading-snug">{cert.name}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {cert.issuer} · Earned {fmt(cert.earned)}
                </p>
              </div>
              <span className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary sm:inline-flex">
                Verify <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
