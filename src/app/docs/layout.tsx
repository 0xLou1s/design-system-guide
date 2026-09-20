import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";

import { baseOptions } from "@/app/layout.config";
import { DocsSiteHeader } from "@/components/site-header";
import { source } from "@/lib/source";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  tabMode: "sidebar",
  slots: {
    header: DocsSiteHeader,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...docsOptions} nav={{ ...baseOptions.nav, mode: "top" }}>
      {children}
    </DocsLayout>
  );
}
