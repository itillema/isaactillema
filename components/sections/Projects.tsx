import { ExternalLink as ExternalLinkIcon, Folder, Github } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";
import { ExternalLink } from "@/components/ui/ExternalLink";

const PROJECTS_ON_HOME = 5;

export function Projects() {
  const all = getAllProjects();
  const visible = all.slice(0, PROJECTS_ON_HOME);

  return (
    <Section id="projects" title="Projects">
      <p className="text-muted mb-6 text-sm leading-normal">
        Some work of mine.
      </p>

      {visible.length > 0 && (
        <RowList>
          {visible.map((p) => (
            <Row
              key={p.slug}
              href={`/projects/${p.slug}`}
              linkLabel={p.title}
              title={p.title}
              thumbnail={p.image}
              eyebrow={
                p.image ? undefined : (
                  <Folder className="text-accent h-6 w-6" aria-hidden="true" />
                )
              }
              description={p.description}
              tags={p.tech}
              meta={
                p.github || p.external ? (
                  <>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} on GitHub (opens in a new tab)`}
                        className="text-text hover:text-accent inline-flex items-center text-sm font-medium transition-colors"
                      >
                        <Github className="mr-1 h-4 w-4" aria-hidden="true" />
                        <span>Source</span>
                      </a>
                    )}
                    {p.external && (
                      <a
                        href={p.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} live site (opens in a new tab)`}
                        className="text-text hover:text-accent inline-flex items-center text-sm font-medium transition-colors"
                      >
                        <ExternalLinkIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                        <span>Live</span>
                      </a>
                    )}
                  </>
                ) : undefined
              }
            />
          ))}
        </RowList>
      )}

      <div className={visible.length > 0 ? "mt-2" : undefined}>
        <ExternalLink
          href="/projects"
          className="text-text inline-flex items-baseline font-medium"
        >
          View all projects
        </ExternalLink>
      </div>
    </Section>
  );
}
