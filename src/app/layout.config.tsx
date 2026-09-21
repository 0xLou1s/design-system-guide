import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { Blocks } from "lucide-react";

export const links: LinkItemType[] = [
  { text: "Docs", url: "/docs", active: "nested-url" },
  { text: "Cheat Sheet", url: "/cheat-sheet", active: "url" },
];

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <span className="inline shrink-0 whitespace-nowrap font-medium font-mono text-base tracking-tighter md:hidden xl:inline">
          <span className="max-[375px]:hidden">Design System Guide</span>
          <span className="hidden max-[375px]:inline">DS Guide</span>
        </span>
      </>
    ),
  },
  links,
  githubUrl: "https://github.com/0xLou1s/design-system-guide",
};
