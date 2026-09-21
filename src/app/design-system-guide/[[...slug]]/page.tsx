import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocPage } from "@/components/doc-page";
import { source } from "@/lib/source";

export default async function Page({ params }: PageProps<"/design-system-guide/[[...slug]]">) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return (
    <DocPage
      title={page.data.title}
      description={page.data.description}
      toc={page.data.toc}
      full={page.data.full}
      body={page.data.body}
      part="design-system-guide"
      sourcePath={`design-system-guide/${page.path}`}
      slug={slug}
    />
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
