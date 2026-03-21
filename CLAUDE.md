# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

`tsvergeos` — a TypeScript SDK for the VergeOS ultraconverged infrastructure platform. Zero runtime dependencies, multi-site management built in, tree-shakeable ESM-first output. Targets Node.js 18+, modern browsers, Deno, and Bun.

Part of the SDK family: `pyvergeos` (Python), `govergeos` (Go), `tsvergeos` (TypeScript).

## Build & Dev Commands

```bash
pnpm install                          # Install dependencies
pnpm -F tsvergeos build               # Build SDK (tsup → ESM + CJS + .d.ts)
pnpm -F tsvergeos test                # Run unit tests (vitest)
pnpm -F tsvergeos test -- --run path  # Run a single test file
pnpm -F tsvergeos test:integration    # Run integration tests (requires credentials)
pnpm -F tsvergeos lint                # Lint + format check (biome)
pnpm -F tsvergeos lint --write        # Lint + auto-fix
pnpm -F tsvergeos typecheck           # TypeScript type checking (tsc --noEmit)
```

## Architecture

### Monorepo Layout

- `packages/sdk/` — the `tsvergeos` npm package (core SDK)

### Service Registration (Tree-Shaking Mechanism)

Services self-register on `VergeClient` via side-effect imports and TypeScript declaration merging:

```typescript
// services/vm/index.ts
VergeClient.registerService("vms", VMService);
declare module "tsvergeos" {
  interface VergeClient {
    readonly vms: VMService;
  }
}
```

Users opt in to services: `import 'tsvergeos/services/vm'`. Unused services are dead code eliminated. Two convenience barrels exist:

- `import 'tsvergeos'` — curated core (~40 most-used services). Recommended default for dashboards, SPAs, and most apps.
- `import 'tsvergeos/full'` — all ~84 services. For Node scripts, CLIs, and "I don't care about bundle size" cases.

All resource types are re-exported from a top-level barrel for type-only imports with zero bundle impact:

```typescript
import type { VM, VMCreateParams, Alarm, Network } from "tsvergeos/types";
```

### Service Hierarchy

Three base classes, additive inheritance — each level only adds capabilities:

```
ReadOnlyService<T>          → list, get, getByName, listAll
WritableService<T, U>       → + update, delete
BaseService<T, C, U>        → + create
```

Each service is a folder: `services/{name}/index.ts` (registration), `types.ts` (Resource + CreateParams + UpdateParams), `service.ts` (extends base class).

### Multi-Site Layer

`SiteManager` manages named `VergeClient` instances. `CrossSiteReadProxy` fans out read-only queries (`list()`) across all sites via `Promise.allSettled`. Returns `CrossSiteResult<T>` with `{ data: SiteResource<T>[]; errors: SiteError[] }`.

Mutations always go through a named site: `manager.site("dc-east").vms.powerOn(42)`. No compound keys, no proxy mutations.

### Action Dispatch

Two VergeOS action patterns, both derived from the resource string:

- **Inline:** `POST /api/v4/{resource}/{id}/{action}` → `inlineAction(key, action)`
- **Dedicated:** `POST /api/v4/{singular}_actions` → `dispatchAction(action, key)`

The dedicated endpoint is derived by convention: strip trailing `s`, append `_actions`. This holds for all 44 action endpoints with zero exceptions.

### Key Type Patterns

- `FlexKey = number | string` — handles VergeOS's inconsistent ID serialization
- Three shapes per resource: `VM` (response), `VMCreateParams`, `VMUpdateParams` (not `Partial<VM>`)
- Read-back after mutations: `create()` and `update()` do a follow-up GET (API only returns `{ $key: id }`)
- `readBack: false` option available for bulk operations

## Code Conventions

### Naming

- `camelCase` for variables/functions, `PascalCase` for classes, `SCREAMING_SNAKE_CASE` for constants
- Service classes: `VMService`, interfaces: `VMServiceInterface`
- Files: `kebab-case.ts`
- Client properties: `client.vms`, `client.networks`, `client.tenantRecipes`

### Style

- `const` over `let`, no `var`
- `async/await` over raw promises
- Early returns to reduce nesting
- No `any` — use `unknown` and narrow
- TSDoc comments on all public API surfaces (classes, methods, types, interfaces). Internal/private code doesn't need them.
- Use the typed error hierarchy (`ApiError`, `NotFoundError`, `AuthError`, etc.) — never throw raw `Error`. Every error class has a corresponding `is*Error()` type guard; use those in catch blocks instead of `instanceof`.

### Git

- Conventional commits with emoji: `✨ feat:`, `🐛 fix:`, `♻️ refactor:`, `📝 docs:`, `✅ test:`
- Branches: `feature/<name>`, `fix/<name>`, `refactor/<name>`

## Reference Materials

- `.claude/reference/PRD.md` — full product requirements with validated architecture
- `.claude/reference/RESOURCES.md` — index of all development resources (API docs, SDK references, test systems)
- `.claude/plans/` — validated design documents for major architectural decisions
- Go SDK at `/Volumes/HOME/projects/govergeos/` — closest precedent, reference for service patterns and ADRs
- Python SDK at `/Volumes/HOME/projects/pyvergeos/` — broadest service coverage (82 services), filter builder reference
- VergeOS API docs at `/Users/larry/Development/VergeOS-Docs/docs/api-reference/` — 337 endpoint docs with full field schemas

## MCP Servers

| Server       | Purpose                                                                       |
| ------------ | ----------------------------------------------------------------------------- |
| **Marvin**   | Internal Verge knowledge base — product docs, support articles, release notes |
| **Context7** | Current docs for external libraries (TypeScript, Vitest, tsup, Biome, etc.)   |

## Testing

### Non-Negotiable Rule

**If we ship it, we test it — unit and live integration tests, no exceptions.** Every new service, feature, or behavioral change must have both unit tests (mocking the HTTP layer) and integration tests (hitting real VergeOS systems) before it is committed. This is not optional. Do not offer to commit without both passing.

### Philosophy

- Unit tests mock the HTTP layer, never the service logic. Tests should verify that services construct the right requests and handle responses correctly.
- Integration tests hit real VergeOS systems and are the final gate — no service ships without them passing.
- Tests document behavior. A test name should read as a spec: `"returns NotFoundError when VM does not exist"`, not `"test get error"`.
- Test the contract, not the implementation. Assert on return values and side effects, not internal method calls.

### Integration Test Systems

Two systems available (credentials in `.claude/testing.md`, gitignored):

- **Dev System 1** (`192.168.10.75`) — self-signed cert, tests `verifySsl: false`
- **Dev System 2** (`asgard.subether.me`) — valid cert, production-like

Conventions (from Go SDK): rate limit between requests (~50ms), 2-minute timeout per test, clean up everything you create in `afterEach`/`finally`. Tests must be idempotent and safe to run repeatedly.
