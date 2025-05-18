import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Wael Kattan
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-primary">
            Computer Engineer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Data Engineering graduate with a focus on building reliable data
            systems and cloud-native applications. Passionate about solving
            real-world problems through clean architecture, automation, and
            modern development practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              className="gap-2 hover:bg-transparent border-2 border-blue-700 hover:border-2 hover:border-blue-700"
              size="lg"
            >
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/waelkattan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-muted-foreground text-sm mb-2">
            Scroll to explore
          </span>
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
