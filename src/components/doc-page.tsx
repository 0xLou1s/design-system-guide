import * as FilesComponents from "fumadocs-ui/components/files";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";
import type { TOCItemType } from "fumadocs-core/toc";

import { Mermaid } from "@/components/mdx/mermaid";
import { PageActions } from "@/components/page-actions";

const REPO = "https://github.com/0xLou1s/handbook";

export interface DocPageProps {
  title: string;
  description?: string;
  toc?: TOCItemType[];
  full?: boolean;
  body: ComponentType<MDXProps>;
  /** Handbook part this page belongs to, e.g. `frontend-performance`. */
  part: string;
  /** Path of the source file within `content/`, for the GitHub edit link. */
  sourcePath: string;
  /** Slug segments within the part; omitted for a single-page part. */
  slug?: string[];
}

/* One page shell for every handbook part, so Copy Markdown and Open stay
   consistent wherever a page lives. */
export function DocPage({
  title,
  description,
  toc,
  full,
  body: MDX,
  part,
  sourcePath,
  slug = [],
}: DocPageProps) {
  const markdownUrl = ["/api/markdown", part, ...slug].join("/");

  return (
    <DocsPage toc={toc} tableOfContent={{ style: "clerk" }} full={full}>
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <div className="flex flex-row flex-wrap items-center gap-2 border-b pt-2 pb-6">
        <PageActions
          markdownUrl={markdownUrl}
          githubUrl={`${REPO}/blob/main/content/${sourcePath}`}
        />
      </div>
      <DocsBody className="[&_:not(pre)>code]:wrap-break-word">
        <MDX
          components={{
            ...defaultMdxComponents,
            ...TabsComponents,
            ...FilesComponents,
            Mermaid,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}
