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
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { BackButton } from "@/components/blog/BackButton";

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

export default async function CommitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <BackButton />
      <header className="mt-8 mb-10">
        <time dateTime={post.date} className="text-muted block text-xs uppercase tracking-widest">
          {post.date}
        </time>
        <h1 className="text-text mt-3 text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.description && (
          <p className="text-muted mt-3 text-lg leading-normal">{post.description}</p>
        )}
      </header>
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
  );
}
