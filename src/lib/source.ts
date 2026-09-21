import { loader } from "fumadocs-core/source";
import { docs, frontendPerformance } from "fumadocs-mdx:collections/server";

export const source = loader({
  baseUrl: "/design-system-guide",
  source: docs.toFumadocsSource(),
});

export const performanceSource = loader({
  baseUrl: "/frontend-performance",
  source: frontendPerformance.toFumadocsSource(),
});
