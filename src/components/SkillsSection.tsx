const SkillsSection = () => {
  const technicalSkills = [
    "Python",
    "TypeScript",
    "Node.js",
    "MQTT",
    "InfluxDB",
    "Linux"
  ];

  const softSkills = [
    "Problem Solving",
    "Communication",
    "Technical Documentation",
    "Customer Support",
    "Collaboration",
    "Attention to Detail",
    "Self-learning",
    "Process Improvement"
  ];

  const tools = [
    "Git",
    "VS Code",
    "Docker Compose",
    "Grafana",
    "Telegraf",
    "MQTT Broker",
    "Azure App Service",
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Skills</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill, index) => (
                  <span key={index} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <span key={index} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <span key={index} className="skill-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
