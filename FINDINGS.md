# tsvergeos — Code Review Findings (2026-03-20)

Scope: reviewed `packages/sdk/src/**`, `packages/sdk/test/**`, and `.claude/plans/**` (executed plans). Ran local checks:

- `pnpm -F tsvergeos lint` (Biome): 14 warnings (non-null assertions in integration tests)
- `pnpm -F tsvergeos typecheck`: pass
- `pnpm -F tsvergeos test`: pass (unit tests)
- `pnpm -F tsvergeos build`: pass (tsup)

## Executive Summary

The SDK is in good shape from a correctness/testing perspective (unit tests + typecheck are clean), and the service patterns are consistent. The biggest issues are packaging/build inconsistencies (exports advertise entry points that are not emitted), public-entry semantics drifting from the executed plan docs, and “browser support” gaps in the HTTP layer (forbidden headers + modern AbortSignal APIs).

## P0 — Shipping/Breakage Risks

### 1) `package.json` exports advertise service entry points that are not built

`packages/sdk/package.json` includes exports for:

- `./services/cloud-init` (`packages/sdk/package.json:807`)
- `./services/resource-group` (`packages/sdk/package.json:817`)
- `./services/update-settings` (`packages/sdk/package.json:827`)
- `./services/update-source` (`packages/sdk/package.json:837`)
- `./services/update-branch` (`packages/sdk/package.json:847`)
- `./services/update-source-package` (`packages/sdk/package.json:857`)

…but `packages/sdk/tsup.config.ts` does not include those entries (the service entry list ends at `services/webhook/index` at `packages/sdk/tsup.config.ts:84-85`). After `pnpm -F tsvergeos build`, the emitted output confirms the mismatch:

- Missing in `packages/sdk/dist/services/`: `cloud-init`, `resource-group`, `update-*` (diff shows: `cloud-init`, `resource-group`, `update-branch`, `update-settings`, `update-source`, `update-source-package`; also `base.ts` is source-only) (see: `comm -23` output).

Impact: consumers importing `tsvergeos/services/cloud-init` (or any of the missing exports above) will fail at runtime / module resolution even though the exports map claims the path exists.

Recommendation: add the missing service entry points to `packages/sdk/tsup.config.ts` **and** ensure `packages/sdk/package.json` stays in sync (ideally generate both from the same source-of-truth list).

### 2) Default entry point semantics drift from the executed plan docs

Executed plan expectation (“index registers everything”): `.claude/plans/10-barrels-and-validation.md` (“`index.ts` (everything), `full.ts` (common services)”). Current reality:

- `packages/sdk/src/index.ts:1-40` imports a **subset** of service registrations, while its header comment says it “auto-registers all services”.
- `packages/sdk/src/full.ts:42-86` imports the **complete** current set of services, including the “remaining services” from Plan 32 (cloud-init, update*, etc.).

Impact: documentation and mental model mismatch for consumers and for contributors maintaining service lists.

Recommendation: pick one of these and align docs + code:

- Option A: make `packages/sdk/src/index.ts` register *everything* (plan-aligned), and keep `packages/sdk/src/full.ts` as a curated subset (later).
- Option B: define `packages/sdk/src/index.ts` as a curated “core” set and `packages/sdk/src/full.ts` as “everything”, then update `.claude/plans/10-barrels-and-validation.md` / `CLAUDE.md` / `AGENTS.md` to match.

## P1 — Platform & Security/Robustness

### 3) HTTP layer sets headers that are forbidden in browsers, despite “modern browsers” target

`packages/sdk/src/http.ts` sets:

- `User-Agent` for all JSON requests (`packages/sdk/src/http.ts:308-313`)
- `Connection: close` for raw uploads (`packages/sdk/src/http.ts:142-147`)

In browser fetch, setting `User-Agent` (and `Connection`) is disallowed and can throw. This conflicts with the repository claim that the SDK “Targets … modern browsers” (`CLAUDE.md:7` / `AGENTS.md`).

Recommendation: conditionally omit forbidden headers when running in a browser-like environment, and document any unavoidable browser limitations (CORS + auth headers are already a practical constraint).

### 4) AbortSignal APIs used may not exist in all supported runtimes

`packages/sdk/src/http.ts` relies on:

- `AbortSignal.timeout(...)` (`packages/sdk/src/http.ts:330-332`, and fallback at `:340-342`)
- `AbortSignal.any(...)` (`packages/sdk/src/http.ts:346`)

These are not universally supported across all “modern browsers”, and can be missing in some JS runtimes. Current code assumes their presence.

Recommendation: feature-detect and fall back to a local `AbortController`-based timeout combiner when these APIs are absent.

### 5) `verifySsl` is exposed, but not implemented in the core runtime HTTP client

`ClientConfig` includes `verifySsl` (`packages/sdk/src/types.ts:41-42`), and `VergeClient.fromEnv()` supports `VERGEOS_VERIFY_SSL` (`packages/sdk/src/client.ts:217-220`). However, `HttpClient` does not read or apply `verifySsl` at all (constructor shown at `packages/sdk/src/http.ts:47-65`).

Integration tests work around this by injecting a custom undici fetch when `verifySsl` is false (`packages/sdk/test/integration/helpers.ts:65-79`), but consumers will reasonably expect `verifySsl` to do something by default.

Recommendation: either (a) document that `verifySsl` only affects user-supplied `fetch`, or (b) implement a Node-only path behind feature detection (while preserving “zero runtime deps” if that constraint still holds).

