import Link from "next/link";
import { bio } from "@/data/bio";
import { SidebarNav } from "./SidebarNav";

export function SidebarHero() {
  return (
    <div>
      <h1 className="text-text text-4xl font-bold tracking-tight sm:text-5xl">
        <Link href="/" className="hover:bg-gradient-accent transition-all hover:bg-clip-text hover:text-transparent">
          {bio.name}
        </Link>
      </h1>
      <h2 className="text-text mt-3 text-lg font-medium tracking-tight sm:text-xl">
        {bio.role}
      </h2>
      <p className="text-muted mt-4 max-w-xs leading-normal">{bio.tagline}</p>
      <SidebarNav />
    </div>
  );
}
