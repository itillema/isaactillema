import { Sidebar } from "@/components/Sidebar";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { VersionControl } from "@/components/sections/VersionControl";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <Sidebar />
        <main id="main" className="pt-24 lg:w-[52%] lg:py-24">
          <About />
          <Experience />
          <Education />
          <Projects />
          <VersionControl />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
