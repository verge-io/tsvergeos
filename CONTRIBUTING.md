# Contributing to tsvergeos

## Prerequisites

- Node.js >= 18
- pnpm 10.x (`corepack enable` to activate)

## Setup

```bash
git clone https://github.com/verge-io/tsvergeos.git
cd tsvergeos
pnpm install
```

## Development Workflow

### Quality Gates

Run these locally before pushing — CI enforces the same checks:

```bash
pnpm --filter @vergeio/tsvergeos lint         # Biome lint + format check
pnpm --filter @vergeio/tsvergeos typecheck     # TypeScript type checking
pnpm --filter @vergeio/tsvergeos test          # Unit tests (vitest)
pnpm --filter @vergeio/tsvergeos build         # Build (tsup → ESM + CJS + .d.ts)
```

Auto-fix lint issues:

```bash
pnpm --filter @vergeio/tsvergeos lint --write
```

### Making Changes

1. Create a feature branch: `git checkout -b feature/your-change`
2. Make your changes
3. Run the quality gates above
4. Add a changeset describing your change:

```bash
pnpm changeset
```

This prompts you to select the package, choose a semver bump level (patch/minor/major), and write a summary. A markdown file is created in `.changeset/` — commit it with your PR.

5. Open a pull request against `main`

### Commit Convention

Conventional commits with emoji prefix:

- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code restructuring
- `docs:` — documentation
- `test:` — tests
- `chore:` — build, CI, tooling

### Code Style

- Enforced by [Biome](https://biomejs.dev/) — tabs, single quotes, trailing commas
- `const` over `let`, no `var`
- `async/await` over raw promises
- Early returns to reduce nesting
- No `any` — use `unknown` and narrow
- TSDoc on public API surfaces

## How Releases Work

1. PRs with changesets merge to `main`
2. The Release workflow runs `changesets/action` and creates or updates a **Version Packages** PR
3. That PR runs `changeset version`, which bumps `package.json` and updates `CHANGELOG.md`
4. Merging the Version Packages PR triggers `pnpm release`, which builds the SDK and runs `changeset publish`
5. npm publishing uses GitHub Actions OIDC trusted publishing, so no `NPM_TOKEN` secret is required

Maintainers control when releases ship by merging the Version Packages PR.

For npm trusted publishing to work, the package must be configured on npmjs.com with this repository and the exact workflow filename `.github/workflows/release.yml`.

## CI Checks

Every PR runs:

| Check                      | What it does                                                 |
| -------------------------- | ------------------------------------------------------------ |
| **Lint & Format**          | Biome check (lint + formatting)                              |
| **Type Check**             | `tsc --noEmit`                                               |
| **Unit Tests**             | Vitest across Node 20 and 22                                 |
| **Build & Package Health** | tsup build, tarball size budget (< 500KB), zero runtime deps |
| **Security Audit**         | `pnpm audit` (non-blocking)                                  |

## Branch Protection (Maintainers)

Recommended GitHub settings for `main`:

- Require status checks: `Lint & Format`, `Type Check`, `Unit Tests (Node 20)`, `Unit Tests (Node 22)`, `Build & Package Health`
- Require branches to be up to date before merging
- Require CODEOWNERS review
