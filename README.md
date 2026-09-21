# Handbook

Notes on building and shipping interfaces, collected in one place and published
as a site built with [Next.js](https://nextjs.org) and
[Fumadocs](https://fumadocs.dev).

Each part stands on its own. More can be added alongside them.

| Part | Route | What it covers |
| --- | --- | --- |
| Design System Guide | `/design-system-guide` | Building and running a design system, from tokens and components through governance and metrics |
| Frontend Performance | `/frontend-performance` | 48 practices for a fast page, by priority, each with the reasoning behind it |
| Cheat Sheet | `/cheat-sheet` | Interface guidelines — UI, animation, typography, color, accessibility — each with the reasoning behind it |

## Quick start

```sh
bun install
bun run dev
```

Open <http://localhost:3000>. The root URL redirects to the design system guide.
If port 3000 is taken, run `bun run dev --port 3001` instead.

## Layout

| Path | Contents |
| --- | --- |
| `content/design-system-guide` | The guide, as 104 MDX pages across six route groups |
| `content/frontend-performance` | The performance checklist, as 48 items across five chapters |
| `content/cheat-sheet` | The cheat sheet, as a single MDX page |
| `HANDBOOK.md` | The design system guide as one long document, and its original source |

## Scripts

```sh
bun run build         # production build
bun run start         # serve the production build
bun run check-types   # next typegen && tsc --noEmit
bun run test          # Vitest
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for how the content is organized and how to
edit it.

## Credits

The design system guide is based on the open-source
[roadmap.sh Design System Roadmap](https://roadmap.sh/design-system) (source:
[kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)),
reorganized and expanded into something you can read start to finish rather than
node by node.

## License

Apache License 2.0. See [LICENSE](LICENSE).
