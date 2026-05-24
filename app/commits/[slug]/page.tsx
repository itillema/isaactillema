import "katex/dist/katex.min.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import GithubSlugger from "github-slugger";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { BackButton } from "@/components/blog/BackButton";
import { TableOfContents, type TocItem } from "@/components/blog/TableOfContents";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

/**
 * Extracts ## and ### headings from the MDX source for the table of contents.
 * Skips headings inside fenced code blocks so R-script comments like `# ...`
 * aren't mistaken for section headers. Uses the same slugger as rehype-slug
 * so anchor links match the rendered heading IDs.
 */
function buildToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const rawText = match[2]
      .replace(/`([^`]+)`/g, "$1") // strip inline code backticks
      .replace(/\*\*([^*]+)\*\*/g, "$1") // strip bold
      .replace(/\*([^*]+)\*/g, "$1") // strip italics
      .replace(/&amp;/g, "&"); // normalize HTML entity
    items.push({ depth, text: rawText, slug: slugger.slug(rawText) });
  }

  return items;
}

export default async function CommitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = buildToc(post.content);

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:overflow-y-auto lg:py-24">
        <BackButton />
        <header className="mt-8 mb-8">
          <time
            dateTime={post.date}
            className="text-muted block text-xs uppercase tracking-widest"
          >
            {post.date}
          </time>
          <h1 className="text-text mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-muted mt-4 text-base leading-normal">{post.description}</p>
          )}
        </header>
        <TableOfContents items={toc} className="hidden lg:block" />
      </aside>
      <article className="pt-12 lg:w-[52%] lg:py-24">
        <div className="prose-invert">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  rehypeKatex,
                  [rehypePrettyCode, { theme: "github-dark" }],
                ],
              },
            }}
          />
        </div>
      </article>
    </div>
  );
}
