import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/lib/types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir(): boolean {
  return fs.existsSync(POSTS_DIR) && fs.statSync(POSTS_DIR).isDirectory();
}

function readPostFile(filename: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx?$/, "");

  const meta: BlogPostMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    draft: Boolean(data.draft),
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
  };

  if (meta.draft && process.env.NODE_ENV === "production") return null;

  return { ...meta, content };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!ensureDir()) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  const posts = files
    .map((f) => readPostFile(f))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts.map((p) => {
    const { content, ...meta } = p;
    void content;
    return meta;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!ensureDir()) return null;
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  const filename = candidates.find((c) => fs.existsSync(path.join(POSTS_DIR, c)));
  if (!filename) return null;
  return readPostFile(filename);
}
