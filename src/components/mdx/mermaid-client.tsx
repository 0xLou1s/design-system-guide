"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

export function MermaidClient({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [result, setResult] = useState<{ chart: string; theme?: string; svg: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(false);

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        if (cancelled) return;
        const dark = resolvedTheme === "dark";
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme: "base",
          themeVariables: {
            darkMode: dark,
            background: dark ? "#0d0d0d" : "#ffffff",
            primaryColor: dark ? "#262626" : "#f5f5f5",
            primaryTextColor: dark ? "#fafafa" : "#171717",
            primaryBorderColor: "#737373",
            lineColor: dark ? "#a3a3a3" : "#737373",
            secondaryColor: dark ? "#262626" : "#f5f5f5",
            tertiaryColor: dark ? "#404040" : "#e5e5e5",
            fontFamily: "Geist, sans-serif",
          },
        });
        const { svg } = await mermaid.render(`diagram-${id}`, chart);
        if (!cancelled) setResult({ chart, theme: resolvedTheme, svg });
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void render();
    return () => { cancelled = true; };
  }, [chart, id, resolvedTheme]);

  const svg = result?.chart === chart && result.theme === resolvedTheme ? result.svg : undefined;

  return (
    <figure className="my-6 min-w-0">
      {svg ? (
        <div role="img" aria-label="Design system diagram; the text version is available below" tabIndex={0}
          className="mermaid-diagram overflow-x-auto rounded border border-fd-border p-4 [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }} />
      ) : <p role="status">{error ? "The diagram could not be rendered. Its source is available below." : "Loading diagram…"}</p>}
      <details className="mt-2 text-sm text-fd-muted-foreground" open={error || undefined}>
        <summary className="cursor-pointer">Diagram source</summary>
        <pre className="overflow-x-auto p-4"><code>{chart}</code></pre>
      </details>
    </figure>
  );
}
