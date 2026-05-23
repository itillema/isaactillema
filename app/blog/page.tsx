import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software, testing, and the craft.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="py-(--space-section)">
      <h1 className="text-text mb-3 text-4xl font-bold">Blog</h1>
      <p className="text-muted mb-12 max-w-xl">
        Notes on software, testing, and the craft.
      </p>
      {posts.length === 0 ? (
        <p className="text-muted font-mono text-sm">
          No posts yet. Drop an <code className="text-accent">.mdx</code> file in{" "}
          <code className="text-accent">content/blog/</code> to get started.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
