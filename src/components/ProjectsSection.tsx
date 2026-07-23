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
import { ExternalLink, Github, Lock } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Auto Rapport - Power",
      description:
        "A report generator for Power Norge automating the manual process and saving time for the company.",
      tags: ["TypeScript", "React", "Azure", "Python"],
      demoUrl: null, // privat
      repoUrl: null, // privat
      imageUrl: "/images/ar.png",
    },
    {
      title: "GradeLoop - Hobby",
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
      imageUrl: "/images/gradeloop.png",
      showLiveDemo: true,
    },
    {
      title: "Guess My Number - Hobby",
      description:
        "A real-time 1v1 code-breaking game built with TypeScript and Node.js. Players pick a secret 3-digit number and race to crack their opponent's with positional feedback. Fully self-hosted on my own Kubernetes (k3s) cluster and served through Cloudflare.",
      tags: ["TypeScript", "Node.js", "React", "Kubernetes", "Cloudflare"],
      demoUrl: "https://guess.elfaheem.com/",
      repoUrl: "https://github.com/wkn00/gsm",
      imageUrl: "/images/guess-preview.png",
      showLiveDemo: true,
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
      imageUrl: "/images/k8s-uia.png",
      private: false,
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
      imageUrl: "/images/telenor.png",
      private: true,
    },
    {
      title: "AutoTag – Power",
      description:
        "A desktop application developed to automate manual processes for storage used at Power Norge. The solution streamlines tasks and improves workflow.",
      tags: ["Python", "PyQt", "Elguide"],
      demoUrl: null,
      repoUrl: null,
      imageUrl: "/images/autotag.png",
    },

    {
      title: "AutoShoppa – Power",
      description:
        "A desktop application developed to automate manual processes for store used at Power Norge. The solution streamlines tasks and improves workflow.",
      tags: ["Python", "PyQt", "Shoppa"],
      demoUrl: null,
      repoUrl: "https://github.com/wkn00/AutoShoppa",
      imageUrl: "/images/autoshoppa.png",
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const showDemo = Boolean(project.showLiveDemo && project.demoUrl);
            const showRepo = Boolean(project.repoUrl);

            return (
              <Card
                key={index}
                className="project-card group h-full flex flex-col"
              >
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
                  {project.private && (
                    <Badge
                      variant="secondary"
                      className="absolute top-3 right-3 gap-1 bg-background/80 backdrop-blur-sm"
                    >
                      <Lock size={12} /> Private
                    </Badge>
                  )}
                </div>

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
    </section>
  );
};

export default ProjectsSection;
