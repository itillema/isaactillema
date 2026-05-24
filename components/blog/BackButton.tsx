"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  /** Where to send the user when there's no same-origin history to go back to. */
  fallback?: string;
  /** Visible button label. */
  label?: string;
}

/**
 * Smart back button: returns to the previous page if it was on this site,
 * otherwise pushes to the fallback (defaults to /commits). Covers direct
 * navigation, external referrers, and fresh tabs where router.back() would
 * either no-op or escape the site entirely.
 */
export function BackButton({ fallback = "/commits", label = "Version Control" }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (typeof window === "undefined") return;

    let sameOrigin = false;
    const ref = document.referrer;
    if (ref) {
      try {
        sameOrigin = new URL(ref).origin === window.location.origin;
      } catch {
        sameOrigin = false;
      }
    }

    if (sameOrigin) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-accent group inline-flex items-center text-sm font-medium"
    >
      <ArrowLeft
        aria-hidden="true"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
      />
      <span>{label}</span>
    </button>
  );
}
