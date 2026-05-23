import { bio } from "@/data/bio";

export function Footer() {
  return (
    <footer className="text-muted py-10 text-center font-mono text-xs">
      <p>
        Designed &amp; built by {bio.name}. Inspired by{" "}
        <a
          href="https://brittanychiang.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          Brittany Chiang
        </a>
        .
      </p>
    </footer>
  );
}
