"use client";

import { useActiveSection } from "@/lib/useActiveSection";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";

export function SidebarNav() {
  const active = useActiveSection(navItems.map((i) => i.id));

  return (
    <nav className="nav mt-16 hidden w-max lg:block" aria-label="In-page">
      <ul className="flex flex-col" role="list">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                data-active={isActive ? "true" : undefined}
                className="group flex items-center py-3"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mr-4 h-px w-8 bg-muted transition-all",
                    "group-hover:w-16 group-hover:bg-text",
                    "group-focus-visible:w-16 group-focus-visible:bg-text",
                    "group-data-[active=true]:w-16 group-data-[active=true]:bg-text",
                    "motion-reduce:transition-none",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-colors",
                    "text-muted",
                    "group-hover:text-text",
                    "group-focus-visible:text-text",
                    "group-data-[active=true]:text-text",
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
