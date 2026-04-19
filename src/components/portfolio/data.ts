export const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills & Tools" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
  { id: "stats", label: "Stats" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const PROFILE = {
  name: "Astitva Kushwaha",
  handle: "astitva.dev",
  tagline: "Building. Learning. Shipping.",
  intro:
    "First-year B.Tech CSE student at IIIT Sonipat. I build things on the web, learn relentlessly, and ship in public — one small project at a time.",
  email: "astitvasingh0007@gmail.com",
  phone: "+91 8400711259",
  location: "Delhi, India",
  github: "https://github.com/astitvakushwaha",
  githubUser: "astitvakushwaha",
  linkedin: "https://www.linkedin.com/in/astitva-kushwaha-912602213/",
  twitter: "https://x.com/Antherix007",
  twitterHandle: "@Antherix007",
  leetcode: "https://leetcode.com/u/Antherix/",
  leetcodeUser: "Antherix",
  resume: "/resume.pdf",
};

export const PROJECTS = [
  {
    title: "Gamified CAPTCHA",
    period: "2025",
    bullets: [
      "Reimagined the CAPTCHA as a tiny, playful game that's harder for bots and friendlier for humans.",
      "Designed the interaction model and built a working web prototype.",
    ],
    tech: ["React", "TypeScript", "Canvas"],
  },
  {
    title: "Money Tracker",
    period: "2025",
    bullets: [
      "Personal finance tracker with categories, trends, and a clean dashboard.",
      "Full-stack app with React frontend and PostgreSQL persistence.",
    ],
    tech: ["React", "PostgreSQL", "Node.js"],
  },
  {
    title: "SIH '25 — Smart India Hackathon",
    period: "2025",
    bullets: [
      "Worked with a cross-functional student team on a 36-hour problem statement.",
      "Owned the frontend prototype and presentation.",
    ],
    tech: ["React", "Tailwind"],
  },
  {
    title: "Codeday Lucknow",
    period: "2024",
    bullets: [
      "Built and shipped a small product in 24 hours with a 4-person team.",
      "Won recognition for execution and product polish.",
    ],
    tech: ["JavaScript", "HTML/CSS"],
  },
  {
    title: "Portfolio Website",
    period: "2025",
    bullets: [
      "This site — minimal, monochrome, focus-first.",
      "Built with React, TanStack Start, and Tailwind.",
    ],
    tech: ["React", "TanStack", "Tailwind"],
  },
];

export const SKILLS: Array<{ group: string; items: string[] }> = [
  { group: "Languages", items: ["C", "C++", "Python", "JavaScript", "SQL"] },
  { group: "Frameworks", items: ["React", "TanStack"] },
  { group: "Databases", items: ["PostgreSQL"] },
  { group: "Tools", items: ["Git", "GitHub", "Figma", "Canva", "VS Code"] },
];

export const EXPERIENCE = [
  {
    role: "Software Development Intern",
    org: "CodeAlpha",
    period: "2024 — 2025 · Remote",
    bullets: [
      "Worked in an agile team on real-world web features end-to-end.",
      "Practiced Git-based workflows, code review, and shipping iteratively.",
    ],
  },
  {
    role: "Leadership & Activities",
    org: "School & College",
    period: "2020 — Present",
    bullets: [
      "Team Lead for inter-school competitions and class projects.",
      "Lead — Drama Club; Member — Photography Club; Football team.",
    ],
  },
];

export const EDUCATION = [
  {
    school: "IIIT Sonipat",
    degree: "B.Tech, Computer Science & Engineering",
    period: "Aug 2025 — Present",
    detail: "CGPA 7.25",
  },
];
