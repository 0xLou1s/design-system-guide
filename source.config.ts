import {
  defineCollections,
  defineConfig,
  defineDocs,
} from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";

export const docs = defineDocs({
  dir: "content/design-system-guide",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema.extend({
      author: z
        .object({
          name: z.string(),
          url: z.url().optional(),
        })
        .optional(),
      date: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

/* Standalone page outside the docs tree, so it gets its own collection. */
export const cheatSheet = defineCollections({
  type: "doc",
  dir: "content/cheat-sheet",
  schema: pageSchema,
});

export const frontendPerformance = defineDocs({
  dir: "content/frontend-performance",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid],
    remarkNpmOptions: {
      persist: {
        id: "package-manager",
      },
    },
  },
});
