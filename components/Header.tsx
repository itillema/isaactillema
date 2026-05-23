"use client";

import { useScrollDirection } from "@/lib/useScrollDirection";
import { Nav } from "@/components/Nav";
import { MobileMenu } from "@/components/MobileMenu";
import { cn } from "@/lib/cn";

export function Header() {
  const { direction, scrollY } = useScrollDirection(8);
  const scrolled = scrollY > 40;
  const hidden = direction === "down" && scrolled;

  return (
    <header
      className={cn(
        "bg-bg/90 fixed inset-x-0 top-0 z-30 backdrop-blur transition-transform duration-300 ease-out",
        scrolled ? "h-(--header-h-compact) shadow-md" : "h-(--header-h)",
        hidden ? "-translate-y-full" : "translate-y-0",
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
