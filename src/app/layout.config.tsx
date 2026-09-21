import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

/* Each entry is one part of the handbook; more can sit alongside these. */
export const links: LinkItemType[] = [
  { text: "Design System Guide", url: "/design-system-guide", active: "nested-url" },
  { text: "Frontend Performance", url: "/frontend-performance", active: "nested-url" },
  { text: "Cheat Sheet", url: "/cheat-sheet", active: "url" },
];

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <span className="inline shrink-0 whitespace-nowrap font-medium font-mono text-base tracking-tighter md:hidden xl:inline">
          Handbook
        </span>
      </>
    ),
  },
  links,
  githubUrl: "https://github.com/0xLou1s/design-system-guide",
};
