# Design System Guide

A practical guide to building thoughtful, consistent design systems, published as a
documentation site built with [Next.js](https://nextjs.org) and
[Fumadocs](https://fumadocs.dev).

The material is based on the open-source
[roadmap.sh Design System Roadmap](https://roadmap.sh/design-system) (source:
[kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)),
reorganized and expanded into something you can read start to finish rather than
node by node.

## Quick start

```sh
bun install
bun run dev
```

Open <http://localhost:3000>. The root URL redirects to the handbook overview.
If port 3000 is taken, run `bun run dev --port 3001` instead.

## What is here

| Path | Contents |
| --- | --- |
| `content/docs` | The handbook, as 104 MDX pages across six route groups |
| `content/cheat-sheet` | The interface design cheat sheet, served at `/cheat-sheet` |
| `HANDBOOK.md` | The same handbook as one long document, and its original source |

## Scripts

```sh
bun run build         # production build
bun run start         # serve the production build
bun run check-types   # next typegen && tsc --noEmit
bun run test          # Vitest
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for how the content is organized and how to
edit it.

## License

Apache License 2.0. See [LICENSE](LICENSE).
