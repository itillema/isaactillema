import { bio } from "@/data/bio";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function Footer() {
  return (
    <footer className="text-muted text-sm leading-normal">
      <p>
        Built by {bio.name} with{" "}
        <ExternalLink
          href="https://nextjs.org/"
          label="Next.js"
          className="text-muted hover:text-text font-medium transition-colors"
          showArrow={false}
        >
          Next.js
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink
          href="https://tailwindcss.com/"
          label="Tailwind CSS"
          className="text-muted hover:text-text font-medium transition-colors"
          showArrow={false}
        >
          Tailwind CSS
        </ExternalLink>
        , deployed on{" "}
        <ExternalLink
          href="https://vercel.com/"
          label="Vercel"
          className="text-muted hover:text-text font-medium transition-colors"
          showArrow={false}
        >
          Vercel
        </ExternalLink>
        .
      </p>
    </footer>
  );
}
