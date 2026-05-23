"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { bio } from "@/data/bio";
import { cn } from "@/lib/cn";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="text-accent hover:bg-accent-soft relative z-50 inline-flex h-10 w-10 items-center justify-center rounded transition-colors"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "bg-surface fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label="Mobile primary" className="flex flex-col items-center gap-8">
          <ol className="flex flex-col items-center gap-6 font-mono text-base">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-text hover:text-accent text-center transition-colors"
                >
                  <span className="text-accent block text-xs">0{i + 1}.</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href={bio.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="border-accent text-accent hover:bg-accent-soft font-mono text-sm px-6 py-3 border rounded transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
    </div>
  );
}
