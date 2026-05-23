import { socials } from "@/data/socials";
import { IconLink } from "@/components/ui/IconLink";

export function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed bottom-0 left-6 z-20 hidden flex-col items-center gap-6 md:flex"
    >
      <ul className="flex flex-col items-center gap-5">
        {socials.map((s) => (
          <li key={s.label}>
            <IconLink href={s.href} label={s.label} icon={s.icon} />
          </li>
        ))}
      </ul>
      <div className="bg-muted h-24 w-px" aria-hidden="true" />
    </aside>
  );
}
