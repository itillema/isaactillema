export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main"
      className="relative z-10 mx-auto min-h-screen w-full max-w-3xl px-6 py-16 md:px-12"
    >
      {children}
    </main>
  );
}
