import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import mermaid from "mermaid";

it("the original README mindmap is valid for the official Mermaid renderer", async () => {
  const readme = readFileSync("README.md", "utf8");
  const chart = readme.match(/```mermaid\n(mindmap[\s\S]*?)```/)![1];
  mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
  await expect(mermaid.parse(chart)).resolves.toMatchObject({ diagramType: "mindmap" });
});
