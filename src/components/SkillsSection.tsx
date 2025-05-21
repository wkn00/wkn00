import { FaPython, FaJs, FaReact, FaDocker, FaMicrosoft } from 'react-icons/fa';
import { 
  SiTypescript, 
  SiCplusplus, 
  SiFlask, 
  SiDjango, 
  SiDotnet,
  SiInfluxdb, 
  SiMysql, 
  SiPostgresql, 
  SiPandas, 
  SiOpencv, 
  SiQt,
  SiHeroku, 
  SiGithub 
} from 'react-icons/si';

const SkillsSection = () => {
  // Skills with icons
  const skills = {
    languages: [
      { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> }
    ],
    frameworks: [
      { name: "Flask", icon: <SiFlask className="text-[#000000]" /> },
      { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
      { name: ".NET", icon: <SiDotnet className="text-[#512BD4]" /> },
      { name: "React", icon: <FaReact className="text-[#61DAFB]" /> }
    ],
    databases: [
      { name: "InfluxDB", icon: <SiInfluxdb className="text-[#22ADF6]" /> },
      { name: "NoSQL", icon: <div className="text-sm font-bold"></div> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> }
    ],
    libraries: [
      { name: "PyAutoGUI", icon: <FaPython className="text-[#3776AB]" /> },
      { name: "Pandas", icon: <SiPandas className="text-[#150458]" /> },
      { name: "OpenCV", icon: <SiOpencv className="text-[#5C3EE8]" /> },
      { name: "PyQt", icon: <SiQt className="text-[#41CD52]" /> }
    ],
    tools: [
      { name: "GitHub", icon: <SiGithub className="text-[#181717]" /> },
      { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
      { name: "Azure", icon: <FaMicrosoft className="text-[#0078D4]" /> },
      { name: "Heroku", icon: <SiHeroku className="text-[#430098]" /> }
    ]
  };

  // Grouped university courses
  const courses = {
    programming: [
      "Fundamental Software Dev",
      "Advanced Software Dev",
      "ICT Project"
    ],
    systems: [
      "Operating Systems",
      "Advanced OS",
      "Microcontrollers",
      "IT Orchestration",
      "DevOps"
    ],
    security: [
      "Cyber Security",
      "Penetration Testing",
      "Software Security",
      "Intrusion Detection",
      "Risk Management"
    ],
    networking: [
      "Data Communication",
      "Network Privacy"
    ],
    math: [
      "Mathematics 1-2",
      "Discrete Math",
      "Statistics"
    ],
    ai: [
      "Intro to AI"
    ],
    other: [
      "Cloud Infrastructure",
      "Tech & Environment",
      "HSE",
      "Physics for ICT",
      "Internship"
    ]
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Skills & Education</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Technical Skills Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
            
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="mb-5">
                <h4 className="text-md font-medium mb-2 capitalize text-primary">
                  {category.replace(/([A-Z])/g, ' $1')}
                </h4>
                <div className={`
                  flex gap-2
                  ${['languages', 'databases'].includes(category) 
                    ? 'flex-nowrap overflow-x-auto pb-2 md:overflow-visible md:flex-wrap' 
                    : 'flex-wrap'}
                `}>
                  {items.map((item, index) => (
                    <div 
                      key={index} 
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full 
                        group transition-all hover:bg-white/20
                        ${['languages', 'databases'].includes(category) ? 'flex-shrink-0' : ''}
                      `}
                      title={item.name}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Courses Column 1 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">University Courses</h3>
            
            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">Programming</h4>
              <ul className="space-y-1.5">
                {courses.programming.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">Systems</h4>
              <ul className="space-y-1.5">
                {courses.systems.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">Security</h4>
              <ul className="space-y-1.5">
                {courses.security.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Courses Column 2 */}
          <div className="space-y-6 pt-10 md:pt-0 mt-12">
            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">Networking</h4>
              <ul className="space-y-1.5">
                {courses.networking.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">Math</h4>
              <ul className="space-y-1.5">
                {courses.math.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">AI</h4>
              <ul className="space-y-1.5">
                {courses.ai.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-md font-medium mb-2 text-primary">Other</h4>
              <ul className="space-y-1.5">
                {courses.other.map((course, index) => (
                  <li key={index} className="text-sm pl-3 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;