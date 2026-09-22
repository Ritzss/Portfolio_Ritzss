import type {
  Profile,
  Project,
  Experience,
  Education,
  Certification,
  SocialLink,
  Skill,
} from "@portfolio/types";

export const profile: Profile = {
  name: "Ritanshu Babuta",
  role: "Associate Full Stack Developer",
  tagline: "Building production web applications for real-world problems",

  stack: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
  ],
};

export const projects: Project[] = [
  {
    title: "VastraDrobe",
    description:
      "Production-ready fashion e-commerce platform built with Next.js, React, TypeScript, Tailwind CSS, and MongoDB.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Cloudinary",
    ],
    url: "https://www.vastradrobe.com/",
    image: "/projects/vastradrobe.webp",
    featured: true,
  },
];

export const experience: Experience[] = [
  {
    company: "ADS247365 India Pvt. Ltd.",
    role: "Associate MERN Full Stack Developer",
    location: "Delhi, India",
    startDate: "Nov 2025",
    description: [
      "Developed and maintained production web applications using Next.js, React.js, Node.js, Express.js, and MongoDB.",
      "Built responsive, reusable React and Next.js components integrated with REST APIs and backend services.",
      "Developed REST APIs, CRUD workflows, authentication, authorization, protected routes, and business logic.",
      "Worked on VastraDrobe, a fashion e-commerce platform covering product discovery, search, filtering, cart, favorites, checkout, accounts, and orders.",
      "Developed an Inventory Management System covering products, variants, warehouses, inventory, stock movements, orders, users, activity logs, and administrative workflows.",
      "Implemented inventory operations including stock addition, removal, transfers, and warehouse-level stock management.",
      "Worked with MongoDB data models and indexing for products, inventory, orders, customers, and operational workflows.",
      "Integrated services including Cloudinary, Postmark, payment gateway functionality, and ExcelJS-based exports.",
      "Worked on production deployment, debugging, API connectivity, environment configuration, and frontend performance optimization.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
    ],
  },

  {
    company: "Internshala Trainings",
    role: "Web Developer Trainee",
    location: "Remote",
    startDate: "Aug 2023",
    endDate: "Oct 2023",
    description: [
      "Completed an 8-week Web Developer Trainee internship focused on practical web development.",
      "Worked with HTML, CSS, JavaScript, PHP, and React.js to develop web interfaces and application functionality.",
      "Built responsive web pages and implemented frontend components following web development fundamentals.",
      "Gained practical experience with client-side development, server-side concepts, debugging, and cross-browser compatibility.",
    ],
    technologies: [
      "HTML5",
      "CSS",
      "JavaScript",
      "PHP",
      "React.js",
    ],
  },
  
  {
    company: "National Council of Educational Research and Training (NCERT)",
    role: "Web Developer",
    location: "New Delhi, India",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    description: [
      "Assisted with inventory and operational management modules as part of the development team.",
      "Developed and optimized frontend and backend functionality using HTML, CSS, JavaScript, Bootstrap, PHP, and MySQL.",
      "Worked with MySQL databases and improved database response efficiency through query optimization.",
      "Participated in debugging, testing, software enhancement, and feature implementation under senior developer supervision.",
    ],
    technologies: [
      "HTML5",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "PHP",
      "MySQL",
    ],
  },

];

export const education: Education[] = [
  {
    institution: "Delhi Technical Campus",
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    startDate: "2021",
    endDate: "2025",
    grade: "8 CGPA",
    description:
      "B.Tech in Computer Science Engineering with a Minor in Artificial Intelligence.",
  },
  {
    institution: "Sahoday Sr Sec School",
    degree: "Senior Secondary",
    field: "Science (PCM)",
    startDate: "2019",
    endDate: "2021",
    grade: "80%",
    description:
      "Completed Senior Secondary education in the Science stream with Physics, Chemistry, and Mathematics (PCM).",
  },
];

export const certifications: Certification[] = [
  {
    name: "MERN Full Stack Development Professional Course",
    issuer: "QSpiders",
    issueDate: "May 2026",
    credentialId: "JSP261457",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/Ritzss",
    label: "GitHub",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ritanshu-babuta/",
    label: "LinkedIn",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "PHP", category: "Backend" },

  // Database
  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },

  // Tools
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Cloudinary", category: "Tools" },
];