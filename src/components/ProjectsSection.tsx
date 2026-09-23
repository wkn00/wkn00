import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, Github, Images, Lock, MonitorPlay } from "lucide-react";
import ProjectPreview from "@/components/projects/ProjectPreview";
import ProjectViewer, { type ViewerState } from "@/components/projects/ProjectViewer";
import { gitopsCluster, maritimeMonitoring } from "@/components/projects/diagrams";
import type { Project } from "@/components/projects/types";

/* Imported rather than referenced from /public: Vite content-hashes the
   filename, so replacing a shot busts every CDN cache by itself. Files in
   public/ keep their name and go on being served stale from the edge. */
import prisetDesktop from "@/assets/projects/priset-desktop.webp";
import prisetGuess from "@/assets/projects/priset-guess.webp";
import prisetMobile from "@/assets/projects/priset-mobile.webp";
import guessDuel from "@/assets/projects/guess-duel.webp";
import guessHome from "@/assets/projects/guess-home.webp";
import guessWaiting from "@/assets/projects/guess-waiting.webp";
import guessHowto from "@/assets/projects/guess-howto.webp";
import guessMobile from "@/assets/projects/guess-mobile.webp";
import gradeloopJoin from "@/assets/projects/gradeloop-join.webp";
import gradeloopJoinNo from "@/assets/projects/gradeloop-join-no.webp";
import gradeloopLogin from "@/assets/projects/gradeloop-login.webp";
import gradeloopMobile from "@/assets/projects/gradeloop-mobile.webp";
import autorapportMp4 from "@/assets/projects/autorapport.mp4";
import autorapportWebm from "@/assets/projects/autorapport.webm";
import autorapportLogin from "@/assets/projects/autorapport-login.webp";
import autorapportUpload from "@/assets/projects/autorapport-upload.webp";
import autorapportDone from "@/assets/projects/autorapport-done.webp";
import telenorDashboard from "@/assets/projects/telenor.webp";
import autotagShot from "@/assets/projects/autotag.webp";
import autoshoppaShot from "@/assets/projects/autoshoppa.webp";

