import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-accent mb-4 font-mono">404</p>
      <h1 className="text-text mb-6 text-3xl font-bold">Page not found</h1>
      <Link
        href="/"
        className="border-accent text-accent hover:bg-accent-soft font-mono text-sm px-5 py-3 border rounded-(--radius-pill) transition-colors"
      >
        Back home
      </Link>
    </section>
  );
}
