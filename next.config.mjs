import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

export default withMDX({
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/markdown/*": ["./content/docs/**/*.mdx"],
  },
});
