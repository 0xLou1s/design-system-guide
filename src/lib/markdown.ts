import type { Root } from "mdast";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";

// Keep code fences intact while turning documentation navigation into portable Markdown.
export async function exportMarkdown(raw: string) {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
  const result = await remark().use(remarkGfm).use(remarkMdx).use(() => (tree: Root) => {
    visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
      if (index === undefined || !parent) return;
      if (node.name === "Cards") {
        parent.children.splice(index, 1, ...node.children);
        return index;
      }
      if (node.name !== "Card") return;
      const props = Object.fromEntries(node.attributes.flatMap((attribute) =>
        attribute.type === "mdxJsxAttribute" && typeof attribute.value === "string"
          ? [[attribute.name, attribute.value]] : [],
      ));
      if (!props.title || !props.href) return;
      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [
          { type: "link", url: props.href, children: [{ type: "text", value: props.title }] },
          ...(props.description ? [{ type: "text" as const, value: ` — ${props.description}` }] : []),
        ],
      });
      return index;
    });
  }).process(body);
  return String(result).trim();
}
