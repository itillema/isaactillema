import { ExternalLink as ExternalLinkIcon, Folder, Github } from "lucide-react";
import { featuredProjects, otherProjects } from "@/data/projects";
import { socials } from "@/data/socials";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function Projects() {
  const all = [...featuredProjects, ...otherProjects];
  const githubProfile = socials.find((s) => s.label === "GitHub")?.href;

  return (
    <Section id="projects" title="Projects">
      {all.length === 0 ? (
        <p className="text-muted text-sm leading-normal">
          Project write-ups are on the way.{" "}
          {githubProfile ? (
            <>
              In the meantime, browse my{" "}
              <ExternalLink
                href={githubProfile}
                label="GitHub"
                className="text-text font-medium"
              >
                GitHub
              </ExternalLink>{" "}
              for the source.
            </>
          ) : (
            <>Reach out and I&apos;ll walk you through the highlights directly.</>
          )}
        </p>
      ) : (
        <RowList>
          {all.map((p) => {
            const primaryHref = p.external ?? p.github;
            const showBoth = p.github && p.external;
            return (
              <Row
                key={p.id}
                href={primaryHref}
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
                  showBoth ? (
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
            );
          })}
        </RowList>
      )}
    </Section>
  );
}
