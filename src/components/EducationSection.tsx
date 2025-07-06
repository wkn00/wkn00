import { GraduationCap, Award, FileText } from "lucide-react";

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

  const certifications = [
    {
      name: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      date: "22.05.2025",
      link: "https://api.badgr.io/public/assertions/paubQ3MsT-2PVTc-tERBCQ?identity__email=qatanwail%40gmail.com",

      badgeImage:
        "https://media.badgr.com/uploads/badges/assertion-paubQ3MsT-2PVTc-tERBCQ.png?versionId=Gj73EfSkN6cghr7FAxSThMLW1JZ8fyYI",
    },
    {
      name: "CompTIA Security+ (SY0-701)",
      issuer: "CompTIA Inc.",
      date: "In Progress",
      badgeImage:
        "https://www.lindenwood.edu/files/resources/xpace-comptia-security-training-02.png.pagespeed.ic.a3KQuv24WS.webp",
    },
    {
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      date: "Planned for 2025",
      badgeImage:
        "https://freesvg.org/img/CCNA-Security-Logo.png",
    },
    {
      name: "Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "Planned for 2026",
      badgeImage:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fk21academy.com%2Fwp-content%2Fuploads%2F2020%2F02%2FAzure.Fundamental_Icon.png&f=1&nofb=1&ipt=9b0ab4ff5f81c58f8920687e3b7b7b2a53c2b87df769e0ac7bb1cf560db313b0",
    },
  ];

  const handleCertificateClick = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

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
                  <p className="text-muted-foreground mt-2">
                    {item.description}
                  </p>
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
                <div
                  key={index}
                  onClick={() => handleCertificateClick(cert.link)}
                  className={`relative flex items-start gap-4 p-4 border rounded-lg transition-all duration-300 group ${
                    cert.link
                      ? "cursor-pointer hover:shadow-lg hover:-translate-y-1"
                      : ""
                  }`}
                >
                  <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>

                  {cert.badgeImage && (
                    <div
                      className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                        cert.link
                          ? "opacity-50 group-hover:opacity-100"
                          : "opacity-50"
                      } transition-opacity duration-300`}
                    >
                      <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center overflow-hidden shadow-md">
                        <img
                          src={cert.badgeImage}
                          alt={`${cert.name} badge`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
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
