
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with product management, cart functionality, and payment processing.",
      tags: ["React", "Node.js", "MongoDB", "Stripe API"],
      demoUrl: "#",
      repoUrl: "#",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      demoUrl: "#",
      repoUrl: "#",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Finance Dashboard",
      description: "An analytics dashboard for financial data visualization with interactive charts and data filtering.",
      tags: ["Angular", "D3.js", "Express", "PostgreSQL"],
      demoUrl: "#",
      repoUrl: "#",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Weather Forecast App",
      description: "A weather application that provides real-time forecasts and historical weather data visualization.",
      tags: ["React Native", "OpenWeatherMap API", "Redux"],
      demoUrl: "#",
      repoUrl: "#",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="project-card overflow-hidden h-full flex flex-col">
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
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Github size={16} /> Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
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
