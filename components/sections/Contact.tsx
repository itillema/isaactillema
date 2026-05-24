import { Section } from "./Section";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="bg-glass rounded-3xl p-6 backdrop-blur-md md:p-8">
        <h3 className="text-text text-lg font-medium leading-tight">Get in touch</h3>
        <p className="text-muted mt-2 text-sm leading-normal">
          Open to consulting engagements, technical leadership conversations, and
          connections with engineers who care about quality. Drop a note and I&apos;ll
          get back to you.
        </p>
        <ContactForm />
      </div>
    </Section>
  );
}
