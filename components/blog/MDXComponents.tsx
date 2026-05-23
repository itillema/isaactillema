import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-text mt-12 mb-4 text-3xl font-bold" {...props} />,
  h2: (props) => <h2 className="text-text mt-10 mb-4 text-2xl font-semibold" {...props} />,
  h3: (props) => <h3 className="text-text mt-8 mb-3 text-xl font-semibold" {...props} />,
  p: (props) => <p className="text-muted my-4 leading-relaxed" {...props} />,
  a: ({ href, ...rest }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-accent hover:underline"
      {...rest}
    />
  ),
  ul: (props) => <ul className="text-muted my-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="text-muted my-4 list-decimal space-y-2 pl-6" {...props} />,
  code: (props) => (
    <code
      className="bg-surface text-accent rounded px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface border-border my-6 overflow-x-auto rounded border p-4 text-sm"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-accent text-muted my-6 border-l-2 pl-4 italic"
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
};
