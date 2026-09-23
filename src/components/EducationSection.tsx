import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Briefcase,
  CalendarDays,
  GraduationCap,
  MapPin,
  School,
  Ship,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Coursework from "@/components/education/Coursework";
import { courseCount, specializationCount } from "@/components/education/courses";

type Highlight = {
  icon: LucideIcon;
  kicker: string;
  title: string;
  text: string;
  href: string;
  cta: string;
};

type Stage = {
  level: string;
  title: string;
  institution: string;
  place: string;
  from: number;
  to: number;
  description: string;
  focus: string[];
  status?: string;
  highlights?: Highlight[];
  featured?: boolean;
};

const stages: Stage[] = [
  {
    level: "Bachelor of Engineering",
    title: "Data Engineering",
    institution: "University of Agder (UiA)",
    place: "Grimstad",
    from: 2021,
    to: 2025,
    status: "Graduated",
    featured: true,
    description:
      "Specialization in networking and cybersecurity, with a bachelor thesis written for Telenor Maritime.",
    focus: ["Networking", "Cybersecurity", "Systems & Cloud"],
    highlights: [
      {
        icon: Ship,
        kicker: "Bachelor thesis · Telenor Maritime",
        title: "Multi-Network Quality Monitoring System",
        text: "Measuring and logging mobile and Wi-Fi coverage at sea, from Raspberry Pi probes on board to a live dashboard.",
        href: "#project-telenor",
        cta: "See the project",
      },
      {
        icon: Boxes,
        kicker: "University project",
        title: "Kubernetes infrastructure",
        text: "GitOps on Talos Linux with Argo CD and Kustomize, watched by Prometheus, Grafana and Loki.",
        href: "#project-k8s",
        cta: "See the project",
      },
      {
        icon: Briefcase,
        kicker: "Internship · Power & UiA",
        title: "Software development intern",
        text: "Built a desktop application that automates internal workflows, from requirements to deployment.",
        href: "#exp-power-intern",
        cta: "See experience",
      },
    ],
  },
  {
    level: "Upper secondary",
    title: "Studiespesialisering (General Studies)",
    institution: "Nadderud videregående skole",
    place: "Bærum",
    from: 2016,
    to: 2021,
    description:
      "Academic program focused on mathematics, natural sciences, and languages. Prepared for higher education with emphasis on analytical and theoretical subjects.",
    focus: ["Mathematics", "Natural sciences", "Languages"],
  },
];

const StageCard = ({ stage }: { stage: Stage }) => (
  <article
    className={cn(
      "surface-card group relative overflow-hidden",
      stage.featured
        ? "border-primary/40 p-6 shadow-xl shadow-primary/5 md:p-8"
        : "p-6 hover:border-primary/40"
    )}
  >
    {stage.featured && (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />
    )}

    <div className="relative flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {stage.level}
        </p>
        <h3
          className={cn(
            "mt-1 font-bold tracking-tight",
            stage.featured ? "text-2xl md:text-3xl" : "text-lg"
          )}
        >
          {stage.title}
        </h3>
        <p className="mt-1 font-medium text-primary">{stage.institution}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {stage.place}
          </span>
          <span className="inline-flex items-center gap-1.5 md:hidden">
            <CalendarDays className="h-3.5 w-3.5" /> {stage.from} – {stage.to}
          </span>
        </p>
      </div>
      {stage.status && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
          <GraduationCap className="h-3.5 w-3.5" /> {stage.status} {stage.to}
        </span>
      )}
    </div>

    <p className="relative mt-4 max-w-3xl text-muted-foreground">{stage.description}</p>

    <div className="relative mt-4 flex flex-wrap gap-2">
      {stage.focus.map((f) => (
        <span
          key={f}
          className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-xs font-medium"
        >
          {f}
        </span>
      ))}
    </div>

    {stage.highlights && (
      <div className="relative mt-6 grid gap-3 lg:grid-cols-3">
        {stage.highlights.map((h) => {
          const Icon = h.icon;
          return (
            <a
              key={h.title}
              href={h.href}
              className="group/hl flex flex-col rounded-xl border border-border/60 bg-background/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background/70"
            >
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" /> {h.kicker}
              </span>
              <span className="mt-2 font-semibold leading-snug">{h.title}</span>
              <span className="mt-1 flex-1 text-sm text-muted-foreground">{h.text}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {h.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/hl:translate-x-0.5" />
              </span>
            </a>
          );
        })}
      </div>
    )}

    {stage.featured && (
      <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/60 pt-5">
        <p className="text-sm text-muted-foreground">
          <span className="text-lg font-bold text-foreground">{courseCount}</span> courses ·{" "}
          <span className="text-lg font-bold text-foreground">{specializationCount}</span> in the
          networking &amp; security specialization
        </p>
        <Button asChild size="sm" variant="secondary" className="sm:ml-auto">
          <a href="#courses" className="flex items-center gap-1.5">
            Explore the coursework <ArrowDown className="h-4 w-4" />
          </a>
        </Button>
      </div>
    )}
  </article>
);

const EducationSection = () => {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education</h2>

        {/* Timeline: years on the left (md+), a rail with a node per stage,
            then the card. On phones the years move into the card. */}
        <ol className="mb-16 space-y-8">
          {stages.map((stage, i) => (
            <li
              key={stage.title}
              className="grid grid-cols-[1.25rem_1fr] gap-x-4 md:grid-cols-[7.5rem_1.25rem_1fr] md:gap-x-6"
            >
              <div className="hidden pt-6 text-right md:block">
                <p className="text-lg font-bold tabular-nums text-foreground">
                  {stage.from} – {stage.to}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stage.to - stage.from} years
                </p>
              </div>

              <div className="relative flex justify-center" aria-hidden="true">
                {i < stages.length - 1 && (
                  <span className="absolute bottom-[-2rem] top-8 w-px bg-gradient-to-b from-primary/60 to-border" />
                )}
                <span
                  className={cn(
                    "relative mt-7 flex h-5 w-5 items-center justify-center rounded-full",
                    stage.featured
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "border-2 border-primary/60 bg-background"
                  )}
                >
                  {stage.featured ? (
                    <GraduationCap className="h-3 w-3" />
                  ) : (
                    <School className="h-2.5 w-2.5 text-primary" />
                  )}
                </span>
              </div>

              <StageCard stage={stage} />
            </li>
          ))}
        </ol>

        <Coursework />
      </div>
    </section>
  );
};

export default EducationSection;
