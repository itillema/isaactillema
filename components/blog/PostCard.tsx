import Link from "next/link";
import type { BlogPostMeta } from "@/lib/types";

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="border-border hover:border-accent rounded border p-6 transition-colors">
      <Link href={`/blog/${post.slug}`} className="group block space-y-2">
        <time
          dateTime={post.date}
          className="text-muted block font-mono text-xs"
        >
          {post.date}
        </time>
        <h2 className="text-text group-hover:text-link text-xl font-semibold transition-colors">
          {post.title}
        </h2>
        {post.description && <p className="text-muted text-sm">{post.description}</p>}
        {post.tags && post.tags.length > 0 && (
          <ul className="text-muted flex flex-wrap gap-x-3 gap-y-1 pt-2 font-mono text-xs">
            {post.tags.map((t) => (
              <li key={t}>#{t}</li>
            ))}
          </ul>
        )}
      </Link>
    </article>
  );
}
