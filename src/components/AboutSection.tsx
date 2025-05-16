
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
              I'm a passionate Computer Engineer with over 5 years of experience in software development, specializing in creating efficient and scalable applications.
            </p>
            <p>
              My journey in technology started with a deep curiosity about how software systems work, which led me to pursue a degree in Computer Engineering. Since then, I've been building my expertise in various domains including web application development, cloud architecture, and database systems.
            </p>
            <p>
              I thrive in collaborative environments where I can leverage my technical skills to solve complex problems and deliver impactful solutions. I'm constantly learning and adapting to new technologies to stay at the forefront of innovation.
            </p>
            <p>
              Outside of work, I enjoy contributing to open-source projects, mentoring junior developers, and exploring the latest advancements in AI and machine learning.
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
                  Creating responsive and intuitive user interfaces with modern frameworks
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
                  Deploying and managing applications on AWS, Azure, and Google Cloud
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
