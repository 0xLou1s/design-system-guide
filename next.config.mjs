import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

export default withMDX({
  reactStrictMode: true,
  /* The route reads raw .mdx at request time, so every part's content must be
     traced into the deployment — and the glob has to match nested slugs. */
  outputFileTracingIncludes: {
    "/api/markdown/**": ["./content/**/*.mdx"],
  },
});
