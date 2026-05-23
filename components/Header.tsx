"use client";

import { useScrollDirection } from "@/lib/useScrollDirection";
import { Nav } from "@/components/Nav";
import { MobileMenu } from "@/components/MobileMenu";
import { cn } from "@/lib/cn";

export function Header() {
  const { scrollY } = useScrollDirection(8);
  const atTop = scrollY <= 8;

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ease-out",
        atTop
          ? "h-(--header-h) w-full"
          : "mt-4 h-(--header-h-compact) w-[min(calc(100%-2rem),var(--max-w-content))] glass-strong rounded-(--radius-pill) shadow-lg",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-(--max-w-content) items-center justify-between px-6 md:px-12">
        <a href="#top" aria-label="Home" className="font-mono">
          <span className="text-accent text-xl font-bold">IT</span>
        </a>
        <div className="hidden md:block">
          <Nav />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
