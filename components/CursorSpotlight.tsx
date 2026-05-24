"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport pointer-event-none gradient that follows the cursor.
 * Uses requestAnimationFrame so mousemove fires at one repaint per frame.
 * Skipped on touch devices and when the user prefers reduced motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduce) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      const el = ref.current;
      if (el) {
        el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, var(--color-spotlight), transparent 80%)`;
      }
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
    />
  );
}
