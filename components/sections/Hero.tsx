import { bio } from "@/data/bio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100vh-var(--header-h))] flex-col justify-center"
    >
      <ScrollReveal delay={0.1}>
        <p className="text-accent mb-4 font-mono text-sm md:text-base">Hi, my name is</p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <h1
          id="hero-heading"
          className="text-text text-(length:--fs-display) leading-tight font-bold tracking-tight"
        >
          {bio.name}.
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <h2 className="text-muted mt-2 text-(length:--fs-display) leading-tight font-bold tracking-tight">
          I build things for the web.
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <p className="text-muted mt-6 max-w-xl text-base md:text-lg">{bio.intro}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.5}>
        <div className="mt-10">
          <Button as="a" href="#contact">
            Get in touch
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
