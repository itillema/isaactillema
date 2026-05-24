import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <li className="mr-1.5 mt-2">
      <div className="bg-accent-soft text-accent flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5">
        {children}
      </div>
    </li>
  );
}

export function TechTags({ items, className }: { items: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <ul aria-label="Technologies used" className={cn("flex flex-wrap", className)}>
      {items.map((t) => (
        <TechTag key={t}>{t}</TechTag>
      ))}
    </ul>
  );
}
