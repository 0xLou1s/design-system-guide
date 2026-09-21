import * as FilesComponents from "fumadocs-ui/components/files";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Mermaid } from "@/components/mdx/mermaid";
import { performanceSource } from "@/lib/source";

export default async function Page({ params }: PageProps<"/frontend-performance/[[...slug]]">) {
  const { slug } = await params;
  const page = performanceSource.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ style: "clerk" }} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="[&_:not(pre)>code]:wrap-break-word">
        <MDX components={{ ...defaultMdxComponents, ...TabsComponents, ...FilesComponents, Mermaid }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return performanceSource.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/frontend-performance/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = performanceSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
