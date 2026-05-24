import { bio } from "@/data/bio";

export function Footer() {
  return (
    <footer className="text-muted text-sm leading-normal">
      <p>
        Designed and built by {bio.name}.
      </p>
    </footer>
  );
}
