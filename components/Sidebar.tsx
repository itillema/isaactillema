import { SidebarHero } from "./SidebarHero";
import { SocialIcons } from "./SocialIcons";

export function Sidebar() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <SidebarHero />
      <SocialIcons />
    </header>
  );
}
