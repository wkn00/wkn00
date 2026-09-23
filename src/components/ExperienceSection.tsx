import { useState } from "react";
import {
  addMonths,
  differenceInCalendarMonths,
  format,
  parseISO,
  startOfMonth,
} from "date-fns";
import { ArrowRight, Briefcase, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = {
  id: string;
  title: string;
  /* Shorter title for the timeline's label column. */
  short?: string;
  company: string;
  /* "YYYY-MM"; end is null while the role is ongoing. */
  start: string;
  end: string | null;
  track: "it" | "other";
  description: string[];
  tags: string[];
  related?: { label: string; href: string };
};

const roles: Role[] = [
  {
    id: "exp-atea",
    title: "IT Consultant",
    company: "Atea",
    start: "2025-10",
    end: null,
    track: "it",
    description: [
      "First point of contact on the Service Desk, handling incoming calls and providing technical troubleshooting",
      "Diagnose and resolve a wide range of software, hardware, and network issues for end-users",
      "Document technical issues, solutions, and processes to improve service desk efficiency",
      "Escalate complex cases to appropriate technical teams while maintaining ownership of user communication",
      "Contribute to maintaining service level agreements (SLAs) and user satisfaction metrics",
    ],
    tags: ["Service desk", "Troubleshooting", "Networking", "SLAs", "Documentation"],
  },
  {
    id: "exp-power-support",
    title: "IT Support",
    company: "Power",
    start: "2023-02",
    end: "2025-10",
    track: "it",
    description: [
      "Provided first-line technical support and troubleshooting for hardware and software issues",
      "Documented recurring issues and contributed to process improvement",
      "Collaborated with internal teams to ensure stable daily operations",
    ],
    tags: ["First-line support", "Hardware", "Software", "Process improvement"],
  },
  {
    id: "exp-power-intern",
    title: "Software Development Intern",
    short: "Software Intern",
    company: "Power & UiA",
    start: "2024-05",
    end: "2024-12",
    track: "it",
    description: [
      "Designed and developed a desktop application to automate internal workflows",
      "Led the full development cycle from requirements gathering to deployment",
      "Worked cross-functionally with business and technical teams",
      "Documented the project for handoff and future maintenance",
    ],
    tags: ["Python", "PyQt", "Automation", "Requirements", "Documentation"],
    related: { label: "Power's desktop apps in Projects", href: "#project-autotag" },
  },
  {
    id: "exp-tolkenett",
    title: "Interpreter",
    company: "Tolkenett",
    start: "2022-10",
    end: null,
    track: "other",
    description: [
      "Facilitated communication between clients and public services (e.g. NAV, healthcare, education)",
      "Adapted quickly to sensitive or high-stakes scenarios requiring precision and neutrality",
      "Managed scheduling and reporting independently in a freelance capacity",
    ],
    tags: ["Communication", "Public services", "Freelance"],
  },
  {
    id: "exp-kiwi",
    title: "Store Supervisor",
    company: "Kiwi",
    start: "2021-08",
    end: "2023-04",
    track: "other",
    description: [
      "Responsible for opening and closing the store, cash handling, and shift leadership",
      "Interacted with customers and ensured smooth daily operations",
      "Followed operational routines and contributed to team performance",
    ],
    tags: ["Shift leadership", "Customer service", "Cash handling"],
  },
];

const NOW = new Date();
const startOf = (r: Role) => parseISO(`${r.start}-01`);
/* Last day of the end month, or today for an ongoing role. */
const endOf = (r: Role) => (r.end ? addMonths(parseISO(`${r.end}-01`), 1) : NOW);

/* Counted the way CVs count them: both the first and the last month. */
function duration(r: Role) {
  const last = r.end ? parseISO(`${r.end}-01`) : startOfMonth(NOW);
  const months = differenceInCalendarMonths(last, startOf(r)) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}
const range = (r: Role) =>
  `${format(startOf(r), "MMM yyyy")} – ${r.end ? format(parseISO(`${r.end}-01`), "MMM yyyy") : "Present"}`;

/* Chart domain: a little before the first role to a little past today. */
const D0 = parseISO("2021-06-01").getTime();
const D1 = addMonths(NOW, 3).getTime();
const pct = (t: number) => ((t - D0) / (D1 - D0)) * 100;
const years: number[] = [];
for (let y = 2022; new Date(y, 0, 1).getTime() < D1; y++) years.push(y);

const initials = (company: string) =>
  company
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ExperienceSection = () => {
  const [active, setActive] = useState<string | null>(null);
  const bind = (id: string) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
  });
  const itRoles = roles.filter((r) => r.track === "it");
  const otherRoles = roles.filter((r) => r.track === "other");

  return (
    <section id="experience" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Work Experience</h2>
        <p className="-mt-2 mb-8 max-w-2xl text-lg text-muted-foreground">
          IT has been the main track since 2023, from first-line support at
          Power to Atea's service desk. Interpreting has run alongside it
          since 2022.
        </p>

        {/* Career timeline: one bar per role on a shared time axis. IT roles
            carry the accent, the rest stay grey, since the IT track is the
            story. Each row links to its card below. */}
        <figure className="surface-card mb-12 p-5 md:p-6">
          <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="font-medium">Career timeline</span>
            <span className="flex items-center gap-4 text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-3.5 rounded-[2px] bg-primary" /> IT &amp; engineering
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-3.5 rounded-[2px] bg-slate-500" /> Other work
              </span>
            </span>
          </figcaption>

          <div className="relative">
            {/* Year gridlines and the "now" marker span every row */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-[7.5rem] right-0 sm:left-[11rem]"
            >
              {years.map((y) => (
                <span
                  key={y}
                  className="absolute inset-y-0 w-px bg-border/60"
                  style={{ left: `${pct(new Date(y, 0, 1).getTime())}%` }}
                />
              ))}
              <span
                className="absolute inset-y-0 w-px border-l border-dashed border-primary/60"
                style={{ left: `${pct(NOW.getTime())}%` }}
              />
            </div>

            <ul>
              {roles.map((r) => {
                const left = pct(startOf(r).getTime());
                const width = pct(endOf(r).getTime()) - left;
                const isActive = active === r.id;
                return (
                  <li key={r.id}>
                    <a
                      href={`#${r.id}`}
                      {...bind(r.id)}
                      aria-label={`${r.title} at ${r.company}, ${range(r)}, ${duration(r)}`}
                      className={cn(
                        "grid grid-cols-[7.5rem_1fr] items-center rounded-md outline-none transition-opacity sm:grid-cols-[11rem_1fr]",
                        active && !isActive && "opacity-40"
                      )}
                    >
                      <span className="truncate py-2 pr-3 text-xs sm:text-sm">
                        <span className="font-medium text-foreground">{r.short ?? r.title}</span>
                        <span className="hidden text-muted-foreground sm:inline"> · {r.company}</span>
                        <span className="block text-muted-foreground sm:hidden">{r.company}</span>
                      </span>
                      <span className="relative block h-9">
                        <span
                          className={cn(
                            "absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[4px] transition-[filter]",
                            r.track === "it" ? "bg-primary" : "bg-slate-500",
                            isActive && "brightness-125"
                          )}
                          style={{ left: `${left}%`, width: `${width}%` }}
                        />
                        {isActive && (
                          <span
                            role="tooltip"
                            className={cn(
                              "pointer-events-none absolute bottom-full z-10 mb-0.5 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-lg",
                              left > 55 && "-translate-x-full"
                            )}
                            style={{ left: `${left > 55 ? left + width : left}%` }}
                          >
                            <strong className="text-sm text-foreground">{duration(r)}</strong>
                            <span className="ml-2 text-muted-foreground">{range(r)}</span>
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[11rem_1fr]" aria-hidden="true">
              <span />
              <span className="relative block h-5 text-[11px] tabular-nums text-muted-foreground">
                {years.map((y) => {
                  const at = pct(new Date(y, 0, 1).getTime());
                  // On narrow screens a year too close to "now" would collide with it
                  const crowded = pct(NOW.getTime()) - at < 16;
                  return (
                    <span
                      key={y}
                      className={cn("absolute top-1 -translate-x-1/2", crowded && "hidden sm:inline")}
                      style={{ left: `${at}%` }}
                    >
                      {y}
                    </span>
                  );
                })}
                <span
                  className="absolute top-1 -translate-x-1/2 font-medium text-primary"
                  style={{ left: `${pct(NOW.getTime())}%` }}
                >
                  now
                </span>
              </span>
            </div>
          </div>
        </figure>

        <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Briefcase className="h-4 w-4 text-primary" /> IT &amp; engineering
        </h3>

        <ol className="mb-12 space-y-6">
          {itRoles.map((r, i) => {
            const current = !r.end;
            return (
              <li key={r.id} className="grid grid-cols-[1.25rem_1fr] gap-x-4 md:gap-x-6">
                <div className="relative flex justify-center" aria-hidden="true">
                  {i < itRoles.length - 1 && (
                    <span className="absolute bottom-[-1.5rem] top-9 w-px bg-gradient-to-b from-primary/60 to-border" />
                  )}
                  <span
                    className={cn(
                      "relative mt-7 h-3.5 w-3.5 rounded-full",
                      current ? "bg-primary ring-4 ring-primary/25" : "border-2 border-primary/60 bg-background"
                    )}
                  >
                    {current && (
                      <span className="absolute inset-0 rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                    )}
                  </span>
                </div>

                <article
                  id={r.id}
                  {...bind(r.id)}
                  className={cn(
                    "surface-card p-6",
                    current && "border-primary/40",
                    active === r.id && "-translate-y-0.5 border-primary/50 shadow-lg shadow-primary/10"
                  )}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/25">
                      {initials(r.company)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xl font-semibold leading-tight">{r.title}</h4>
                      <p className="font-medium text-primary">{r.company}</p>
                      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" /> {range(r)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {duration(r)}
                        </span>
                      </p>
                    </div>
                    {current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Current role
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2.5 text-muted-foreground">
                    {r.description.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/70"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {r.related && (
                      <a
                        href={r.related.href}
                        className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        {r.related.label} <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Alongside
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {otherRoles.map((r) => (
            <article
              key={r.id}
              id={r.id}
              {...bind(r.id)}
              className={cn(
                "surface-card p-5",
                active === r.id && "-translate-y-0.5 border-foreground/25 shadow-lg shadow-black/20"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-foreground">
                  {initials(r.company)}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold leading-tight">{r.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {r.company} · {range(r)} · {duration(r)}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {r.description.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-0.5 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
