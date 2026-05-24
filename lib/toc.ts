import GithubSlugger from "github-slugger";

export interface TocItem {
  depth: 2 | 3;
  text: string;
  slug: string;
}

/**
 * Extracts ## and ### headings from MDX source for a table of contents.
 * Skips headings inside fenced code blocks so comments like `# 1. Setup`
 * inside an R/Python script aren't mistaken for section headers. Uses the
 * same slugger as rehype-slug so anchor links match the rendered heading IDs.
 */
export function buildToc(markdown: string): TocItem[] {
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
