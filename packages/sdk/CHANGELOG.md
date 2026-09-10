# @vergeio/tsvergeos

## 0.3.0

### Minor Changes

- [#24](https://github.com/verge-io/tsvergeos/pull/24) [`e32467e`](https://github.com/verge-io/tsvergeos/commit/e32467eaa6d42a4f4bec7b9c01cf4e59c2aff476) Thanks [@lludlow](https://github.com/lludlow)! - Add VergeOS 26.1 support for applying Microsoft 2023 Secure Boot variables to EFI drives, expose their applied state, and recognize tag audit log object types.

## 0.2.2

### Patch Changes

- Bump safe development and CI dependencies: typedoc 0.28.17→0.28.19, vitest 4.1.0→4.1.5, actions/checkout 4→7, and actions/setup-node 4→7. TypeScript 6 and related major bumps remain held.

## 0.2.1

### Patch Changes

- [#10](https://github.com/verge-io/tsvergeos/pull/10) [`83111aa`](https://github.com/verge-io/tsvergeos/commit/83111aa3ec7c2476857d50190b89807bdc502945) Thanks [@lludlow](https://github.com/lludlow)! - Switch release pipeline to npm trusted publishing (OIDC). Release workflow now uses `changesets/action` with `commitMode: github-api` to create the Version Packages PR, and `pnpm release` (build + `changeset publish`) for publication. No `NPM_TOKEN` secret is required.

## 0.2.0

### Minor Changes

- [`2f40455`](https://github.com/verge-io/tsvergeos/commit/2f404558241315591e6f64969a43336b148fc7e3) Thanks [@lludlow](https://github.com/lludlow)! - Initial public release of the VergeOS TypeScript SDK. 84 services covering the full VergeOS API with zero runtime dependencies, tree-shakeable ESM-first output, and multi-site management built in.
