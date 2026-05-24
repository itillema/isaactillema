import type { Certification, Education } from "@/lib/types";

export const education: Education[] = [
  {
    id: "depaul",
    school: "DePaul University",
    schoolDetail: "Jarvis College of Computing",
    degree: "Master of Science in Software Engineering",
    emphasis: "Development & Architecture",
    location: "Chicago, IL",
    date: "December 2026",
  },
  {
    id: "iu-kelley",
    school: "Indiana University",
    schoolDetail: "Kelley School of Business",
    degree: "Bachelor of Science in Business",
    emphasis: "Management",
    location: "Indianapolis, IN",
    date: "May 2020",
  },
];

export const certifications: Certification[] = [
  { id: "istqb-cta-tm", name: "ISTQB Certified Test Manager", abbreviation: "CTA-TM" },
  { id: "istqb-tae", name: "ISTQB Certified Test Automation Engineer", abbreviation: "TAE" },
  { id: "istqb-agile", name: "ISTQB Agile Tester", abbreviation: "CTFL-AT" },
  { id: "istqb-ctfl", name: "ISTQB Certified Tester", abbreviation: "CTFL" },
  { id: "az-204", name: "Developing Azure Solutions", abbreviation: "AZ-204" },
  { id: "ms-98-361", name: "Software Development (MTA)", abbreviation: "MS 98-361" },
];
