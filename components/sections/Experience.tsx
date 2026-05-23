"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { experience } from "@/data/experience";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/cn";

export function Experience() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(i: number) {
    const next = (i + experience.length) % experience.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(experience.length - 1);
        break;
    }
  }

  if (experience.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-(--header-h) py-(--space-section)"
    >
      <ScrollReveal>
        <SectionHeading id="experience-heading" number="02">
          Where I&apos;ve Worked
        </SectionHeading>
      </ScrollReveal>
      <ScrollReveal>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div
            role="tablist"
            aria-label="Companies"
            className="border-border flex overflow-x-auto border-b md:flex-col md:border-b-0 md:border-l"
          >
            {experience.map((job, i) => (
              <button
                key={job.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${job.id}`}
                aria-controls={`panel-${job.id}`}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "shrink-0 px-4 py-2 text-left font-mono text-sm whitespace-nowrap transition-colors",
                  "hover:bg-accent-soft focus-visible:bg-accent-soft",
                  active === i
                    ? "text-accent border-accent md:-ml-px md:border-l-2"
                    : "text-muted",
                )}
              >
                {job.company}
              </button>
            ))}
          </div>
          <div className="min-h-[20rem] flex-1">
            {experience.map((job, i) => (
              <div
                key={job.id}
                role="tabpanel"
                id={`panel-${job.id}`}
                aria-labelledby={`tab-${job.id}`}
                hidden={active !== i}
                className="space-y-4"
              >
                <h3 className="text-text text-xl font-semibold">
                  <span>{job.role}</span>
                  {job.companyUrl && (
                    <>
                      {" "}
                      <span className="text-accent">@</span>{" "}
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {job.company}
                      </a>
                    </>
                  )}
                  {!job.companyUrl && (
                    <>
                      {" "}
                      <span className="text-accent">@ {job.company}</span>
                    </>
                  )}
                </h3>
                <p className="text-muted font-mono text-sm">
                  {job.start} — {job.end}
                </p>
                <ul className="text-muted space-y-2">
                  {job.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent mt-1.5 shrink-0">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {job.stack && job.stack.length > 0 && (
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-2 font-mono text-xs">
                    {job.stack.map((t) => (
                      <li key={t} className="text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
