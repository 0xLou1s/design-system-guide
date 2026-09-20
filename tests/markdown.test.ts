// @vitest-environment node
import { describe, expect, it } from "vitest";
import { exportMarkdown } from "@/lib/markdown";

describe("portable Markdown", () => {
  it("removes frontmatter, preserves Mermaid and code examples, and converts navigation cards", async () => {
    const result = await exportMarkdown(`---
title: Example
---

<Cards>
<Card title="Tokens &amp; themes" href="/docs/design-tokens" description="Reusable decisions." />
</Cards>

\`\`\`mermaid
flowchart TD
  A --> B
\`\`\`

\`\`\`tsx
<Card title="An actual code example" />
\`\`\`
`);
    expect(result).not.toContain("title: Example");
    expect(result).toContain("[Tokens & themes](/docs/design-tokens) — Reusable decisions.");
    expect(result).toContain("```mermaid\nflowchart TD\n  A --> B\n```");
    expect(result).toContain('```tsx\n<Card title="An actual code example" />\n```');
    expect(result).not.toContain("<Cards>");
  });
});
