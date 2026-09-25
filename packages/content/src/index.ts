import type {
  Profile,
  Project,
  Experience,
  Education,
  Certification,
  SocialLink,
  About,
  SkillGroup,
  Capability,
  Contact,
} from "@portfolio/types";

export const profile: Profile = {
  name: "Ritanshu Babuta",
  role: "Associate Full Stack Developer",
  tagline: "Building production web applications for real-world problems",

  stack: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript"],
};

export const projects: Project[] = [
  {
    title: "VastraDrobe",
    description:
      "Built and maintained production web applications using Next.js, React, Node.js, and MongoDB. Developed the VastraDrobe e-commerce platform across product discovery, variants, cart, accounts, and checkout workflows. Built internal inventory and business workflows covering products, warehouses, stock movements, orders, users, and administration. Designed REST APIs, authentication flows, database operations, and production integrations.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Cloudinary",
    ],
    highlights: [
      "Built product discovery and category experiences",
      "Implemented product variants, sizes, designs, cart, and favorites",
      "Connected the storefront with backend inventory workflows",
      "Integrated Cloudinary media and production deployment",
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
    technologies: ["HTML5", "CSS", "JavaScript", "PHP", "React.js"],
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
    technologies: ["HTML5", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
  },
];

export const education: Education[] = [
  {
    institution: "Delhi Technical Campus",
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    startDate: "August 2021",
    endDate: "August 2025",
    grade: "8 CGPA",
    description: [
      "Completed a B.Tech in Computer Science Engineering with a Minor in Artificial Intelligence.",
      "Built a strong foundation in software development, programming, databases, computer systems, and problem-solving.",
      "Explored Artificial Intelligence and its applications alongside the core computer science curriculum.",
    ],
  },
  {
    institution: "Sahoday Sr Sec School",
    degree: "Senior Secondary",
    field: "Science (PCM)",
    startDate: "May 2019",
    endDate: "May 2021",
    grade: "80%",
    description: [
      "Completed Senior Secondary education in the Science stream with Physics, Chemistry, and Mathematics.",
      "Developed a strong analytical and mathematical foundation through the PCM curriculum.",
      "Built the academic foundation that led to my interest in computer science, programming, and technology.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "MERN Full Stack Development",
    issuer: "QSpiders",
    issueDate: "May 2026",
    credentialId: "JSP261457",

    description: [
      "Completed professional training focused on full-stack web development using MongoDB, Express.js, React, and Node.js.",
      "Developed practical understanding of building responsive frontend applications, backend services, REST APIs, database-driven applications, and complete web development workflows.",
      "Worked with JavaScript-based technologies across the frontend and backend, with emphasis on component-based UI development, server-side logic, CRUD operations, authentication, and database integration.",
    ],

    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "HTML & CSS",
      "Git",
    ],
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

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    children: [
      { value: "react", label: "React" },
      { value: "nextjs", label: "Next.js" },
      { value: "typescript", label: "TypeScript" },
      { value: "javascript", label: "JavaScript" },
      { value: "tailwind", label: "Tailwind CSS" },
    ],
  },
  {
    label: "Backend",
    children: [
      { value: "nodejs", label: "Node.js" },
      { value: "express", label: "Express.js" },
      { value: "rest", label: "REST APIs" },
      { value: "auth", label: "Authentication & Authorization" },
    ],
  },
  {
    label: "Database",
    children: [
      { value: "mongodb", label: "MongoDB" },
      { value: "mongoose", label: "Mongoose" },
      { value: "indexing", label: "Database Indexing" },
    ],
  },
  {
    label: "Tools",
    children: [
      { value: "git", label: "Git" },
      { value: "github", label: "GitHub" },
      { value: "cloudinary", label: "Cloudinary" },
      { value: "vercel", label: "Vercel" },
    ],
  },
];

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Production Web Apps",
    description:
      "Building responsive applications with React and Next.js, from reusable interfaces to production-ready workflows.",
  },
  {
    number: "02",
    title: "E-commerce",
    description:
      "Working across product discovery, variants, search, cart, checkout, accounts, orders, and the systems behind them.",
  },
  {
    number: "03",
    title: "Business Systems",
    description:
      "Developing internal tools and APIs for inventory, warehouses, stock movement, users, administration, and operational workflows.",
  },
];

export const about: About = {
  eyebrow: "A little about me",
  heading: "I build things that actually work.",
  paragraphs: [
    "I'm an Associate Full Stack Developer focused on building production web applications and solving practical problems through software.",
    "My work spans frontend interfaces, backend APIs, databases, authentication, business logic, and the workflows that connect them. I enjoy working on products where the interface is only one part of the problem.",
    "I've worked on e-commerce platforms as well as internal business systems, giving me experience with both customer-facing experiences and the operational systems behind them.",
  ],
  closingStatement:
    "From interface to database, I like understanding how the whole thing fits together.",
};

export const contact: Contact = {
  email: "ritanshubabuta399@gmail.com",
  heading: "Let's build something worth building.",
  description:
    "Whether it's a product, a web application, or a problem that needs solving, I'm always interested in working on meaningful software.",
};
