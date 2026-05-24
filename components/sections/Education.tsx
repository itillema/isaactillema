import { certifications, education } from "@/data/education";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";

export function Education() {
  if (education.length === 0 && certifications.length === 0) return null;

  const certEntries = certifications.map((c) =>
    c.abbreviation ? `${c.name} (${c.abbreviation})` : c.name,
  );

  return (
    <Section id="education" title="Education">
      <RowList>
        {education.map((entry) => {
          const detailParts = [
            entry.schoolDetail,
            entry.emphasis,
            entry.location,
          ].filter(Boolean);
          return (
            <Row
              key={entry.id}
              eyebrow={entry.date}
              title={entry.degree}
              subtitle={entry.school}
              description={detailParts.length > 0 ? detailParts.join(" · ") : undefined}
            />
          );
        })}
        {certEntries.length > 0 && (
          <Row eyebrow="Certifications" tags={certEntries} />
        )}
      </RowList>
    </Section>
  );
}
