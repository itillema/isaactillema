import { certifications, education } from "@/data/education";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";

function yearOnly(date: string) {
  const match = date.match(/\b(\d{4})\b/);
  if (!match) return date;
  const prefix = /expected/i.test(date) ? "Expected " : "";
  return `${prefix}${match[1]}`;
}

export function Education() {
  if (education.length === 0 && certifications.length === 0) return null;

  const certEntries = certifications.map((c) =>
    c.abbreviation ? `${c.name} (${c.abbreviation})` : c.name,
  );

  return (
    <Section id="education" title="Education">
      <RowList>
        {education.map((entry) => (
          <Row key={entry.id} eyebrow={yearOnly(entry.date)}>
            <div className="space-y-1">
              <div className="text-text text-base font-medium leading-tight">
                {entry.school}
              </div>
              <div className="text-accent text-base leading-tight">
                {entry.degree}
              </div>
              {entry.emphasis && (
                <div className="text-text-soft text-sm leading-normal">
                  {entry.emphasis}
                </div>
              )}
              <div className="text-muted text-sm leading-normal">
                {entry.location}
              </div>
            </div>
          </Row>
        ))}
        {certEntries.length > 0 && (
          <Row eyebrow="Certifications" tags={certEntries} />
        )}
      </RowList>
    </Section>
  );
}
