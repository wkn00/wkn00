import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Server, Database } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 animate-slide-up">
            <p className="text-lg">
              I'm a newly graduated Data Engineer with a specialization in
              network and cybersecurity. I focus on building reliable, efficient
              systems using Python, TypeScript, and modern cloud tools.
            </p>
            <p>
              During my studies, I worked with Telenor Maritime on a real-world
              project to measure and log mobile and WiFi coverage at sea. I
              developed a full-stack solution using Flask, InfluxDB, MQTT, and
              React, integrating both hardware and software components.
            </p>
            <p>
              I've also gained practical experience through an internship and
              part-time work with Power as IT support, where I solved technical issues,
              automated workflows, and handled direct customer interaction. 
            </p>
            <p>
              I work well independently or in a team, I document what I build,
              and I care about building things that actually work. Outside of
              tech, I’ve worked as a community interpreter and election worker,
              sharpening my communication skills and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="flex flex-col items-center text-center p-6 space-y-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <User size={24} />
                </div>
                <h3 className="font-medium text-lg">Front-end Development</h3>
                <p className="text-sm text-muted-foreground">
                  Creating responsive and intuitive user interfaces with modern
                  frameworks
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="flex flex-col items-center text-center p-6 space-y-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Code size={24} />
                </div>
                <h3 className="font-medium text-lg">Back-end Systems</h3>
                <p className="text-sm text-muted-foreground">
                  Building robust and scalable server-side applications and APIs
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="flex flex-col items-center text-center p-6 space-y-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Server size={24} />
                </div>
                <h3 className="font-medium text-lg">Cloud Services</h3>
                <p className="text-sm text-muted-foreground">
                  Deploying and managing applications on AWS, Azure, and Google
                  Cloud
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="flex flex-col items-center text-center p-6 space-y-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Database size={24} />
                </div>
                <h3 className="font-medium text-lg">Database Design</h3>
                <p className="text-sm text-muted-foreground">
                  Designing efficient database schemas and optimizing queries
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
