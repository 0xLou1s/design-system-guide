"use client";

import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { ViewOptions } from "@/components/view-options";

export function PageActions({ markdownUrl, githubUrl }: { markdownUrl: string; githubUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [checked, copy] = useCopyButton(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error("Unable to load Markdown.");
      await navigator.clipboard.writeText(await response.text());
    } catch {
      setError("Could not copy. Use Open to view the Markdown.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <button
        type="button"
        disabled={loading}
        className={buttonVariants({ color: "secondary", size: "sm", className: "min-h-8 gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground" })}
        onClick={copy}
      >
        {checked && !error ? <Check /> : <Copy />}
        Copy Markdown
      </button>
      <ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />
      {error && <span role="alert" className="text-sm text-fd-muted-foreground">{error}</span>}
    </>
  );
}
