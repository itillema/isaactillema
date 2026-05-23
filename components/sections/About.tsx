import { bio } from "@/data/bio";
import { skills } from "@/data/skills";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";

export function About() {
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
        <ScrollReveal className="text-muted space-y-4 md:col-span-3">
          <p>
            Hello! I&apos;m {bio.name.split(" ")[0]}, based in {bio.location}. Placeholder
            paragraph: tell the story of how you got into software / quality engineering.
          </p>
          <p>
            Placeholder paragraph: what you do today, what you care about in your work, and the
            kinds of teams you like building with.
          </p>
          <p>
            Placeholder paragraph: a few specific technologies or practices you&apos;ve been
            spending time on lately.
          </p>
          <p>Here are a few things I work with:</p>
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
            <div className="bg-surface border-border h-full w-full rounded border" />
            <div className="border-accent absolute inset-0 translate-x-3 translate-y-3 rounded border transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
