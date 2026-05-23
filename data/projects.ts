import type { FeaturedProject, Project } from "@/lib/types";

export const featuredProjects: FeaturedProject[] = [
  {
    id: "placeholder-featured-1",
    title: "Placeholder Featured Project",
    description:
      "Short description of a meaningful project. The content pass will replace this with a real project you'd like to highlight.",
    tech: ["TypeScript", "Next.js", "Playwright"],
    github: undefined,
    external: undefined,
    image: undefined,
    order: 1,
  },
];

export const otherProjects: Project[] = [
  {
    id: "placeholder-other-1",
    title: "Placeholder Project",
    description: "One-line description of a smaller project or experiment.",
    tech: ["TypeScript"],
  },
];
