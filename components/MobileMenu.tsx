"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { bio } from "@/data/bio";
import { cn } from "@/lib/cn";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // The header that hosts <MobileMenu /> always has a non-none transform applied
  // (translate-y classes for the show/hide animation), which makes it the
  // containing block for any position:fixed descendant. Portal the dialog to
  // document.body so its fixed inset-0 resolves against the viewport instead.
  const dialog = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={cn(
        "bg-surface fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className="text-accent hover:bg-accent-soft absolute top-5 right-6 inline-flex h-10 w-10 items-center justify-center rounded transition-colors"
      >
        <X size={22} />
      </button>
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
          className="border-accent text-accent hover:bg-accent-soft font-mono text-sm px-6 py-3 border rounded-(--radius-pill) transition-colors"
        >
          Resume
        </a>
      </nav>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="text-accent hover:bg-accent-soft inline-flex h-10 w-10 items-center justify-center rounded transition-colors"
      >
        <Menu size={22} />
      </button>
      {mounted && createPortal(dialog, document.body)}
    </div>
  );
}
