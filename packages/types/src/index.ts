export interface Profile {
  name: string;
  role: string;
  tagline: string;
  stack: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools" | "Other";
}