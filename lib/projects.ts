import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProjectFull, ProjectMeta } from "@/lib/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function ensureDir(): boolean {
  return fs.existsSync(PROJECTS_DIR) && fs.statSync(PROJECTS_DIR).isDirectory();
}

function readProjectFile(filename: string): ProjectFull | null {
  const filePath = path.join(PROJECTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx?$/, "");

  const image =
    data.image && typeof data.image === "object" && "src" in data.image
      ? {
          src: String((data.image as { src: unknown }).src),
          alt: String((data.image as { alt?: unknown }).alt ?? ""),
        }
      : undefined;

  const meta: ProjectMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    tech: Array.isArray(data.tech) ? data.tech.map(String) : [],
    github: data.github ? String(data.github) : undefined,
    external: data.external ? String(data.external) : undefined,
    image,
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
    date: data.date ? String(data.date) : undefined,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : undefined,
    highlights: Array.isArray(data.highlights)
      ? data.highlights.map(String)
      : undefined,
    draft: Boolean(data.draft),
  };

  if (meta.draft && process.env.NODE_ENV === "production") return null;
  return { ...meta, content };
}

function sortProjects(a: ProjectMeta, b: ProjectMeta): number {
  // Featured first, then non-featured.
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;
  // Both featured: order asc (1 before 2).
  if (a.featured && b.featured) {
    const oa = a.order ?? Number.POSITIVE_INFINITY;
    const ob = b.order ?? Number.POSITIVE_INFINITY;
    if (oa !== ob) return oa - ob;
  }
  // Otherwise: date desc.
  if (a.date && b.date) return a.date < b.date ? 1 : -1;
  if (a.date) return -1;
  if (b.date) return 1;
  return 0;
}

export function getAllProjects(): ProjectMeta[] {
  if (!ensureDir()) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => /\.mdx?$/.test(f));
  const projects = files
    .map((f) => readProjectFile(f))
    .filter((p): p is ProjectFull => p !== null)
    .sort(sortProjects);
  return projects.map((p) => {
    const { content, ...meta } = p;
    void content;
    return meta;
  });
}

export function getProjectBySlug(slug: string): ProjectFull | null {
  if (!ensureDir()) return null;
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  const filename = candidates.find((c) =>
    fs.existsSync(path.join(PROJECTS_DIR, c)),
  );
  if (!filename) return null;
  return readProjectFile(filename);
}
