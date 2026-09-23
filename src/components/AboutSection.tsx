import { ArrowRight, Check, Cloud, Target } from "lucide-react";
import { cn } from "@/lib/utils";

/* What the cloud goal already rests on, and what's next. Each step links to
   the section that backs it up. */
const groundwork = [
  {
    done: true,
    text: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    href: "#certifications",
  },
  {
    done: true,
    text: "My own 7-node k3s cluster (3 control-plane nodes) behind Cloudflare, running this site and three live apps",
    href: "#projects",
  },
  {
    done: true,
    text: "GitOps on Kubernetes at UiA: Talos Linux, Argo CD, Prometheus, Grafana, Loki",
    href: "#project-k8s",
  },
  {
    done: false,
    text: "Next: Azure Solutions Architect Expert (AZ-305), planned for 2027",
    href: "#certifications",
  },
];

const cloudStack = [
  "Azure",
  "Kubernetes",
  "k3s",
  "Docker",
  "Argo CD",
  "Kustomize",
  "Cloudflare",
  "Prometheus",
  "Grafana",
  "Linux",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="space-y-5 text-lg animate-slide-up">
            <p className="text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
              I'm a computer engineer working toward one goal:{" "}
              <span className="gradient-text">becoming a cloud engineer.</span>
            </p>
            <p className="text-muted-foreground">
              I graduated from UiA in 2025 with a specialization in networking
              and cybersecurity. Today I'm an IT Consultant on Atea's service
              desk, solving problems for users across software, hardware and
              networks.
            </p>
            <p className="text-muted-foreground">
              Outside work, I build and run my own infrastructure. The apps in
              my projects run on a Kubernetes cluster I set up and maintain
              myself, and I'm working through Microsoft's Azure certifications
              one level at a time.
            </p>
          </div>

          <div className="surface-card relative overflow-hidden p-6 md:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Goal
                </p>
                <h3 className="text-xl font-bold tracking-tight">Cloud Engineer</h3>
              </div>
              <Cloud className="ml-auto h-8 w-8 text-primary/40" aria-hidden="true" />
            </div>

            <p className="relative mt-4 text-muted-foreground">
              Designing, automating and running infrastructure on Azure and
              Kubernetes. Here's what that goal already rests on:
            </p>

            <ul className="relative mt-5 space-y-2">
              {groundwork.map((step) => (
                <li key={step.text}>
                  <a
                    href={step.href}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors",
                      step.done
                        ? "border-border/60 bg-background/40 hover:border-primary/40"
                        : "border-dashed border-border bg-transparent hover:border-primary/40"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        step.done
                          ? "bg-primary text-primary-foreground"
                          : "border-2 border-dashed border-muted-foreground/50"
                      )}
                    >
                      {step.done && <Check className="h-3 w-3" />}
                    </span>
                    <span className={cn("flex-1", step.done ? "text-foreground" : "text-muted-foreground")}>
                      {step.text}
                    </span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Cloud toolkit
              </p>
              <div className="flex flex-wrap gap-2">
                {cloudStack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-xs font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
