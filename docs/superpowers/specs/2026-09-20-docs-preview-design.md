# Design System Guide: docs preview

Approved scope: create a standalone app, reuse Better T Stack's settings and docs presentation, and build exactly one sample MDX page for approval. Importing the handbook requires a separate user approval.

Use Next.js, Fumadocs notebook layout (Base UI distribution), Geist fonts, neutral CSS with black/white light/dark tokens, copied responsive site header, search, and clerk-style table of contents. Adapt the brand and navigation to Design System Guide. Sample content demonstrates headings, callouts, tabs, code, a table, and cards without importing README content.

Keep README.md and LICENSE intact. Include the upstream MIT license for adapted source. The root URL redirects to /docs. Missing docs return 404. Search and Markdown export use the MDX source. Validate production build, TypeScript, desktop/mobile rendering, theme switching, search, sidebar and clipboard. Deliver a local preview URL for review; do not deploy or migrate content.

User instruction: keep all changes uncommitted. Port 3000 was freed at the user's request; the review preview runs on port 3001.

User refinements: Open must retain the upstream dropdown options plus View Markdown. Use monochrome UI tokens and Vitest instead of Playwright. Header navigation links must point to separate pages, not article sections.
