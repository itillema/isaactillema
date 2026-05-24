import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { bio } from "@/data/bio";
import { CommitCard } from "@/components/blog/CommitCard";

export const metadata: Metadata = {
  title: "Version Control",
  description: "A commit log of what I'm learning, building, and breaking.",
};

function variantFor(index: number): "large" | "normal" {
  // Every 5th card (positions 0, 5, 10, …) lifts to a featured 2×2 cell.
  return index % 5 === 0 ? "large" : "normal";
}

export default function CommitsIndex() {
  const posts = getAllPosts();

  return (
    <div className="lg:py-24">
      <Link
        href="/"
        className="text-accent group inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft
          aria-hidden="true"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
        />
        <span>{bio.name}</span>
      </Link>

      <h1 className="text-text mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:mt-8 md:text-7xl">
        Version Control
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-normal">
        A commit log of what I&apos;m learning, building, and breaking.
      </p>

      <div className="mt-12 md:mt-16">
        {posts.length === 0 ? (
          <p className="text-muted text-sm leading-normal">First post coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3 md:gap-6">
            {posts.map((post, i) => (
              <CommitCard key={post.slug} post={post} variant={variantFor(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
