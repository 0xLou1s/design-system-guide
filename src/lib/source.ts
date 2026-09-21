import { loader } from "fumadocs-core/source";
import { cheatSheet, docs, frontendPerformance } from "fumadocs-mdx:collections/server";

export const source = loader({
  baseUrl: "/design-system-guide",
  source: docs.toFumadocsSource(),
});

export const performanceSource = loader({
  baseUrl: "/frontend-performance",
  source: frontendPerformance.toFumadocsSource(),
});

/* Single-file collection, so the one entry is the page. */
export const cheatSheetPage = cheatSheet[0];
