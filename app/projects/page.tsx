import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { bio } from "@/data/bio";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engagements and side work.",
};

function variantFor(index: number): "large" | "normal" {
  // Every 5th card (positions 0, 5, 10, …) lifts to a featured 2×2 cell.
  return index % 5 === 0 ? "large" : "normal";
}

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <div className="lg:py-24">
      <Link
        href="/"
        className="text-accent group inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft
          aria-hidden="true"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
        />
        <span>{bio.name}</span>
      </Link>

      <h1 className="text-text mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:mt-8 md:text-7xl">
        Projects
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-normal">
        Selected engagements and side work — featured items pinned to the top.
      </p>

      <div className="mt-12 md:mt-16">
        {projects.length === 0 ? (
          <p className="text-muted text-sm leading-normal">First project coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3 md:gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant={variantFor(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
