# Code Review: Add code review skill + drop stale service counts

## Changes Reviewed

1. **`CLAUDE.md`** (committed) — Removed approximate service counts (~40, ~84) from entrypoint descriptions to avoid stale documentation.
2. **`.claude/skills/reviewing-tsvergeos-code/SKILL.md`** (untracked) — New Claude Code skill for reviewing tsvergeos SDK code.

## Findings

No findings. Both changes are documentation/configuration only:

- **CLAUDE.md**: Docs-only change. No public API, types, or behavior affected. The removal of stale counts is correct — actual counts are 48 and 93, and these will drift further as services are added.
- **SKILL.md**: All conventions listed in the skill were validated against the current codebase (error hierarchy, type guards, service registration, base class hierarchy, FlexKey, action dispatch, read-back, zero deps, multi-site layer, TSDoc coverage, `any` ban). Zero false assumptions found.

## Validation

| Check                         | Result                        |
| ----------------------------- | ----------------------------- |
| `pnpm -F tsvergeos lint`      | 5 warnings, 0 errors          |
| `pnpm -F tsvergeos typecheck` | Clean                         |
| `pnpm -F tsvergeos test`      | 55 suites, 1411 tests passing |

## Verdict

**Approve** — docs-only change with no risk to consumers. Skill conventions are accurate and complete.
