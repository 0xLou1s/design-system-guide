# Local docs preview

```sh
bun install
bun run dev
```

Open http://localhost:3000/docs. The root URL redirects to the handbook overview.

If port 3000 is occupied, use `bun run dev --port 3001` and open http://localhost:3001/docs.

```sh
bun run check-types
bun run build
bun run start
```

This is a standalone Next.js app. Fumadocs versions, the notebook layout, responsive header, fonts, and theme settings are reused from Better T Stack. See THIRD_PARTY_NOTICES.md for attribution.

The handbook is split into 104 MDX pages: 31 chapters, 71 numbered sections, an overview, and the final mental model. HANDBOOK.md remains the original source. Content is organized into six route groups in `content/docs`: `(understanding)`, `(foundations)`, `(components)`, `(engineering)`, `(governance)`, and `(practice)`. Parentheses keep existing page URLs unchanged.

Each group uses Fumadocs root-folder metadata to appear in the sidebar switcher. Overview and chapter index pages use Fumadocs Cards. Edit the corresponding MDX page and its `meta.json` ordering to maintain the docs. The header links to Docs and GitHub; article sections use the table of contents.

Mermaid flowcharts, sequence diagrams, and state diagrams render on the server with beautiful-mermaid. Other diagram types, including the handbook mindmap, load the official Mermaid renderer on demand. Copy/View Markdown preserves code fences and converts navigation cards into ordinary Markdown links.

Run `bun run test` for Vitest checks, or `bun run test:watch` while editing. Tests use Testing Library and jsdom; they do not need a running server or browser installation.

The Open dropdown retains Better T Stack's GitHub, Scira AI, ChatGPT, Claude, and T3 Chat options, plus View Markdown. UI theme tokens use neutral black/white values in light and dark modes.
