import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-text mt-12 mb-4 text-3xl font-bold" {...props} />,
  h2: (props) => <h2 className="text-text mt-10 mb-4 text-2xl font-semibold" {...props} />,
  h3: (props) => <h3 className="text-text mt-8 mb-3 text-xl font-semibold" {...props} />,
  h4: (props) => <h4 className="text-text mt-6 mb-2 text-lg font-semibold" {...props} />,
  h5: (props) => <h5 className="text-text mt-4 mb-2 text-base font-semibold" {...props} />,
  h6: (props) => (
    <h6
      className="text-text mt-4 mb-2 text-sm font-semibold uppercase tracking-wide"
      {...props}
    />
  ),
  p: (props) => <p className="text-muted my-4 leading-relaxed" {...props} />,
  a: ({ href, ...rest }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-link hover:underline"
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
      className="bg-surface border-border my-6 overflow-x-auto rounded border p-4 text-left text-sm"
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
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="border-border w-full border-collapse border text-left text-sm"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-surface" {...props} />,
  tr: (props) => <tr className="border-border border-b last:border-0" {...props} />,
  th: (props) => (
    <th
      className="text-text border-border border-r px-4 py-2 text-left font-semibold last:border-0"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="text-muted border-border border-r px-4 py-2 align-top last:border-0"
      {...props}
    />
  ),
  img: (props) => (
    // Static <img> on purpose — Next's <Image> needs explicit dims unavailable at MDX parse time.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="border-border mx-auto my-6 max-w-full rounded-lg border"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
  figure: (props) => <figure className="my-6" {...props} />,
  figcaption: (props) => (
    <figcaption className="text-muted mt-2 text-xs italic" {...props} />
  ),
};
