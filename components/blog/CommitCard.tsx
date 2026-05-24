import Image from "next/image";
import Link from "next/link";
import { GitCommit } from "lucide-react";
import type { BlogPostMeta } from "@/lib/types";
import { TechTags } from "@/components/ui/TechTag";
import { cn } from "@/lib/cn";

interface CommitCardProps {
  post: BlogPostMeta;
  variant?: "large" | "normal";
}

/**
 * Card for the /commits archive. The post's ogImage fills the card as a
 * background, with a bottom-to-top gradient overlay for text legibility.
 * Falls back to a glass panel + GitCommit icon when no ogImage exists.
 */
export function CommitCard({ post, variant = "normal" }: CommitCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      href={`/commits/${post.slug}`}
      aria-label={post.title}
      className={cn(
        "group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-3xl",
        "transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1",
        isLarge && "md:col-span-2 md:row-span-2",
      )}
    >
      {/* Background: image or glass fallback */}
      {post.ogImage ? (
        <Image
          src={post.ogImage}
          alt=""
          fill
          sizes={
            isLarge
              ? "(min-width: 1440px) 920px, (min-width: 768px) 66vw, 100vw"
              : "(min-width: 1440px) 460px, (min-width: 768px) 33vw, 100vw"
          }
          className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div aria-hidden="true" className="bg-glass absolute inset-0 -z-20 backdrop-blur-md" />
      )}

      {/* Bottom-to-top gradient for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/55 to-black/10"
      />

      {/* Icon corner when there's no image to anchor the card */}
      {!post.ogImage && (
        <GitCommit
          className="text-accent absolute top-6 right-6 h-7 w-7 opacity-50"
          aria-hidden="true"
        />
      )}

      {/* Foreground content */}
      <div className={cn("relative p-6", isLarge && "md:p-8")}>
        <time
          dateTime={post.date}
          className="text-muted text-xs font-semibold uppercase tracking-widest"
        >
          {post.date}
        </time>
        <h2
          className={cn(
            "text-text mt-2 font-bold tracking-tight",
            isLarge ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h2>
        {post.description && (
          <p
            className={cn(
              "text-muted mt-2 leading-normal",
              isLarge ? "line-clamp-3 text-base" : "line-clamp-2 text-sm",
            )}
          >
            {post.description}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <TechTags items={post.tags} className="mt-3" />
        )}
      </div>
    </Link>
  );
}
