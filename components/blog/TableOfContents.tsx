import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className={cn("text-sm", className)}>
      <p className="text-muted text-xs font-semibold uppercase tracking-widest">
        In This Commit
      </p>
      <ol className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.slug} className={item.depth === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.slug}`}
              className="text-muted hover:text-text transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