const projects: Project[] = [
  {
    title: "Priset - Hobby",
    description:
      "A daily car price-guessing game for a Norwegian audience, in the Wordle mould. Three cars a day, pulled from finn.no listings by a scraper that runs on its own schedule. The player sees only the photo and names a price; every guess comes back with a colour tier and an arrow, and unlocks one more fact about the car — make, model, power, mileage, year — until the price is within two percent. Norwegian throughout, with a FastAPI backend and CronJobs that assign the day's cars and keep the pool topped up, running on my own Kubernetes (k3s) cluster behind Cloudflare.",
    tags: [
      "TypeScript",
      "React",
      "Vite",
      "Python",
      "FastAPI",
      "SQLite",
      "Kubernetes",
      "Cloudflare",
    ],
    demoUrl: "https://priset.elfaheem.com/",
    repoUrl: null,
    preview: {
      frame: "browser",
      label: "priset.elfaheem.com",
      accent: "152 62% 45%",
      mobile: prisetMobile,
      slides: [
        { kind: "image", src: prisetDesktop, caption: "Car 1 of 3 today: the photo and the make, with ten more clues to unlock" },
        {
          kind: "image",
          src: prisetGuess,
          fit: "contain",
          bg: "#171512",
          caption: "Three guesses in on my own Opel: “too high, very close”, and the power clue unlocked",
        },
        {
          kind: "image",
          src: prisetMobile,
          fit: "contain",
          bg: "#171512",
          caption: "Built phone-first — the same game on a 390 px screen",
        },
      ],
    },
  },
  {
    title: "Guess My Number - Hobby",
    description:
      "A real-time 1v1 code-breaking game built with TypeScript and Node.js. Players pick a secret 3-digit number and race to crack their opponent's with positional feedback. Fully self-hosted on my own Kubernetes (k3s) cluster and served through Cloudflare.",
    tags: ["TypeScript", "Node.js", "React", "Kubernetes", "Cloudflare"],
    demoUrl: "https://guess.elfaheem.com/",
    repoUrl: "https://github.com/wkn00/gsm",
    preview: {
      frame: "browser",
      label: "guess.elfaheem.com",
      accent: "262 83% 66%",
      mobile: guessMobile,
      slides: [
        { kind: "image", src: guessDuel, caption: "Mid-duel: green pegs for the right digit in the right place, amber for the wrong place" },
        { kind: "image", src: guessHome, caption: "The lobby — create a game or join one with a code" },
        { kind: "image", src: guessWaiting, caption: "A new room: share the code, and the first to join is your opponent" },
        { kind: "image", src: guessHowto, caption: "How to play — first to three greens wins" },
        { kind: "image", src: guessMobile, fit: "contain", bg: "#0a0c10", caption: "The lobby on a phone" },
      ],
    },
  },
  {
    title: "GradeLoop",
    description:
      "A self-hosted classroom app. A teacher opens a session with a rubric and a word-count range; students join with a five-digit code and write straight in the browser, with no account at all. Submissions land live on the teacher's screen, and the whole class is graded against the rubric in one pass using the Claude API. Ships in Norwegian and English, and runs on my own Kubernetes (k3s) cluster behind Cloudflare.",
    tags: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Socket.io",
      "Claude API",
      "Kubernetes",
    ],
    demoUrl: "https://grade.elfaheem.com/",
    repoUrl: null,
    preview: {
      frame: "browser",
      label: "grade.elfaheem.com/join",
      accent: "226 90% 66%",
      mobile: gradeloopMobile,
      slides: [
        { kind: "image", src: gradeloopJoin, caption: "Students join with the five-digit code on the board — no account needed" },
        { kind: "image", src: gradeloopJoinNo, caption: "Norwegian by default, with a light theme" },
        { kind: "image", src: gradeloopLogin, caption: "Teachers sign in to open sessions and grade the class" },
        { kind: "image", src: gradeloopMobile, fit: "contain", bg: "#f3f5f9", caption: "Joining from a phone" },
      ],
    },
  },
  {
    title: "Auto Rapport - Power",
    description:
      "A report generator for Power Norge automating the manual process and saving time for the company.",
    tags: ["TypeScript", "React", "Azure", "Python"],
    demoUrl: null, // privat
    repoUrl: null, // privat
    preview: {
      frame: "browser",
      label: "Auto Rapport Generator",
      accent: "142 70% 45%",
      slides: [
        {
          kind: "video",
          mp4: autorapportMp4,
          webm: autorapportWebm,
          poster: autorapportUpload,
          caption: "The whole run: store code in, four Excel exports up, one finished report out",
        },
        { kind: "image", src: autorapportLogin, caption: "Access is per store, with a store code" },
        { kind: "image", src: autorapportDone, caption: "Processing complete — the report is ready to download" },
      ],
    },
  },
  {
    title: "Kubernetes Infrastructure Deployment - UiA",
    description:
      "University project focused on deploying and managing a Kubernetes-based infrastructure using Talos Linux, Kustomize, and GitOps practices. The stack includes CI/CD tools (ArgoCD), observability tools (Prometheus, Grafana, Loki), and containerized applications (Mastodon, Open Web UI).",
    tags: [
      "Kubernetes",
      "Kustomize",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "Talos Linux",
      "CI/CD",
      "Loki",
    ],
    demoUrl: null, // No live demo
    repoUrl: "https://github.com/wkn00/skyinfrastruktur-final",
    preview: {
      frame: "none",
      accent: "217 91% 60%",
      slides: [
        {
          kind: "diagram",
          diagram: gitopsCluster,
          caption: "How a commit reaches the cluster, and how the cluster is watched",
        },
      ],
    },
  },
  {
    title: "Multi-Network Quality Monitoring System - Telenor",
    description:
      "Bachelor project developed for Telenor Maritime: a system for measuring and logging mobile and WiFi coverage in maritime environments. Combines hardware and software for real-time monitoring and analysis.",
    tags: [
      "Raspberry Pi",
      "Python",
      "Docker",
      "MQTT",
      "InfluxDB",
      "Grafana",
      "React",
      "TypeScript",
      "Flask",
      "Telegraf",
      "Vite",
    ],
    demoUrl: null, // privat
    repoUrl: null, // privat
    preview: {
      frame: "browser",
      label: "Telenor Maritime · fleet dashboard",
      accent: "199 89% 55%",
      slides: [
        {
          kind: "image",
          src: telenorDashboard,
          fit: "contain",
          bg: "#f2f3f5",
          caption: "The fleet view: every probe on every vessel, active ones first",
        },
        {
          kind: "diagram",
          diagram: maritimeMonitoring,
          caption: "The data path from the probe on board to the dashboards on shore",
        },
      ],
    },
  },
  {
    title: "AutoTag – Power",
    description:
      "A desktop application developed to automate manual processes for storage used at Power Norge. The solution streamlines tasks and improves workflow.",
    tags: ["Python", "PyQt", "Elguide"],
    demoUrl: null,
    repoUrl: null,
    preview: {
      frame: "none",
      accent: "20 95% 55%",
      slides: [
        {
          kind: "image",
          src: autotagShot,
          caption: "AutoTag v2.0 open over the Elguide terminal it takes its CSV exports from",
        },
      ],
    },
  },
  {
    title: "AutoShoppa – Power",
    description:
      "A desktop application developed to automate manual processes for store used at Power Norge. The solution streamlines tasks and improves workflow.",
    tags: ["Python", "PyQt", "Shoppa"],
    demoUrl: null,
    repoUrl: "https://github.com/wkn00/AutoShoppa",
    preview: {
      frame: "none",
      accent: "20 95% 55%",
      slides: [
        {
          kind: "image",
          src: autoshoppaShot,
          fit: "contain",
          caption: "Open a file, choose the label type, and start the run",
        },
      ],
    },
  },
];

const ProjectsSection = () => {
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const open = (project: Project, slide = 0, tab: ViewerState["tab"] = "shots") =>
    setViewer({ project, slide, tab });

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const showDemo = Boolean(project.demoUrl);
            const showRepo = Boolean(project.repoUrl);

            return (
              <Card
                key={project.title}
                className="project-card group h-full flex flex-col"
              >
                <ProjectPreview
                  title={project.title}
                  preview={project.preview}
                  live={showDemo}
                  isPrivate={!showDemo && !showRepo}
                  onOpen={(slide) => open(project, slide)}
                />

                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="mb-4 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-3">
                  {showDemo && (
                    <>
                      <Button size="sm" asChild>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex items-center gap-1.5"
                        onClick={() => open(project, 0, "live")}
                      >
                        <MonitorPlay size={16} /> Try it here
                      </Button>
                    </>
                  )}

                  {showRepo && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        <Github size={16} /> Code
                      </a>
                    </Button>
                  )}

                  {!showDemo && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex items-center gap-1.5"
                      onClick={() => open(project)}
                    >
                      <Images size={16} /> Preview
                    </Button>
                  )}

                  {!showDemo && !showRepo && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0}>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="flex items-center gap-1.5 pointer-events-none"
                          >
                            <Lock size={16} /> Private
                          </Button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Built for a company or under NDA — the source code and the
                        running app are private, so there is no public repo or
                        demo to link.
                      </TooltipContent>
                    </Tooltip>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <ProjectViewer state={viewer} onClose={() => setViewer(null)} />
    </section>
  );
};

export default ProjectsSection;
