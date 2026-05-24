import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Visible aria label — appended with " (opens in a new tab)". Defaults to text content. */
  label?: string;
  showArrow?: boolean;
}

/**
 * Anchor + animated arrow used everywhere the design calls for the v6 "title with nudging arrow".
 * Sets target="_blank" for http/mailto/tel links; same-origin paths stay in-tab.
 */
export function ExternalLink({
  href,
  children,
  className,
  label,
  showArrow = true,
}: ExternalLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      aria-label={isExternal && label ? `${label} (opens in a new tab)` : undefined}
      className={cn("group/link inline-flex items-baseline", className)}
    >
      <span>{children}</span>
      {showArrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform motion-reduce:transition-none group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </a>
  );
}
