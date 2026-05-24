import Image from "next/image";
import type { ReactNode } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { TechTags } from "@/components/ui/TechTag";
import { cn } from "@/lib/cn";

interface RowProps {
  /** When set, the title becomes a link to this URL. */
  href?: string;
  title?: ReactNode;
  /** Plain-text title used for the `aria-label` of the link. Defaults to `title` if it's a string. */
  linkLabel?: string;
  subtitle?: ReactNode;
  /** Small uppercase date/year on the left. Mutually exclusive with `thumbnail`. */
  eyebrow?: ReactNode;
  /** 16:9 image on the left, used by Projects. Mutually exclusive with `eyebrow`. */
  thumbnail?: { src: string; alt: string };
  description?: ReactNode;
  /** Bullet list rendered under the description. */
  bullets?: string[];
  tags?: string[];
  /** Extra row of icon-links (e.g. GitHub + live site) rendered below the description. */
  meta?: ReactNode;
  /** When provided, replaces title/description/bullets/meta/tags in the right column. */
  children?: ReactNode;
}

export function Row({
  href,
  title,
  linkLabel,
  subtitle,
  eyebrow,
  thumbnail,
  description,
  bullets,
  tags,
  meta,
  children,
}: RowProps) {
  const label = linkLabel ?? (typeof title === "string" ? title : undefined);

  const titleContent = (
    <>
      <span>{title}</span>
      {subtitle && (
        <>
          {" "}
          <span className="text-text"> &middot; {subtitle}</span>
        </>
      )}
    </>
  );

  return (
    <li className="mb-12">
      <div
        className={cn(
          "group relative grid pb-1 transition-all",
          "sm:grid-cols-8 sm:gap-8 md:gap-4",
          "lg:hover:opacity-100! lg:group-hover/list:opacity-50",
        )}
      >
        {/* Hover lift — glass card with cyan glow */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-3xl transition motion-reduce:transition-none",
            "lg:-inset-x-6 lg:block",
            "lg:group-hover:bg-glass lg:group-hover:backdrop-blur-md",
          )}
        />

        {/* Left column: thumbnail OR eyebrow */}
        {thumbnail ? (
          <div className="relative z-10 sm:order-1 sm:col-span-2 sm:translate-y-1">
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              width={320}
              height={180}
              className="border-border group-hover:border-border-hover aspect-video rounded border-2 object-cover transition"
            />
          </div>
        ) : eyebrow ? (
          <header className="text-muted z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide sm:col-span-2">
            {eyebrow}
          </header>
        ) : null}

        {/* Right column: title + body, or custom children */}
        <div className={cn("z-10", thumbnail ? "sm:order-2 sm:col-span-6" : "sm:col-span-6")}>
          {children ?? (
            <>
              {title && (
                <h3 className="font-medium leading-tight">
                  {href ? (
                    <ExternalLink
                      href={href}
                      label={label}
                      className="text-text inline-flex items-baseline text-base"
                    >
                      {titleContent}
                    </ExternalLink>
                  ) : (
                    <span className="text-text inline-flex items-baseline text-base">
                      {titleContent}
                    </span>
                  )}
                </h3>
              )}

              {description && (
                <p className="text-muted mt-2 text-sm leading-normal">{description}</p>
              )}

              {bullets && bullets.length > 0 && (
                <ul className="text-muted mt-2 list-disc space-y-1 pl-5 text-sm leading-normal">
                  {bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {meta && <div className="mt-2 flex flex-wrap items-center gap-4">{meta}</div>}

              {tags && tags.length > 0 && <TechTags items={tags} className="mt-2" />}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
