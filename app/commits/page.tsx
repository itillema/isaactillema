import type { Metadata } from "next";
import { GitCommit } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { RowList } from "@/components/sections/RowList";
import { Row } from "@/components/sections/Row";

export const metadata: Metadata = {
  title: "Version Control",
  description: "A commit log of what I'm learning, building, and breaking.",
};

export default function CommitsIndex() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="text-text text-4xl font-bold tracking-tight sm:text-5xl">
        Version Control
      </h1>
      <p className="text-muted mt-4 max-w-xl leading-normal">
        A commit log of what I&apos;m learning, building, and breaking.
      </p>

      <div className="mt-12">
        {posts.length === 0 ? (
          <p className="text-muted text-sm leading-normal">First post coming soon.</p>
        ) : (
          <RowList>
            {posts.map((post) => (
              <Row
                key={post.slug}
                href={`/commits/${post.slug}`}
                linkLabel={post.title}
                title={post.title}
                thumbnail={
                  post.ogImage ? { src: post.ogImage, alt: post.title } : undefined
                }
                eyebrow={
                  post.ogImage ? undefined : (
                    <GitCommit className="text-accent h-6 w-6" aria-hidden="true" />
                  )
                }
                description={post.description}
                tags={post.tags}
              />
            ))}
          </RowList>
        )}
      </div>
    </section>
  );
}
