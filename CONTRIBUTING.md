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
2. The Release workflow detects pending changesets and creates a **Version Packages** PR
3. That PR bumps `package.json` version and updates `CHANGELOG.md`
4. Merging the Version Packages PR triggers `npm publish` with provenance attestation

Maintainers control when releases ship by merging the Version Packages PR.

## CI Checks

Every PR runs:

| Check                      | What it does                                                 |
| -------------------------- | ------------------------------------------------------------ |
| **Lint & Format**          | Biome check (lint + formatting)                              |
| **Type Check**             | `tsc --noEmit`                                               |
| **Unit Tests**             | Vitest across Node 18, 20, 22                                |
| **Build & Package Health** | tsup build, tarball size budget (< 500KB), zero runtime deps |
| **Security Audit**         | `pnpm audit` (non-blocking)                                  |

## Branch Protection (Maintainers)

Recommended GitHub settings for `main`:

- Require status checks: `Lint & Format`, `Type Check`, `Unit Tests (Node 18)`, `Unit Tests (Node 20)`, `Unit Tests (Node 22)`, `Build & Package Health`
- Require branches to be up to date before merging
- Require CODEOWNERS review
- Do not allow force pushes (except via the filtered push script)
