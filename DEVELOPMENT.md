# Local docs preview

```sh
bun install
bun run dev
```

Open http://localhost:3000/docs. The root URL redirects to the sample page.

If port 3000 is occupied, use `bun run dev --port 3001` and open http://localhost:3001/docs.

```sh
bun run check-types
bun run build
bun run start
```

This is a standalone Next.js app. Fumadocs versions, the notebook layout, responsive header, fonts, and theme settings are reused from Better T Stack. See THIRD_PARTY_NOTICES.md for attribution.

The only sample is `content/docs/index.mdx`. The handbook in README.md has not been migrated; that work starts only after visual approval. The header links to Docs and GitHub; article sections are accessed through the table of contents. Open exposes the local Markdown version.

Run `bun run test` for Vitest checks, or `bun run test:watch` while editing. Tests use Testing Library and jsdom; they do not need a running server or browser installation.

The Open dropdown retains Better T Stack's GitHub, Scira AI, ChatGPT, Claude, and T3 Chat options, plus View Markdown. UI theme tokens use neutral black/white values in light and dark modes.
