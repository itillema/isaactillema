import { bio } from "@/data/bio";
import { Section } from "./Section";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function About() {
  const firstName = bio.name.split(" ")[0];

  return (
    <Section id="about" title="About">
      <div className="space-y-4">
        <p>
          Hey there! I&apos;m {firstName}, a Senior Quality Engineer and Architect based in{" "}
          {bio.location}.  I&apos;ve spent the last six years in engineering and consulting leadership, architecting scalable test automation, optimizing CI/CD pipelines, and elevating brand equity by leading
          agile teams to consistently ship software people can trust.  In my personal time, you&apos;ll find me brewing and consuming an inordinate amount of espresso, cycling around the midwest, or spending quality time with my family.
        </p>
        <p>
          Today I lead the QA practice at{" "}
          <ExternalLink
            href="https://www.officeofexperience.com/"
            label="The Office of Experience"
            className="text-text font-medium"
            showArrow={false}
          >
            The Office of Experience
          </ExternalLink>
          , where my team and I architect automation for ecommerce and lead-gen
          engagements, build custom CI/CD deployment and reporting pipelines, and engineer
          an internal AI Testing framework that supports AI-native products and tools.
          I&apos;m especially interested in defining QA-as-a-Service offerings that turn
          quality into a revenue lever rather than a cost center.
        </p>
        <p>
          You can read the long version on my{" "}
          <ExternalLink
            href={bio.resumeHref}
            label="résumé"
            className="text-text font-medium"
          >
            résumé
          </ExternalLink>
          .
        </p>
        <p>
          In my personal time, you&apos;ll find me brewing and consuming an inordinate amount of espresso, cycling around the midwest, or spending quality time with my family.
        </p>
      </div>
    </Section>
  );
}
