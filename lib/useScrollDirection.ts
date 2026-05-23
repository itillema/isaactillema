"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold = 5) {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        if (Math.abs(current - last) > threshold) {
          setDirection(current > last ? "down" : "up");
          last = current;
        }
        setScrollY(current);
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setScrollY(window.scrollY);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrollY };
}
