import type { SkillGroup } from "@/lib/types";

/**
 * Curated set of ~10 skills surfaced in the About section.
 * Full skill breakdown lives on the resume PDF.
 */
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "C#", "Python", "SQL"],
  },
  {
    category: "Automation",
    items: ["Playwright", "Selenium", "Appium"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "AWS", "Azure DevOps"],
  },
];
