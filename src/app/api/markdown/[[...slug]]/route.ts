import { exportMarkdown } from "@/lib/markdown";
import { cheatSheetPage, infrastructureSource, performanceSource, source } from "@/lib/source";

/* The first segment names the handbook part; the rest is that part's own slug. */
const sources = {
  "design-system-guide": source,
  "frontend-performance": performanceSource,
  "frontend-infrastructure": infrastructureSource,
} as const;

function isPart(value: string): value is keyof typeof sources {
  return value in sources;
}

export async function GET(_request: Request, { params }: RouteContext<"/api/markdown/[[...slug]]">) {
  const { slug = [] } = await params;
  const [part, ...rest] = slug;

  if (part === "cheat-sheet") {
    const text = await exportMarkdown(await cheatSheetPage.getText("raw"));
    return markdown(cheatSheetPage.title, cheatSheetPage.description, text);
  }

  if (!part || !isPart(part)) return new Response("Not found", { status: 404 });

  const page = sources[part].getPage(rest);
  if (!page) return new Response("Not found", { status: 404 });

  const text = await exportMarkdown(await page.data.getText("raw"));
  return markdown(page.data.title, page.data.description, text);
}

function markdown(title: string, description: string | undefined, body: string) {
  return new Response(`# ${title}\n\n${description ?? ""}\n\n${body}`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
