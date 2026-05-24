import { experience } from "@/data/experience";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      <RowList as="ol">
        {experience.map((job) => (
          <Row
            key={job.id}
            eyebrow={`${job.start} — ${job.end}`}
            href={job.companyUrl}
            linkLabel={`${job.role} at ${job.company}`}
            title={job.role}
            subtitle={job.company}
            bullets={job.bullets}
            tags={job.stack}
          />
        ))}
      </RowList>
    </Section>
  );
}
