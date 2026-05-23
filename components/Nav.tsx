"use client";

import { useActiveSection } from "@/lib/useActiveSection";
import { navItems } from "@/data/nav";
import { bio } from "@/data/bio";
import { cn } from "@/lib/cn";

export function Nav({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  const active = useActiveSection(navItems.map((i) => i.id));

  return (
    <nav
      aria-label="Primary"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-6"
          : "flex flex-col gap-4 text-base",
      )}
    >
      <ol
        className={cn(
          orientation === "horizontal"
            ? "flex items-center gap-6 font-mono text-sm"
            : "flex flex-col gap-4 font-mono",
        )}
      >
        {navItems.map((item, i) => (
          <li key={item.id}>
            <a
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "hover:text-accent transition-colors",
                active === item.id ? "text-accent" : "text-text",
              )}
            >
              <span className="text-accent mr-1">0{i + 1}.</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      <a
        href={bio.resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="border-accent text-accent hover:bg-accent-soft font-mono text-sm px-4 py-2 border rounded-(--radius-pill) transition-colors"
      >
        Resume
      </a>
    </nav>
  );
}
