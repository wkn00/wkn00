import { Button } from "@/components/ui/button";

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
          {/* Your content remains the same */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Wael Kattan
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-primary">
            Computer Engineer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Computer Engineering graduate with a focus on building reliable data
            systems and cloud-native applications. Passionate about solving
            real-world problems through clean architecture, automation, and
            modern development practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              className="text-black hover:text-white hover:bg-transparent border-2 border-blue-500 hover:border-2 hover:border-blue-500"
              size="lg"
            >
              <a href="#contact" className="flex items-center">
                Contact Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </Button>

            <Button
              className="hover:text-black hover:bg-blue-500 border-2 border-blue-500 hover:border-2 hover:border-blue-500"
              variant="outline"
              size="lg"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/waelkattan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-0"
              >
                Linkedin
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.061-1.866-3.061-1.868 0-2.154 1.46-2.154 2.969v5.696h-3v-10h2.881v1.367h.041c.401-.76 1.379-1.561 2.838-1.561 3.036 0 3.6 2 3.6 4.59v5.604z" />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - fixed positioning */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="flex flex-col items-center">
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