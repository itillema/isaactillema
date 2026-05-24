import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RowListProps {
  children: ReactNode;
  as?: "ol" | "ul";
  className?: string;
}

/**
 * Wraps a stack of <Row /> items in the named group that powers the
 * "dim siblings, highlight hovered row" interaction at lg+.
 */
export function RowList({ children, as = "ul", className }: RowListProps) {
  const Tag = as;
  return <Tag className={cn("group/list", className)}>{children}</Tag>;
}
