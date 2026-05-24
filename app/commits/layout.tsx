export default function CommitsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main"
      className="relative z-10 mx-auto min-h-screen w-full max-w-360 px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-0"
    >
      {children}
    </main>
  );
}
