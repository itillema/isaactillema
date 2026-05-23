import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <FeaturedProjects />
      <OtherProjects />
      <Contact />
    </>
  );
}
