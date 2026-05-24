import { bio } from "@/data/bio";
import { Section } from "./Section";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p>
        Open to consulting engagements, technical leadership conversations, and
        connections with engineers who care about quality. My inbox is always open — drop
        a line at{" "}
        <ExternalLink
          href={`mailto:${bio.email}`}
          label={bio.email}
          className="text-text font-medium"
          showArrow={false}
        >
          {bio.email}
        </ExternalLink>{" "}
        and I&apos;ll get back to you.
      </p>
    </Section>
  );
}
