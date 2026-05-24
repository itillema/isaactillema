import { icons } from "lucide-react";
import { socials } from "@/data/socials";

export function SocialIcons() {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
      {socials.map((s) => {
        const Icon = icons[s.icon as keyof typeof icons];
        const external = s.href.startsWith("http");
        return (
          <li key={s.label} className="mr-5 shrink-0 text-xs">
            <a
              href={s.href}
              aria-label={s.label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-muted hover:text-text transition-colors"
            >
              {Icon ? (
                <Icon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <span>{s.label}</span>
              )}
              <span className="sr-only">{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
