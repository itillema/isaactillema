import { icons } from "lucide-react";
import { cn } from "@/lib/cn";

interface IconLinkProps {
  href: string;
  label: string;
  /** lucide-react icon name */
  icon: string;
  external?: boolean;
  className?: string;
  size?: number;
}

export function IconLink({
  href,
  label,
  icon,
  external = true,
  className,
  size = 20,
}: IconLinkProps) {
  const LucideIcon = icons[icon as keyof typeof icons];
  if (!LucideIcon) {
    return (
      <a
        href={href}
        aria-label={label}
        className={cn("hover:text-link transition-colors", className)}
      >
        {label}
      </a>
    );
  }
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "text-muted hover:text-accent hover:-translate-y-0.5 inline-flex items-center justify-center transition-all duration-200",
        className,
      )}
      {...externalProps}
    >
      <LucideIcon size={size} aria-hidden="true" />
    </a>
  );
}
