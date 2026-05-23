"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/cn";

export function FeaturedProjects() {
  const sorted = [...featuredProjects].sort((a, b) => a.order - b.order);
  const reduce = useReducedMotion();
  if (sorted.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="featured-heading"
      className="scroll-mt-(--header-h) py-(--space-section)"
    >
      <ScrollReveal>
        <SectionHeading id="featured-heading" number="03">
          Some Things I&apos;ve Built
        </SectionHeading>
      </ScrollReveal>
      <ul className="space-y-24">
        {sorted.map((project, i) => {
          const reversed = i % 2 === 1;
          const reveal = reduce
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-80px" },
                transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] as const },
              };
          return (
            <motion.li
              key={project.id}
              {...reveal}
              className="grid grid-cols-1 items-center gap-6 md:grid-cols-12"
            >
              <div
                className={cn(
                  "md:col-span-7",
                  reversed ? "md:col-start-6" : "md:col-start-1",
                  "glass aspect-video",
                )}
                aria-hidden="true"
              />
              <div
                className={cn(
                  "md:col-span-6",
                  reversed
                    ? "md:col-start-1 md:row-start-1 md:text-left"
                    : "md:col-start-7 md:row-start-1 md:text-right",
                  "relative z-10 space-y-3",
                )}
              >
                <p className="text-accent font-mono text-xs">Featured Project</p>
                <h3 className="text-text text-2xl font-semibold">{project.title}</h3>
                <div className="glass text-text-soft p-5 shadow-(--shadow-card)">
                  <p>{project.description}</p>
                </div>
                <ul
                  className={cn(
                    "text-muted flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs",
                    reversed ? "justify-start" : "md:justify-end",
                  )}
                >
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div
                  className={cn(
                    "flex items-center gap-4",
                    reversed ? "justify-start" : "md:justify-end",
                  )}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      aria-label={`${project.title} on GitHub`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <Github size={20} />
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
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
