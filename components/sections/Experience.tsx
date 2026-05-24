import { experience } from "@/data/experience";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      <RowList as="ol">
        {experience.map((job) => (
          <Row
            key={job.id}
            eyebrow={`${job.start} — ${job.end}`}
            bullets={job.bullets}
            tags={job.stack}
          >
            <div className="space-y-1">
              <div className="text-text text-base font-medium leading-tight">
                {job.companyUrl ? (
                  <ExternalLink
                    href={job.companyUrl}
                    label={job.company}
                    className="text-text inline-flex items-baseline"
                  >
                    {job.company}
                  </ExternalLink>
                ) : (
                  job.company
                )}
              </div>
              <div className="text-accent text-base leading-tight">{job.role}</div>
            </div>
          </Row>
        ))}
      </RowList>
    </Section>
  );
}
