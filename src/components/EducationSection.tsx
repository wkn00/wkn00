import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  const education = [
    {
      degree: "Bachelor of Engineering in Data Engineering",
      institution: "University of Agder (UiA), Grimstad",
      duration: "2021 - 2025",
      description:
        "Specialization in networking and cybersecurity. Bachelor thesis with Telenor Maritime",
    },
    {
      degree: "Studiespesialisering (General Studies)",
      institution: "Nadderud videregående skole, Bærum",
      duration: "2016 - 2021",
      description:
        "Academic program focused on mathematics, natural sciences, and languages. Prepared for higher education with emphasis on analytical and theoretical subjects.",
    },
  ];

  /* Certifications have their own section (CertificationsSection) near the
     top of the page, so they aren't buried down here. */
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <div
              key={index}
              className="surface-card group flex gap-4 p-6 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="h-fit rounded-full bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{item.degree}</h3>
                <p className="text-primary">{item.institution}</p>
                <p className="timeline-date">{item.duration}</p>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
