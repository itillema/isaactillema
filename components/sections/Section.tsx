import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  /** Section label — visible on mobile as sticky header, sr-only on desktop. */
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * v6 section primitive. On mobile, the section title becomes a translucent
 * sticky header you see scroll past. On desktop (≥1024px), the header is
 * visually hidden — the sidebar nav is the only orientation cue.
 */
export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={title}
      className={cn(
        "mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24",
        className,
      )}
    >
      <div
        className={cn(
          "bg-bg/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur",
          "md:-mx-12 md:px-12",
          "lg:relative lg:top-auto lg:mx-auto lg:w-full lg:bg-transparent lg:px-0 lg:py-0 lg:opacity-0 lg:backdrop-blur-0",
        )}
      >
        <h2 className="text-text text-sm font-bold uppercase tracking-widest lg:sr-only">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
