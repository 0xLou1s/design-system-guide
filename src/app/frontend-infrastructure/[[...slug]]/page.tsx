import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocPage } from "@/components/doc-page";
import { infrastructureSource } from "@/lib/source";

export default async function Page({ params }: PageProps<"/frontend-infrastructure/[[...slug]]">) {
  const { slug } = await params;
  const page = infrastructureSource.getPage(slug);
  if (!page) notFound();

  return (
    <DocPage
      title={page.data.title}
      description={page.data.description}
      toc={page.data.toc}
      full={page.data.full}
      body={page.data.body}
      part="frontend-infrastructure"
      sourcePath={`frontend-infrastructure/${page.path}`}
      slug={slug}
    />
  );
}

export function generateStaticParams() {
  return infrastructureSource.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/frontend-infrastructure/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = infrastructureSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
