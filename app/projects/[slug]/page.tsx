import "katex/dist/katex.min.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ExternalLink as ExternalLinkIcon, Github } from "lucide-react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { buildToc } from "@/lib/toc";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { BackButton } from "@/components/blog/BackButton";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { TechTags } from "@/components/ui/TechTag";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      ...(project.date ? { publishedTime: project.date } : {}),
      ...(project.ogImage ? { images: [project.ogImage] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const toc = buildToc(project.content);
  const hasLinks = Boolean(project.github || project.external);

  return (
    <div className="lg:flex lg:justify-between lg:gap-8">
      <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/3 lg:flex-col lg:py-24">
        <BackButton fallback="/projects" label="Projects" />
        {toc.length > 0 && (
          <div className="glass mt-8 hidden flex-1 overflow-hidden lg:flex">
            <div className="scrollbar-thumb-only h-full w-full overflow-y-auto p-6">
              <TableOfContents items={toc} />
            </div>
          </div>
        )}
      </aside>
      <article className="pt-12 lg:w-2/3 lg:py-24">
        <header className="mb-10">
          {project.featured && (
            <p className="text-accent text-xs font-semibold uppercase tracking-widest">
              Featured Project
            </p>
          )}
          {project.date && (
            <time
              dateTime={project.date}
              className="text-muted mt-1 block text-xs uppercase tracking-widest"
            >
              {project.date}
            </time>
          )}
          <h1 className="text-text mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-muted mt-4 text-lg leading-normal">
              {project.description}
            </p>
          )}
          {project.tech.length > 0 && (
            <TechTags items={project.tech} className="mt-4" />
          )}
          {hasLinks && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub (opens in a new tab)`}
                  className="border-border hover:border-border-hover text-text hover:text-accent inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>View source</span>
                </a>
              )}
              {project.external && (
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site (opens in a new tab)`}
                  className="bg-accent text-bg inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:opacity-90"
                >
                  <ExternalLinkIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Visit site</span>
                </a>
              )}
            </div>
          )}
        </header>

        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image.src}
            alt={project.image.alt}
            className="border-border my-8 w-full rounded-xl border"
          />
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="text-text mt-10 mb-4 text-2xl font-semibold">Highlights</h2>
            <ul className="text-muted my-4 list-disc space-y-2 pl-6">
              {project.highlights.map((h, i) => (
                <li key={i} className="leading-relaxed">{h}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="prose-invert">
          <MDXRemote
            source={project.content}
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
