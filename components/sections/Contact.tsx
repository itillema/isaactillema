import { bio } from "@/data/bio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-(--header-h) flex flex-col items-center py-(--space-section) text-center"
    >
      <ScrollReveal>
        <p className="text-accent mb-4 font-mono text-sm">05. What&apos;s Next?</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 id="contact-heading" className="text-text mb-6 text-3xl font-bold md:text-4xl">
          Get In Touch
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p className="text-muted mb-10 max-w-xl">
          Placeholder copy for the contact section. The content pass will refine this to match
          your voice — keep it warm and inviting.
        </p>
      </ScrollReveal>
      <ScrollReveal>
        <Button as="a" href={`mailto:${bio.email}`}>
          Say Hello
        </Button>
      </ScrollReveal>
    </section>
  );
}
