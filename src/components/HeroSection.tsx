import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Linkedin, Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            Available for new opportunities
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Hi, I'm <span className="gradient-text">Wael Kattan</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-primary">
            Computer Engineer &amp; IT Consultant
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A 26-year-old Computer Engineering graduate, currently working as an
            IT Consultant providing hands-on technical support. I have a strong
            interest in building practical, reliable systems, and I enjoy
            learning by solving real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <a href="#contact" className="flex items-center gap-2">
                Contact Me
                <Mail className="h-5 w-5" />
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/waelkattan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>

            <Button variant="ghost" size="lg" asChild>
              <a
                href="https://github.com/wkn00"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce"
      >
        <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
