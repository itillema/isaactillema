import { bio } from "@/data/bio";

export function Footer() {
  return (
    <footer className="text-muted py-10 text-center font-mono text-xs">
      <p>
        Designed &amp; built by {bio.name}.
      </p>
    </footer>
  );
}
