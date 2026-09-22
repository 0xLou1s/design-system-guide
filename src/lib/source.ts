import { loader } from "fumadocs-core/source";
import {
  cheatSheet,
  designEngineering,
  docs,
  frontendInfrastructure,
  frontendPerformance,
} from "fumadocs-mdx:collections/server";

export const source = loader({
  baseUrl: "/design-system-guide",
  source: docs.toFumadocsSource(),
});

export const performanceSource = loader({
  baseUrl: "/frontend-performance",
  source: frontendPerformance.toFumadocsSource(),
});

export const infrastructureSource = loader({
  baseUrl: "/frontend-infrastructure",
  source: frontendInfrastructure.toFumadocsSource(),
});

export const designEngineeringSource = loader({
  baseUrl: "/design-engineering",
  source: designEngineering.toFumadocsSource(),
});

/* Single-file collection, so the one entry is the page. */
export const cheatSheetPage = cheatSheet[0];
