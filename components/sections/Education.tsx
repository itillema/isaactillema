import { certifications, education } from "@/data/education";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";

export function Education() {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-(--header-h) py-(--space-section)"
    >
      <ScrollReveal>
        <SectionHeading id="education-heading" number="03">
          Education &amp; Credentials
        </SectionHeading>
      </ScrollReveal>

      {education.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((entry) => (
            <ScrollReveal key={entry.id}>
              <li className="border-border bg-surface/40 flex h-full flex-col gap-2 rounded-(--radius) border p-6">
                <p className="text-muted font-mono text-xs">{entry.date}</p>
                <h3 className="text-text text-lg font-semibold">
                  {entry.school}
                  {entry.schoolDetail && (
                    <span className="text-muted block text-sm font-normal">
                      {entry.schoolDetail}
                    </span>
                  )}
                </h3>
                <p className="text-text-soft">{entry.degree}</p>
                <p className="text-muted text-sm">
                  {entry.emphasis ? `${entry.emphasis} · ` : ""}
                  {entry.location}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      )}

      {certifications.length > 0 && (
        <ScrollReveal>
          <div className="mt-12">
            <h3 className="text-text mb-4 text-lg font-semibold">Certifications</h3>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li
                  key={c.id}
                  className="border-border text-text-soft hover:border-accent rounded-(--radius) border px-3 py-1.5 font-mono text-xs transition-colors"
                >
                  {c.name}
                  {c.abbreviation && (
                    <span className="text-muted ml-1.5">({c.abbreviation})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
