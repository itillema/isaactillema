import type { FeaturedProject, Project } from "@/lib/types";

/**
 * Leave both arrays empty to render the "coming soon" empty state.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "qa-as-a-service",
    title: "QA-as-a-Service Offering",
    description:
      "Defined and launched a productized QA service line: scoped retainers, repeatable onboarding, and a reporting stack that turns automation coverage into a metric clients buy on. Five new client engagements in the first year.",
    tech: ["Playwright", "TypeScript", "Azure DevOps", "Docker", "Power BI"],
    order: 1,
  },
];

export const otherProjects: Project[] = [
  {
    id: "isaactillema-com",
    title: "isaactillema.com",
    description:
      "Personal portfolio and blog site created by Isaac Tillema. Created with Next.js + Tailwind v4.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/itillema/isaactillema",
    external: "https://isaactillema.com",
  },
];
