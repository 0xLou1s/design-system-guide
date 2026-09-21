import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocPage } from "@/components/doc-page";
import { performanceSource } from "@/lib/source";

export default async function Page({ params }: PageProps<"/frontend-performance/[[...slug]]">) {
  const { slug } = await params;
  const page = performanceSource.getPage(slug);
  if (!page) notFound();

  return (
    <DocPage
      title={page.data.title}
      description={page.data.description}
      toc={page.data.toc}
      full={page.data.full}
      body={page.data.body}
      part="frontend-performance"
      sourcePath={`frontend-performance/${page.path}`}
      slug={slug}
    />
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
