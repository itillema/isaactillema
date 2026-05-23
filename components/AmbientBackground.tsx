/**
 * Three large blurred radial gradients fixed behind all content.
 * Server component, static — no animation, no JS, no listeners.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-40 h-[55vw] w-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(190 95% 65% / 0.30), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute top-[35vh] -right-40 h-[55vw] w-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(205 90% 72% / 0.28), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute -bottom-40 left-[10vw] h-[55vw] w-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(165 80% 65% / 0.25), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
