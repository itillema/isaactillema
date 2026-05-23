import { bio } from "@/data/bio";

export function EmailRail() {
  return (
    <aside
      aria-label="Email"
      className="fixed bottom-0 right-6 z-20 hidden flex-col items-center gap-6 md:flex"
    >
      <a
        href={`mailto:${bio.email}`}
        className="text-muted hover:text-link font-mono text-xs tracking-widest transition-colors [writing-mode:vertical-rl]"
      >
        {bio.email}
      </a>
      <div className="bg-muted h-24 w-px" aria-hidden="true" />
    </aside>
  );
}