## P2 — API Correctness / Consistency

### 6) Raw `Error` is thrown in SDK runtime code (violates repo conventions)

Repo convention: “never throw raw `Error`” (`CLAUDE.md:100` / `AGENTS.md:Style`).

Current violations:

- `packages/sdk/src/http.ts:57` throws `new Error(...)` for missing auth
- `packages/sdk/src/cross-site.ts:163` throws `new Error(...)` when a service is missing

Recommendation: introduce/standardize a typed configuration error (or reuse `ValidationError`) and use it consistently.

### 7) Catch blocks use `instanceof` instead of the provided type guards

Repo convention: use `is*Error()` guards in catch blocks instead of `instanceof` (`CLAUDE.md:100`).

Examples:

- `packages/sdk/src/http.ts:233-240` uses `instanceof ApiError/AuthError/NotFoundError` and DOMException
- `packages/sdk/src/services/base.ts:109-114` and `packages/sdk/src/services/base.ts:238-243` use `instanceof ApiError`
- Several services use `instanceof ApiError` for 404 fallbacks (e.g. `packages/sdk/src/services/webhook/service.ts:50`)

Recommendation: prefer `isApiError`, `isNotFoundError`, `isAuthError`, etc. (from `packages/sdk/src/errors.ts`) for consistency and to avoid prototype edge cases across realms.

### 8) Base service 404 handling is currently redundant / ineffective

`ReadOnlyService.get()` attempts to map 404 `ApiError` to `NotFoundError` (`packages/sdk/src/services/base.ts:104-114`), but `HttpClient` already maps 404 into `NotFoundError` (`packages/sdk/src/http.ts:368-371`). As a result, `err instanceof ApiError` will typically not be true for 404s, so the special-casing won’t run.

Recommendation: either remove the redundant catches, or change them to operate on `NotFoundError` via `isNotFoundError(...)` and/or to enrich the error message using `displayName`.

### 9) Filter strings interpolate user input without escaping (risk: broken queries / injection into filter language)

The `Filter` builder correctly escapes strings (`packages/sdk/src/filter.ts:49-56`), but many services manually embed string values into filter expressions, e.g.:

- `ReadOnlyService.getByName`: `name eq '${name}'` (`packages/sdk/src/services/base.ts:126-132`)
- `NetworkHostService.getByHost`: `host eq '${hostname}'` (`packages/sdk/src/services/network-host/service.ts:76-80`)
- `PermissionService.listByTable`: `table eq '${table}'` (`packages/sdk/src/services/permission/service.ts:55-57`)

If these inputs contain a single quote, queries will break; and because this is a filter language, carefully crafted strings could change query semantics.

Recommendation: centralize a quoting/escaping helper (reuse `Filter.eq()` / `buildFilter()` or export a tiny `quoteFilterString()`), and use it anywhere user-provided strings appear in `filter: ...`.

## P3 — Performance / Maintainability / DX

### 10) Cross-site fan-out uses `indexOf` in loop (O(n²)) and wraps non-Error reasons into raw Error

In `CrossSiteReadProxy._fanOut()`, failures compute the site index via `settled.indexOf(result)` (`packages/sdk/src/cross-site.ts:185-189`). For many sites, this is avoidable overhead. Also it wraps non-Error reasons via `new Error(String(...))` (`packages/sdk/src/cross-site.ts:188-189`).

Recommendation: iterate with an indexed `for (let i = 0; i < settled.length; i++)` loop, and consider standardizing “unknown → Error” normalization in one place (ideally yielding a typed SDK error).

### 11) Integration tests trigger Biome `noNonNullAssertion` warnings

`pnpm -F tsvergeos lint` reports 14 warnings in `packages/sdk/test/integration/tags.test.ts` (e.g. `packages/sdk/test/integration/tags.test.ts:73`, `:95`, `:114`, ...).

Recommendation: replace `createdXKey!` usages with explicit runtime guards (`if (!createdXKey) throw ...`) or restructure tests to avoid nullable state.

### 12) Documentation drift / missing repo layout elements

`CLAUDE.md` / `AGENTS.md` mention `examples/**` directories that do not exist in this repo checkout (`CLAUDE.md:26-30`). They also describe “`import 'tsvergeos'` registers everything” which is not true with the current `packages/sdk/src/index.ts` vs `packages/sdk/src/full.ts` split.

Recommendation: update contributor docs to match the current repository contents and the chosen import semantics (`tsvergeos` vs `tsvergeos/full`).

## Suggested Next Steps (ordered)

1) Fix build/export mismatch: add missing entries to `packages/sdk/tsup.config.ts` for `cloud-init`, `resource-group`, and `update-*`, then rebuild and verify `packages/sdk/dist/services/**` matches the `exports` map.
2) Decide and document entrypoint semantics (`tsvergeos` vs `tsvergeos/full`), then align `packages/sdk/src/index.ts` comments + `.claude/plans/10-*` guidance + `CLAUDE.md` / `AGENTS.md`.
3) Make `HttpClient` safe for browsers: omit forbidden headers and add AbortSignal feature-detection fallbacks.
4) Standardize filter string escaping by reusing `Filter`/`buildFilter` (especially `getByName` and any `filter: ... '${userInput}'` patterns).
5) Replace remaining raw `Error` throws in runtime code with typed errors, and prefer `is*Error()` guards in catches.
