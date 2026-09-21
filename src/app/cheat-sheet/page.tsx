import { TOCProvider, TOCScrollArea } from "fumadocs-ui/components/toc";
import { TOCItem, TOCItems } from "fumadocs-ui/components/toc/clerk";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";

import { PageActions } from "@/components/page-actions";
import { HomeSiteHeader } from "@/components/site-header";
import { cheatSheetPage as page } from "@/lib/source";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function CheatSheetPage() {
  const { body: MDX, toc, title, description } = page;

  return (
    <TOCProvider toc={toc}>
      <div className="flex min-h-svh flex-col">
        <HomeSiteHeader />

        <div className="mx-auto flex w-full max-w-fd-container flex-1 flex-row justify-center gap-8 px-4 md:px-6">
          {/* Capped at ~72ch: the page's own advice about line length applies to itself. */}
          <article className="flex min-w-0 max-w-[72ch] flex-1 flex-col py-10">
            <h1 className="font-semibold text-3xl tracking-tight">{title}</h1>
            {description && (
              <p className="mt-2 text-fd-muted-foreground text-lg">{description}</p>
            )}
            <div className="flex flex-row flex-wrap items-center gap-2 border-b pt-4 pb-6">
              <PageActions
                markdownUrl="/api/markdown/cheat-sheet"
                githubUrl="https://github.com/0xLou1s/handbook/blob/main/content/cheat-sheet/index.mdx"
              />
            </div>
            <div className="prose mt-8 min-w-0 max-w-none [&_:not(pre)>code]:wrap-break-word">
              <MDX components={defaultMdxComponents} />
            </div>
          </article>

          {/* Sticky below the 3.5rem header; hidden until there is room beside the prose. */}
          <nav
            aria-label="On this page"
            className="sticky top-14 h-[calc(100svh-3.5rem)] w-[220px] shrink-0 py-10 max-xl:hidden"
          >
            <h2 className="mb-3 font-mono text-[11px] text-fd-muted-foreground uppercase tracking-[0.08em]">
              On this page
            </h2>
            <TOCScrollArea>
              <TOCItems>
                {toc.map((item) => (
                  <TOCItem key={item.url} item={item} />
                ))}
              </TOCItems>
            </TOCScrollArea>
          </nav>
        </div>
      </div>
    </TOCProvider>
  );
}
