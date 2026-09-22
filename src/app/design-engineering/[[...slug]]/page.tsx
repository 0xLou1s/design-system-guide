import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocPage } from "@/components/doc-page";
import { designEngineeringSource } from "@/lib/source";

export default async function Page({ params }: PageProps<"/design-engineering/[[...slug]]">) {
  const { slug } = await params;
  const page = designEngineeringSource.getPage(slug);
  if (!page) notFound();

  return (
    <DocPage
      title={page.data.title}
      description={page.data.description}
      toc={page.data.toc}
      full={page.data.full}
      body={page.data.body}
      part="design-engineering"
      sourcePath={`design-engineering/${page.path}`}
      slug={slug}
    />
  );
}

export function generateStaticParams() {
  return designEngineeringSource.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/design-engineering/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = designEngineeringSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
