import { bio } from "@/data/bio";
import { skills } from "@/data/skills";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";

export function About() {
  const firstName = bio.name.split(" ")[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-(--header-h) py-(--space-section)"
    >
      <ScrollReveal>
        <SectionHeading id="about-heading" number="01">
          About Me
        </SectionHeading>
      </ScrollReveal>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
        <ScrollReveal className="text-text-soft space-y-4 md:col-span-3">
          <p>
            Hello! I&apos;m {firstName}, a Senior Quality Engineer and Architect based in{" "}
            {bio.location}. I&apos;ve spent the last five years in consulting leadership —
            architecting scalable test automation, optimizing CI/CD pipelines, and leading
            agile teams that ship software people can trust.
          </p>
          <p>
            Today I lead the QA practice at{" "}
            <a
              href="https://www.officeofexperience.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:underline"
            >
              The Office of Experience
            </a>
            , where my team and I architect automation for ecommerce and lead-gen
            engagements, build custom CI/CD deployment and reporting pipelines, and engineer
            an internal AI Testing framework that supports AI-native products and tools.
            I&apos;m especially interested in defining QA-as-a-Service offerings that turn
            quality into a revenue lever rather than a cost center.
          </p>
          <p>
            On the side, I&apos;m finishing an MS in Software Engineering at DePaul
            (graduating December 2026) and hold a stack of ISTQB certifications across test
            management, automation engineering, and agile testing.
          </p>
          <p>Here are a few of the technologies I work with day-to-day:</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
            {skills.flatMap((g) => g.items).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-accent mt-0.5">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal className="md:col-span-2">
          <div className="group relative mx-auto aspect-square w-full max-w-xs">
            <div className="bg-surface border-border h-full w-full rounded-(--radius) border" />
            <div className="border-accent absolute inset-0 translate-x-3 translate-y-3 rounded-(--radius) border transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
