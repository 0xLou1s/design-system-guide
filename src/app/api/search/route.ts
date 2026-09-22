import { createSearchAPI } from "fumadocs-core/search/server";

import {
  designEngineeringSource,
  infrastructureSource,
  performanceSource,
  source,
} from "@/lib/source";

export const revalidate = false;

/* Every handbook part is searchable from the one index the header search uses. */
const indexes = [
  source,
  performanceSource,
  infrastructureSource,
  designEngineeringSource,
].flatMap((loader) =>
  loader.getPages().map((page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    structuredData: page.data.structuredData,
  })),
);

export const { staticGET: GET } = createSearchAPI("advanced", { indexes });
