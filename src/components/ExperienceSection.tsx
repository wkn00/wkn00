
import { Card, CardContent } from "@/components/ui/card";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "IT Support",
      company: "Power Norge",
      duration: "Feb 2023 – Present",
      description: [
        "Provided first-line technical support and troubleshooting for hardware and software issues",
        "Installed, configured, and maintained IT equipment for internal users",
        "Documented recurring issues and contributed to process improvement",
        "Collaborated with internal teams to ensure stable daily operations"
      ]
    },
    {
      title: "Software Development Intern",
      company: "Power Grimstad & University of Agder",
      duration: "May 2024 – Dec 2024",
      description: [
        "Designed and developed a desktop application to automate internal workflows",
        "Led the full development cycle from requirements gathering to deployment",
        "Worked cross-functionally with business and technical teams",
        "Documented the project for handoff and future maintenance"
      ]
    },
    {
      title: "Interpreter",
      company: "Tolkenett",
      duration: "Oct 2022 – Present",
      description: [
        "Facilitated communication between clients and public services (e.g. NAV, healthcare, education)",
        "Adapted quickly to sensitive or high-stakes scenarios requiring precision and neutrality",
        "Managed scheduling and reporting independently in a freelance capacity"
      ]
    },
    {
      title: "Store Supervisor",
      company: "KIWI",
      duration: "Aug 2021 – Apr 2023",
      description: [
        "Responsible for opening and closing the store, cash handling, and shift leadership",
        "Interacted with customers and ensured smooth daily operations",
        "Followed operational routines and contributed to team performance"
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
