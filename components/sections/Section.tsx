import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./SectionHeader";

interface SectionProps {
  id: string;
  /** Section label — sticky header on mobile, sr-only on desktop. */
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * v6 section primitive. On mobile, the section title becomes a translucent
 * sticky header that only turns glassy once it pins to the top of the viewport.
 * On desktop (≥1024px), the header is visually hidden — the sidebar nav is the
 * only orientation cue.
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
      <SectionHeader title={title} />
      <div>{children}</div>
    </section>
  );
}
