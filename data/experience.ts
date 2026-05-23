import type { Experience } from "@/lib/types";

/**
 * Placeholder experience entries. The content pass will replace these with
 * Isaac's real work history (sourced directly — LinkedIn is scrape-blocked).
 */
export const experience: Experience[] = [
  {
    id: "ooe",
    company: "The Office of Experience",
    companyUrl: "https://www.officeofexperience.com/",
    role: "Quality Assurance Lead",
    start: "TBD",
    end: "Present",
    bullets: [
      "Placeholder responsibility — describe a quality initiative you led.",
      "Placeholder responsibility — describe automation / tooling work.",
      "Placeholder responsibility — describe cross-team collaboration.",
    ],
    stack: ["Cypress", "Playwright", "TypeScript", "Jira"],
  },
  {
    id: "rics",
    company: "RICS Software",
    role: "Quality Assurance Analyst",
    start: "TBD",
    end: "TBD",
    bullets: [
      "Placeholder — what you tested and how.",
      "Placeholder — bugs found / regression coverage.",
      "Placeholder — process improvements.",
    ],
    stack: ["Manual QA", "SQL", "Postman"],
  },
];
