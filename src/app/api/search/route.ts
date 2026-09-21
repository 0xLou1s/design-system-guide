import { createSearchAPI } from "fumadocs-core/search/server";

import { performanceSource, source } from "@/lib/source";

export const revalidate = false;

/* Every handbook part is searchable from the one index the header search uses. */
const indexes = [source, performanceSource].flatMap((loader) =>
  loader.getPages().map((page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    structuredData: page.data.structuredData,
  })),
);

export const { staticGET: GET } = createSearchAPI("advanced", { indexes });
