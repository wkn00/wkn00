import {
  Briefcase,
  Code2,
  Network,
  Server,
  ShieldCheck,
  Sigma,
  type LucideIcon,
} from "lucide-react";

export type Course = {
  name: string;
  /* Where the course shows up elsewhere on the page. */
  link?: { label: string; href: string };
};

export type CourseArea = {
  id: string;
  name: string;
  icon: LucideIcon;
  /* A --series-N slot from index.css. Areas take the slots in this order —
     the order the palette was validated in — so the colours stay apart for
     colour-blind readers too. */
  color: string;
  specialization?: boolean;
  courses: Course[];
};

/* The Bachelor of Engineering coursework at UiA, by subject area. */
export const courseAreas: CourseArea[] = [
  {
    id: "security",
    name: "Security",
    icon: ShieldCheck,
    color: "var(--series-1)",
    specialization: true,
    courses: [
      { name: "Cyber Security" },
      { name: "Penetration Testing" },
      { name: "Software Security" },
      { name: "Intrusion Detection" },
      { name: "Risk Management" },
    ],
  },
  {
    id: "networking",
    name: "Networking",
    icon: Network,
    color: "var(--series-2)",
    specialization: true,
    courses: [{ name: "Data Communication" }, { name: "Network Privacy" }],
  },
  {
    id: "systems",
    name: "Systems & Cloud",
    icon: Server,
    color: "var(--series-3)",
    courses: [
      { name: "Operating Systems" },
      { name: "Advanced Operating Systems" },
      { name: "Microcontrollers" },
      { name: "IT Orchestration" },
      { name: "DevOps" },
      {
        name: "Cloud Infrastructure",
        link: { label: "Kubernetes project", href: "#project-k8s" },
      },
    ],
  },
  {
    id: "software",
    name: "Software & AI",
    icon: Code2,
    color: "var(--series-4)",
    courses: [
      { name: "Fundamental Software Development" },
      { name: "Advanced Software Development" },
      { name: "ICT Project" },
      { name: "Introduction to AI" },
    ],
  },
  {
    id: "math",
    name: "Math & Science",
    icon: Sigma,
    color: "var(--series-5)",
    courses: [
      { name: "Mathematics 1 & 2" },
      { name: "Discrete Mathematics" },
      { name: "Statistics" },
      { name: "Physics for ICT" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    icon: Briefcase,
    color: "var(--series-6)",
    courses: [
      { name: "Internship", link: { label: "Power", href: "#experience" } },
      { name: "Technology & Environment" },
      { name: "Health, Safety & Environment" },
    ],
  },
];

export const courseCount = courseAreas.reduce((n, a) => n + a.courses.length, 0);
export const specializationCount = courseAreas
  .filter((a) => a.specialization)
  .reduce((n, a) => n + a.courses.length, 0);
