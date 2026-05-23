import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-muted font-mono text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
