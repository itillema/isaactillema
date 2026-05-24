import { GitCommit } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { Section } from "./Section";
import { RowList } from "./RowList";
import { Row } from "./Row";
import { ExternalLink } from "@/components/ui/ExternalLink";

const POSTS_ON_HOME = 5;

export function VersionControl() {
  const posts = getAllPosts();
  const visible = posts.slice(0, POSTS_ON_HOME);

  return (
    <Section id="version-control" title="Version Control">
      <p className="text-muted mb-6 text-sm leading-normal">
        A commit log of what I&apos;m learning, building, and breaking.
      </p>

      {visible.length > 0 && (
        <RowList>
          {visible.map((post) => (
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

      <div className={visible.length > 0 ? "mt-2" : undefined}>
        <ExternalLink
          href="/commits"
          className="text-text inline-flex items-baseline font-medium"
        >
          View all commits
        </ExternalLink>
      </div>
    </Section>
  );
}
