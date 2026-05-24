export interface Bio {
  name: string;
  role: string;
  /** Short one-line summary shown under the role in the sidebar hero. */
  tagline: string;
  location: string;
  intro: string;
  resumeHref: string;
}

export interface Social {
  label: string;
  href: string;
  /** lucide-react icon name */
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  start: string;
  end: string | "Present";
  bullets: string[];
  stack?: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  image?: {
    src: string;
    alt: string;
  };
  /** Background image used by the archive card + social-share preview. */
  ogImage?: string;
  /** ISO date — drives sort order for non-featured projects. */
  date?: string;
  /** Pins to top of lists; honored before non-featured items. */
  featured?: boolean;
  /** Sort key within featured projects (lower = first). */
  order?: number;
  /** Bulleted highlights rendered above the MDX body. */
  highlights?: string[];
  draft?: boolean;
}

export interface ProjectFull extends ProjectMeta {
  content: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  id: string;
  school: string;
  schoolDetail?: string;
  degree: string;
  emphasis?: string;
  location: string;
  date: string;
}

export interface Certification {
  id: string;
  name: string;
  abbreviation?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
  ogImage?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
