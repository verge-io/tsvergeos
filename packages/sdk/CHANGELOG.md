# @vergeio/tsvergeos

## 0.2.1

### Patch Changes

- [#10](https://github.com/verge-io/tsvergeos/pull/10) [`83111aa`](https://github.com/verge-io/tsvergeos/commit/83111aa3ec7c2476857d50190b89807bdc502945) Thanks [@lludlow](https://github.com/lludlow)! - Switch release pipeline to npm trusted publishing (OIDC). Release workflow now uses `changesets/action` with `commitMode: github-api` to create the Version Packages PR, and `pnpm release` (build + `changeset publish`) for publication. No `NPM_TOKEN` secret is required.

## 0.2.0

### Minor Changes

- [`2f40455`](https://github.com/verge-io/tsvergeos/commit/2f404558241315591e6f64969a43336b148fc7e3) Thanks [@lludlow](https://github.com/lludlow)! - Initial public release of the VergeOS TypeScript SDK. 84 services covering the full VergeOS API with zero runtime dependencies, tree-shakeable ESM-first output, and multi-site management built in.
