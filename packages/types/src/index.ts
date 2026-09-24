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
  highlights?: string[];
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
  description?: string[];
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

export interface About {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  closingStatement: string;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
}

export interface SkillGroup {
  label: string;
  children: {
    value: string;
    label: string;
  }[];
}

export interface Contact {
  email: string;
  heading: string;
  description: string;
}

export type FeedbackType =
  | "feedback"
  | "project"
  | "job"
  | "collaboration"
  | "other";

export type FeedbackStatus = "new" | "read" | "resolved";

export interface Feedback {
  name: string;
  email: string;
  type: FeedbackType;
  message: string;
  rating?: number;
  status: FeedbackStatus;
  createdAt: Date;
  updatedAt: Date;
}