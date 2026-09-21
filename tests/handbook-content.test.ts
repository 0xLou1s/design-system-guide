// @vitest-environment node
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { renderMermaidSVG } from "beautiful-mermaid";
import { describe, expect, it } from "vitest";

const root = join(process.cwd(), "content/design-system-guide");
const readme = readFileSync(join(process.cwd(), "HANDBOOK.md"), "utf8");
const files = readdirSync(root, { recursive: true }).map(String);
const pages = files.filter((file) => file.endsWith(".mdx")).map((file) => {
  const text = readFileSync(join(root, file), "utf8");
  return {
    file,
    text,
    title: JSON.parse(text.match(/^title: (.+)$/m)![1]) as string,
    body: text.replace(/^---\n[\s\S]*?\n---\n/, ""),
    url: `/design-system-guide/${file.replace(/\([^/]+\)\//g, "").replace(/\.mdx$/, "").replace(/(^|\/)index$/, "")}`.replace(/\/$/, ""),
  };
});

function codeBlocks(text: string) {
  return [...text.matchAll(/^```([^\n]*)\n([\s\S]*?)^```/gm)].map((match) => ({ language: match[1], code: match[2] }));
}

function contentLines(text: string) {
  return text.replace(/^```[^\n]*\n[\s\S]*?^```/gm, "").split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^#{1,6} |^---$|^\d+\. \[.+\]\(#/.test(line));
}

describe("handbook migration", () => {
  it("gives every numbered chapter and section its own page", () => {
    const headings = [...readme.matchAll(/^#+ (\d+(?:\.\d+)?\.?) (.+)$/gm)];
    expect(headings).toHaveLength(102);
    for (const heading of headings) {
      expect(pages.filter((page) => page.title === `${heading[1]} ${heading[2]}`)).toHaveLength(1);
    }
    expect(pages).toHaveLength(headings.length + 2);
    expect(pages.find((page) => page.file.endsWith("/final-mental-model.mdx"))?.body).toContain("Suggested build exercise");
  });

  it("preserves every prose, list, table and checklist line from the handbook", () => {
    const migrated = pages.flatMap((page) => contentLines(page.body));
    const counts = new Map<string, number>();
    for (const line of migrated) counts.set(line, (counts.get(line) ?? 0) + 1);
    for (const line of contentLines(readme)) {
      expect(counts.get(line) ?? 0, `Missing handbook content: ${line}`).toBeGreaterThan(0);
      counts.set(line, counts.get(line)! - 1);
    }
  });

  it("preserves every code example and diagram without edits", () => {
    const migrated = pages.flatMap((page) => codeBlocks(page.body));
    const original = codeBlocks(readme);
    expect(migrated).toHaveLength(original.length);
    for (const block of original) {
      const index = migrated.findIndex((candidate) => candidate.language === block.language && candidate.code === block.code);
      expect(index, `Missing ${block.language} example: ${block.code.slice(0, 80)}`).toBeGreaterThanOrEqual(0);
      migrated.splice(index, 1);
    }
  });

  it("makes every page reachable through sidebar metadata and resolves all internal links", () => {
    const routes = new Set(pages.map((page) => page.url));
    const reachable = new Set<string>();
    function visit(folder: string) {
      const meta = JSON.parse(readFileSync(join(root, folder, "meta.json"), "utf8")) as { pages: string[] };
      for (const entry of meta.pages) {
        if (entry.startsWith("---")) continue;
        const file = relative(root, join(root, folder, `${entry}.mdx`));
        if (pages.some((page) => page.file === file)) reachable.add(file);
        else visit(join(folder, entry));
      }
    }
    visit("");
    expect([...reachable].sort()).toEqual(pages.map((page) => page.file).sort());
    for (const page of pages) {
      for (const match of page.body.matchAll(/(?:\]\(|href=")(\/design-system-guide[^)"#]*)(?:#[^)" ]*)?[)"]/g)) {
        expect(routes.has(match[1]), `Broken link in ${page.file}: ${match[1]}`).toBe(true);
      }
    }
  });

  for (const [index, diagram] of codeBlocks(readme).filter((block) => block.language === "mermaid" && !block.code.startsWith("mindmap")).entries()) {
    it(`renders handbook diagram ${index + 1} as SVG`, () => {
      const svg = renderMermaidSVG(diagram.code, { bg: "var(--color-fd-background)", fg: "var(--color-fd-foreground)", transparent: true });
      expect(svg).toContain("<svg");
      expect(svg).toContain("</svg>");
    });
  }
});
