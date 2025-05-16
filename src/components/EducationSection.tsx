
import { GraduationCap, Award, FileText } from "lucide-react";

const EducationSection = () => {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      duration: "2015 - 2017",
      description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors."
    },
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      institution: "Massachusetts Institute of Technology",
      duration: "2011 - 2015",
      description: "Focus on software engineering and computer architecture. Completed thesis on distributed systems."
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2022"
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2021"
    }
  ];

  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="timeline-item">
                  <span className="timeline-dot"></span>
                  <h4 className="font-semibold">{item.degree}</h4>
                  <p className="text-primary">{item.institution}</p>
                  <p className="timeline-date">{item.duration}</p>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              Certifications
            </h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <FileText className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
