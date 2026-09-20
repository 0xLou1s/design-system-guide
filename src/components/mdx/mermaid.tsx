import { renderMermaidSVG } from "beautiful-mermaid";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { MermaidClient } from "./mermaid-client";

export function Mermaid({ chart }: { chart: string }) {
  let svg: string;

  try {
    svg = renderMermaidSVG(chart, {
      bg: "var(--color-fd-background)",
      fg: "var(--color-fd-foreground)",
      font: "var(--font-geist), sans-serif",
      transparent: true,
    });
  } catch {
    return <MermaidClient chart={chart} />;
  }

  return (
    <figure className="my-6 min-w-0">
      <div
        role="img"
        aria-label="Design system diagram; the text version is available below"
        tabIndex={0}
        className="overflow-x-auto rounded border border-fd-border p-4 [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <details className="mt-2 text-sm text-fd-muted-foreground">
        <summary className="cursor-pointer">Diagram source</summary>
        <CodeBlock title="Mermaid"><Pre>{chart}</Pre></CodeBlock>
      </details>
    </figure>
  );
}
