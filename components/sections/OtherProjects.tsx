"use client";

import { useState } from "react";
import { ExternalLink, Folder, Github } from "lucide-react";
import { otherProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";

const VISIBLE_DEFAULT = 6;

export function OtherProjects() {
  const [showAll, setShowAll] = useState(false);
  if (otherProjects.length === 0) return null;

  const shown = showAll ? otherProjects : otherProjects.slice(0, VISIBLE_DEFAULT);

  return (
    <section
      id="more-projects"
      aria-labelledby="other-heading"
      className="scroll-mt-(--header-h) py-(--space-section)"
    >
      <ScrollReveal>
        <SectionHeading id="other-heading" number="04">
          Other Noteworthy Projects
        </SectionHeading>
      </ScrollReveal>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ScrollReveal key={project.id}>
            <li className="glass hover:-translate-y-1 flex h-full flex-col gap-4 p-6 shadow-(--shadow-card) transition-transform duration-200">
              <div className="flex items-start justify-between">
                <Folder className="text-accent" size={28} />
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      aria-label={`${project.title} on GitHub`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      aria-label={`${project.title} live site`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-text text-lg font-semibold">
                {project.external ? (
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="text-muted flex-1 text-sm">{project.description}</p>
              <ul className="text-muted flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          </ScrollReveal>
        ))}
      </ul>
      {otherProjects.length > VISIBLE_DEFAULT && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="border-accent text-accent hover:bg-accent-soft font-mono text-sm px-5 py-3 border rounded transition-colors"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}
