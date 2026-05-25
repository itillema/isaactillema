import Image from "next/image";
import Link from "next/link";
import { Folder } from "lucide-react";
import type { ProjectMeta } from "@/lib/types";
import { TechTags } from "@/components/ui/TechTag";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: ProjectMeta;
  variant?: "large" | "normal";
}

/**
 * The project's ogImage (or image.src) fills the card as a background, with a bottom-to-top gradient overlay for text legibility. Falls back to a glass panel + Folder icon when no image exists.
 */
export function ProjectCard({ project, variant = "normal" }: ProjectCardProps) {
  const isLarge = variant === "large";
  const bgSrc = project.ogImage ?? project.image?.src;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={project.title}
      className={cn(
        "group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-3xl",
        "transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1",
        isLarge && "md:col-span-2 md:row-span-2",
      )}
    >
      {/* Background: image or glass fallback */}
      {bgSrc ? (
        <Image
          src={bgSrc}
          alt=""
          fill
          sizes={
            isLarge
              ? "(min-width: 1440px) 920px, (min-width: 768px) 66vw, 100vw"
              : "(min-width: 1440px) 460px, (min-width: 768px) 33vw, 100vw"
          }
          className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div aria-hidden="true" className="bg-glass absolute inset-0 -z-20 backdrop-blur-md" />
      )}

      {/* Bottom-to-top gradient for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/55 to-black/10"
      />

      {/* Folder corner when there's no image to anchor the card */}
      {!bgSrc && (
        <Folder
          className="text-accent absolute top-6 right-6 h-7 w-7 opacity-50"
          aria-hidden="true"
        />
      )}

      {/* Foreground content */}
      <div className={cn("relative p-6", isLarge && "md:p-8")}>
        {project.featured && (
          <p className="text-accent text-xs font-semibold uppercase tracking-widest">
            Featured
          </p>
        )}
        <h2
          className={cn(
            "text-text mt-2 font-bold tracking-tight",
            isLarge ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {project.title}
        </h2>
        {project.description && (
          <p
            className={cn(
              "text-muted mt-2 leading-normal",
              isLarge ? "line-clamp-3 text-base" : "line-clamp-2 text-sm",
            )}
          >
            {project.description}
          </p>
        )}
        {project.tech.length > 0 && (
          <TechTags items={project.tech} className="mt-3" />
        )}
      </div>
    </Link>
  );
}
