# Docs Preview Implementation Plan

> Execute inline, with an independent code review after implementation.

**Goal:** Ship one reviewable docs page before any handbook migration.

**Architecture:** Standalone Next.js app with Fumadocs MDX. Copy upstream docs settings, tokens and header; adapt only project-specific wiring.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Fumadocs Base UI.

- [x] Copy package versions and MDX/PostCSS/TypeScript settings into the new project. Install dependencies.
- [x] Copy `src/components/site-header.tsx`, `src/lib/utils.ts`, docs theme tokens and docs layout/page structure from `../create-better-t-stack/apps/web`; remove upstream analytics and use the local brand/navigation.
- [x] Add root provider/layout, `/docs/[[...slug]]`, `/api/search`, Markdown route and exactly one `content/docs/index.mdx` sample. Add upstream license attribution and separate development instructions.
- [x] Run `bun run check-types` and `bun run build`. Exercise desktop/mobile, search, theme, sidebar, clipboard and 404 with Vitest; save screenshots.
- [x] Review changes, fix actionable findings, run local preview, and request the user's visual review. Wait for approval before migrating README content.

Validation: production build and TypeScript passed; 9 initial browser checks passed (subsequently replaced with Vitest at the user's request). Visual screenshots captured for desktop light/dark and mobile. Review found the narrow header title issue; fixed by using DS Guide below 375px. No commits created. Handbook migration remains pending user approval.

User refinements: Open must retain the upstream dropdown options plus View Markdown. Use monochrome UI tokens and Vitest instead of Playwright. Header navigation links must point to separate pages, not article sections.

Final refinement validation: `bun run test` passes 6 Vitest tests; `bun run check-types` and `bun run build` pass. Playwright configuration, direct dependency and test suite removed.
