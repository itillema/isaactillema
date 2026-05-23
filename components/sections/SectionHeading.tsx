import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  number: string;
  children: ReactNode;
  id: string;
  className?: string;
}

export function SectionHeading({ number, children, id, className }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-text mb-10 flex items-center gap-4 text-2xl font-bold md:text-3xl",
        className,
      )}
    >
      <span className="text-accent font-mono text-base md:text-xl">{number}.</span>
      <span className="whitespace-nowrap">{children}</span>
      <span className="bg-border ml-4 h-px max-w-[300px] flex-1" aria-hidden="true" />
    </h2>
  );
}
