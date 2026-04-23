---
"@vergeio/tsvergeos": patch
---

Switch release pipeline to npm trusted publishing (OIDC). Release workflow now uses `changesets/action` with `commitMode: github-api` to create the Version Packages PR, and `pnpm release` (build + `changeset publish`) for publication. No `NPM_TOKEN` secret is required.
