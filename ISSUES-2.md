
### 5. FK fields expanded into full objects by default
**Status:** OPEN
**Finding:** When listing resources without explicit `fields` param (or even with `fields` that include FK columns), the SDK returns foreign key fields as fully expanded nested objects instead of raw keys. Examples hit so far:
- `cluster.nodes` — returns array of node objects `{name, description, id, machine, physical, ipmi_status, ...}` instead of a node count
- `node.cpu` — returns CPU resource object `{name, description, id, ...}` instead of a string/key
- `vm.cluster` — returns cluster object `{$key, name, ...}` instead of the cluster key

This causes React "Objects are not valid as React child" crashes when rendering these fields, and breaks API filters when passing an object where a key is expected (e.g., `loadClusterNodes(site, clusterObject)` silently fails).

**Current Workaround:** Guard every FK field render with typeof checks, extract `.$key` or `.name` from objects. See `ClustersPage.nodeCount()`, `NodeCard` CPU display, and `VMContextMenu` cluster key extraction.

**Impact:** High — every consumer of FK fields needs defensive handling. Easy to miss and causes runtime crashes.

**Suggested Fix:** Either:
1. SDK should return raw keys by default and only expand when explicitly requested (e.g., `expand: ['nodes']`), or
2. SDK should normalize FK fields to raw keys in the response before returning, or
3. Add a `fields` param convention that controls expansion (VergeOS API may already support `$key` vs full expansion)

### 6. Network `powerstate` unreliable — SDK should join `machine_status`
**Status:** OPEN
**Finding:** The SDK's own `Network` type documents that `powerstate` is "often omitted" by the API and advises using `machineStatuses.getByMachine()` instead. But `networks.list()` returns networks with `powerstate` missing or stale, so consumers must manually fan out `machineStatuses.list()` and join by the `machine` FK — the exact same join pattern required for VMs.

The SDK already knows networks are machine-backed (the `machine` FK exists, the JSDoc points to `MachineStatus`), so it should handle this internally rather than pushing the join onto every consumer.

**Current Workaround:** `fetchAllNetworks()` in vDash fans out both `networks.list()` and `machineStatuses.list()`, then joins by `machine` FK to inject `powerstate` and `_running`. Copy-pasted from `fetchAllVMs()`.

**Impact:** Medium — without the join, all networks appear "Down" even when running.

**Suggested Fix:**
1. `NetworkService.list()` could automatically join `machine_status` and populate `powerstate`/`running` (like a "rich list"), or
2. Add `NetworkService.listWithStatus()` that does the join, or
3. At minimum, `SiteManager.all.networks.list()` should support an `includeStatus: true` option that handles the fan-out internally

This is the same underlying issue as VMs needing `machineStatuses` — the SDK could provide a unified "list resources with live status" pattern for any machine-backed resource (VMs, networks, tenants, etc.).

  The core problem: fields=most (our default) causes the API to return FK fields as fully expanded nested objects. All three SDKs type these as scalars.
  Nobody handles it well.

  ┌────────────┬──────────────┬─────────────────────────────────────────────────────────────────────────────┬───────────────────────────────────────────┐
  │    SDK     │   FK Type    │                                  Strategy                                   │                  Works?                   │
  ├────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
  │ Go         │ FlexInt      │ Custom unmarshaler, but only handles string→int, not nested objects         │ Partial — silently drops expanded data    │
  ├────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
  │ Python     │ dict[str,    │ Avoids the problem via per-service _DEFAULT_FIELDS lists that explicitly    │ Works, but it's a workaround              │
  │            │ Any]         │ request specific fields                                                     │                                           │
  ├────────────┼──────────────┼─────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
  │ TypeScript │ FlexKey      │ No handling at all                                                          │ Broken — runtime objects where types      │
  │            │              │                                                                             │ promise scalars                           │
  └────────────┴──────────────┴─────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────┘

  The Python SDK's approach is the most interesting — it sidesteps the whole issue by giving each service a curated default field list instead of relying on
  fields=most. That also lets it do things like machine#status#status as status to pull cross-resource fields inline.

  So this is really three options now:

  1. Normalize responses — post-process to collapse {$key, name, ...} objects back to $key. Simple, but throws away the expanded data.
  2. Per-service default fields (Python pattern) — each service defines exactly which fields it wants, avoiding expansion entirely. More work upfront, but
  most correct and also gives us the cross-resource join syntax (machine#status#status as status) which would solve issue #6 (network powerstate) for free.
  3. Normalize + expose expansion opt-in — collapse by default, but add an expand: ['cluster', 'machine'] option for when consumers actually want the nested
  objects.

  Option 2 is the most architecturally sound and matches what Python already does, but it's a significant amount of work (field lists for 84 services).
  Option 1 is the quick fix. Option 3 is the thorough fix.

  This also reframes issue #6 — if we adopt per-service default fields, we could include machine#status#powerstate as powerstate directly in the Network
  service's default field list, making the join automatic with zero extra queries.