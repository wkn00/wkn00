import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Auto Rapport - Power",
      description:
        "A report generator for Power Norge automating the manual process and saving time for the company.",
      tags: ["TypeScript", "React", "Azure", "Python"],
      demoUrl: "https://powerauto.no/",
      repoUrl: "https://i.postimg.cc/BvN4mwpc/autoexcel.gif",
      imageUrl: "https://i.postimg.cc/xdhFjfpx/ar.png",
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
      imageUrl: "https://i.postimg.cc/kMfs8n6D/test5.png",
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
      imageUrl: "https://i.postimg.cc/9MdX6czZ/test4444.png",
      private: true,
    },
    {
      title: "AutoTag – Power",
      description:
        "A desktop application developed to automate manual processes for storage used at Power Norge. The solution streamlines tasks and improves workflow.",
      tags: ["Python", "PyQt", "Elguide"],
      demoUrl: null,
      repoUrl: null,
      imageUrl: "https://i.postimg.cc/s2DfWYNG/pngdasg.png",
    },

    {
      title: "AutoShoppa – Power",
      description:
        "A desktop application developed to automate manual processes for store used at Power Norge. The solution streamlines tasks and improves workflow.",
      tags: ["Python", "PyQt", "Shoppa"],
      demoUrl: null,
      repoUrl: "https://github.com/wkn00/AutoShoppa",
      imageUrl: "https://i.postimg.cc/fyGdqbCd/as.png",
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
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

              {project.showLiveDemo && project.demoUrl && (
                <CardFooter>
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
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
