import { source } from "@/lib/source";
import { exportMarkdown } from "@/lib/markdown";

export async function GET(_request: Request, { params }: RouteContext<"/api/markdown/[[...slug]]">) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) return new Response("Not found", { status: 404 });

  const text = await exportMarkdown(await page.data.getText("raw"));
  return new Response(`# ${page.data.title}\n\n${page.data.description ?? ""}\n\n${text}`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
