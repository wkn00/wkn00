import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Guess My Number",
      description:
        "A two-player guessing game built with TypeScript and Node.js. Frontend hosted on GitHub Pages, backend API on Azure (Node.js). Players guess each other's secret 3-digit number with positional feedback.",
      tags: ["TypeScript", "Node.js", "React", "Azure", "GitHub Pages"],
      demoUrl: "https://wkn00.github.io/gsm",
      repoUrl: "https://github.com/wkn00/gsm",
      imageUrl: "https://i.postimg.cc/CKyjKDqT/gsm-png.png",
    },
    {
      title: "Kubernetes Infrastructure Deployment",
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
      title: "Intern Automation Tool – Power",
      description:
        "En desktop-applikasjon utviklet for å automatisere manuelle prosesser internt hos Power Norge. Løsningen effektiviserer oppgaver og forbedrer arbeidsflyten.",
      tags: ["Python", "PyQt", "Qt", "Desktop App"],
      demoUrl: null,
      repoUrl: null,
      imageUrl: "https://i.postimg.cc/s2DfWYNG/pngdasg.png",
    },
    {
      title: "Multi-Network Quality Monitoring System",
      description:
        "Bachelorprosjekt utviklet for Telenor Maritime: et system for måling og logging av mobil- og WiFi-dekning i maritime miljøer. Kombinerer hardware og software for sanntidsmonitorering og analyse.",
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
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="project-card overflow-hidden h-full flex flex-col"
            >
              <div className="h-48 bg-secondary overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
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

              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Github size={16} /> Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
