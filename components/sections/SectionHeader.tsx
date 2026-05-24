"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Mobile-only sticky section label. Stays transparent while sitting in the
 * natural document flow; the glass background fades in only when the element
 * is actually pinned at the top of the viewport. Hidden on desktop (lg+).
 *
 * "Stuck" detection: a sticky element with `top: -1px` is fully in view when
 * not pinned (intersectionRatio === 1); once pinned, the 1px clip drops the
 * ratio below 1, which we use as the stuck signal.
 */
export function SectionHeader({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(entry.intersectionRatio < 1),
      { threshold: [1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky -top-px z-20 -mx-6 mb-4 w-screen px-6 py-5 transition-colors duration-200",
        stuck && "bg-bg/75 backdrop-blur",
        "md:-mx-12 md:px-12",
        "lg:relative lg:top-auto lg:mx-auto lg:w-full lg:bg-transparent lg:px-0 lg:py-0 lg:opacity-0 lg:backdrop-blur-0",
      )}
    >
      <h2 className="text-text text-sm font-bold uppercase tracking-widest lg:sr-only">
        {title}
      </h2>
    </div>
  );
}
