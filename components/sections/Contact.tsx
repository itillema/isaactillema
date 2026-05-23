import { bio } from "@/data/bio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-(--header-h) py-(--space-section)"
    >
      <ScrollReveal>
        <div className="glass mx-auto flex max-w-2xl flex-col items-center px-8 py-14 text-center md:px-12">
          <p className="text-accent mb-4 font-mono text-sm">06. What&apos;s Next?</p>
          <h2 id="contact-heading" className="text-text mb-6 text-3xl font-bold md:text-4xl">
            Get In Touch
          </h2>
          <p className="text-text-soft mb-10 max-w-xl">
            Open to consulting engagements, technical leadership conversations, and
            connections with engineers who care about quality. My inbox is always open —
            drop a line and I&apos;ll get back to you.
          </p>
          <Button as="a" href={`mailto:${bio.email}`}>
            Say Hello
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
