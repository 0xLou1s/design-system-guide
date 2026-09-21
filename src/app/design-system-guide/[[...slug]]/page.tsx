import * as FilesComponents from "fumadocs-ui/components/files";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageActions } from "@/components/page-actions";
import { Mermaid } from "@/components/mdx/mermaid";
import { source } from "@/lib/source";

export default async function Page({ params }: PageProps<"/design-system-guide/[[...slug]]">) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = `/api/markdown/${(slug ?? []).join("/")}`;

  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ style: "clerk" }} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row flex-wrap items-center gap-2 border-b pt-2 pb-6">
        <PageActions
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/0xLou1s/design-system-guide/blob/main/content/design-system-guide/${page.path}`}
        />
      </div>
      <DocsBody className="[&_:not(pre)>code]:wrap-break-word">
        <MDX components={{ ...defaultMdxComponents, ...TabsComponents, ...FilesComponents, Mermaid }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps<"/design-system-guide/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
