import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 border border-accent text-accent font-mono text-sm px-5 py-3 rounded-(--radius) transition-all duration-200 hover:bg-accent-soft hover:shadow-(--shadow-glow) focus-visible:bg-accent-soft";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
};

type Props = (ButtonAsButton | ButtonAsLink) & { className?: string };

export function Button(props: Props) {
  if (props.as === "a") {
    const { className, ...rest } = props;
    delete (rest as { as?: unknown }).as;
    return <a className={cn(base, className)} {...rest} />;
  }
  const { className, ...rest } = props;
  delete (rest as { as?: unknown }).as;
  return <button className={cn(base, className)} {...rest} />;
}
