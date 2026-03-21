# Integration Test Issues

> Discovered during integration testing on 2026-03-20

## Pre-existing Failures (Dev System 1 — 192.168.10.75)

### recipes.test.ts — 2 failures

- **`should list VM recipes`** — `recipe.$key` is `undefined`. Test expects non-empty list with 40-char hex keys.
- **`should list catalogs`** — `catalog.$key` is `undefined`. Same issue.

**Likely cause:** Dev system has no recipes/catalogs configured, and the tests assume non-empty lists. The `$key` assertion fails because the loop body runs on items with missing keys (or the list is empty and the loop doesn't execute but something else fails).

**Not caused by any recent changes** — these fail independently of the enum union work in `7d6636e`.
