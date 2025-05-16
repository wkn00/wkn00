
import { Card, CardContent } from "@/components/ui/card";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      duration: "2022 - Present",
      description: [
        "Leading a team of 5 developers in building a microservices-based e-commerce platform",
        "Architected and implemented CI/CD pipelines that reduced deployment time by 40%",
        "Optimized database queries and application performance, resulting in 60% faster page loads",
        "Mentored junior developers and conducted code reviews to ensure high code quality"
      ]
    },
    {
      title: "Software Developer",
      company: "Digital Solutions Ltd.",
      duration: "2019 - 2022",
      description: [
        "Developed and maintained multiple web applications using React and Node.js",
        "Implemented RESTful APIs and integrated third-party services",
        "Reduced application bundle size by 30% through code splitting and lazy loading",
        "Collaborated with UX designers to implement responsive and accessible interfaces"
      ]
    },
    {
      title: "Junior Developer",
      company: "Web Creations Co.",
      duration: "2017 - 2019",
      description: [
        "Assisted in the development of web applications using JavaScript and PHP",
        "Created and maintained documentation for internal systems",
        "Participated in daily stand-ups and sprint planning meetings",
        "Debugged and fixed issues reported by users and QA team"
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card 
              key={index} 
              className="border-none shadow-sm hover:shadow-md transition-all duration-300" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/3">
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <p className="text-primary font-medium">{experience.company}</p>
                    <p className="text-sm text-muted-foreground">{experience.duration}</p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <ul className="space-y-2 list-disc list-inside text-foreground">
                      {experience.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
