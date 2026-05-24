import type { FeaturedProject, Project } from "@/lib/types";

/**
 * Sample/filler entries — replace with real engagements when ready.
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
  {
    id: "ai-testing-framework",
    title: "Internal AI Testing Framework",
    description:
      "Sample filler — internal framework for exercising AI-native product features end-to-end: prompt regression suites, model-versus-model evaluation harness, and hallucination guardrails plugged into CI.",
    tech: ["TypeScript", "Playwright", "OpenAI SDK", "GitHub Actions"],
    github: "https://github.com/itillema",
    order: 2,
  },
];

export const otherProjects: Project[] = [
  {
    id: "pipeline-reporter",
    title: "Pipeline Reporter",
    description:
      "Sample filler — small CLI that pulls Playwright run artifacts out of Azure DevOps and renders a per-suite dashboard with flake scores and trend lines.",
    tech: ["Node", "TypeScript", "Azure DevOps API"],
    github: "https://github.com/itillema",
  },
  {
    id: "isaactillema-com",
    title: "isaactillema.com",
    description:
      "This site. Next.js + Tailwind v4, hosted on Vercel. Sticky-sidebar layout inspired by brittanychiang.com with a glassmorphic cyan identity.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/itillema",
    external: "https://isaactillema.com",
  },
];
