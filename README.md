# tsvergeos

TypeScript SDK for the VergeOS ultraconverged infrastructure platform.

[![npm version](https://img.shields.io/npm/v/tsvergeos)](https://www.npmjs.com/package/tsvergeos)
[![Node.js 18+](https://img.shields.io/badge/node-18+-blue.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Zero runtime dependencies. Tree-shakeable ESM-first output with CJS fallback. Full type coverage. 84 services covering every VergeOS API endpoint.

## Installation

```bash
npm install tsvergeos

# Or with pnpm / yarn / bun
pnpm add tsvergeos
```

## Quick Start

```typescript
import { VergeClient } from "tsvergeos";
import "tsvergeos/services/vm";

const client = await VergeClient.connect({
  host: "192.168.1.100",
  apiKey: "your-api-key",
  verifySsl: false, // for self-signed certificates
});

// List all VMs
const vms = await client.vms.list();
for (const vm of vms) {
  console.log(`${vm.name}: ${vm.ram}MB RAM, ${vm.cpu_cores} cores`);
}

// Get a specific VM
const vm = await client.vms.get(42);
const vmByName = await client.vms.getByName("web-server");

// Power operations
await client.vms.powerOn(vm.$key);
await client.vms.powerOff(vm.$key);

// Create a VM
const newVm = await client.vms.create({
  name: "test-vm",
  machine_type: "q35",
  ram: 2048,
  cpu_cores: 2,
  os_family: "linux",
});

// Update a VM
await client.vms.update(newVm.$key, { ram: 4096 });

// Delete a VM
await client.vms.delete(newVm.$key);
```

## Authentication

### API Key (recommended)

```typescript
const client = await VergeClient.connect({
  host: "verge.example.com",
  apiKey: "your-api-key",
});
```

### Username / Password

```typescript
const client = await VergeClient.connect({
  host: "verge.example.com",
  username: "admin",
  password: "secret",
});
```

### Environment Variables

```bash
export VERGEOS_HOST=verge.example.com
export VERGEOS_API_KEY=your-api-key
# Optional:
export VERGEOS_VERIFY_SSL=false
export VERGEOS_TIMEOUT=60
```

```typescript
const client = await VergeClient.connectFromEnv();
```

## Tree-Shakeable Imports

Services self-register via side-effect imports. Import only what you need for minimal bundle size:

```typescript
import { VergeClient } from "tsvergeos";
import "tsvergeos/services/vm";
import "tsvergeos/services/network";

// Only VM and network services are bundled
const client = await VergeClient.connect({ host: "...", apiKey: "..." });
await client.vms.list();
await client.networks.list();
```

Or import everything at once for scripts and backend use:

```typescript
import { VergeClient } from "tsvergeos/full";

// All 84 services registered
const client = await VergeClient.connect({ host: "...", apiKey: "..." });
```

Type-only imports have zero bundle impact:

```typescript
import type { VM, Network, Tenant, Volume } from "tsvergeos/types";
```

## Filtering and Queries

```typescript
import { Filter, buildFilter } from "tsvergeos";
import "tsvergeos/services/vm";

// Fluent API
const filter = new Filter()
  .eq("status", "running")
  .like("name", "web*")
  .gt("cpu_cores", 2)
  .build();

const vms = await client.vms.list({ filter });

// Functional shorthand
const vms2 = await client.vms.list({
  filter: buildFilter({
    status: "running",
    name: "web*",
    cpu_cores: { gt: 2 },
  }),
});

// Pagination and field selection
const page = await client.vms.list({
  limit: 10,
  offset: 20,
  sort: "-created",
  fields: ["name", "status", "ram"],
});

// Fetch all pages automatically
const allVms = await client.vms.listAll();
```

## Multi-Site Management

Manage multiple VergeOS deployments from a single entry point:

```typescript
import { SiteManager } from "tsvergeos";
import "tsvergeos/services/vm";

const manager = new SiteManager();

await manager.addSite({
  name: "dc-east",
  host: "10.0.1.1",
  apiKey: "key-east",
  tags: ["production"],
});

await manager.addSite({
  name: "dc-west",
  host: "10.0.2.1",
  apiKey: "key-west",
  tags: ["production"],
});

// Query a specific site
const eastVms = await manager.site("dc-east").vms.list();

// Fan out read queries across all sites
const allSiteVms = await manager.all.vms.list();
// → { data: SiteResource<VM>[], errors: SiteError[] }

// Each result includes its source site
for (const vm of allSiteVms.data) {
  console.log(`${vm.site}: ${vm.name}`);
}
```

## Error Handling

All errors extend `VergeError` with typed subclasses and type guard functions:

```typescript
import {
  isNotFoundError,
  isAuthError,
  isApiError,
  isValidationError,
} from "tsvergeos";

try {
  const vm = await client.vms.get(999);
} catch (err) {
  if (isNotFoundError(err)) {
    console.log("VM not found");
  } else if (isAuthError(err)) {
    console.log("Authentication failed");
  } else if (isApiError(err)) {
    console.log(`API error ${err.statusCode}: ${err.message}`);
  }
}
```

| Error Class               | When                             |
| ------------------------- | -------------------------------- |
| `ApiError`                | Any HTTP error from the API      |
| `NotFoundError`           | Resource not found (404)         |
| `AuthError`               | Authentication failure (401/403) |
| `ConflictError`           | Conflict (409)                   |
| `ValidationError`         | Invalid client-side input        |
| `UnsupportedVersionError` | Server version too old           |
| `TaskError`               | Async task failed                |
| `TaskTimeoutError`        | Task exceeded wait timeout       |
| `SiteError`               | Multi-site operation failure     |

## Services

84 services covering the full VergeOS API:

| Category       | Services                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Compute**    | `vms`, `machineDrives`, `machineDevices`, `machineNics`, `machineSnapshots`, `machineStats`, `machineDriveStats`, `machineNicStats`, `machineDrivePhys`                                          |
| **Networking** | `networks`, `networkRules`, `networkRuleAliases`, `networkAddresses`, `networkHosts`, `networkDnsZones`, `networkDnsRecords`, `networkDnsViews`                                                  |
| **VPN**        | `wireguards`, `wireguardPeers`, `wireguardPeerStatus`, `ipsecs`, `ipsecPhase1s`, `ipsecPhase2s`, `ipsecConnections`                                                                              |
| **Storage**    | `volumes`, `volumeSnapshots`, `volumeCifsShares`, `volumeNfsShares`, `volumeSyncs`, `volumeBrowser`, `storageTiers`, `storageTierStats`, `clusterTiers`, `clusterTierStats`, `clusterTierStatus` |
| **NAS**        | `nasServices`, `nasServiceUsers`, `files`                                                                                                                                                        |
| **Tenants**    | `tenants`, `tenantNodes`, `tenantStorage`, `tenantSnapshots`, `tenantLayer2`                                                                                                                     |
| **Recipes**    | `vmRecipes`, `vmRecipeInstances`, `tenantRecipes`, `tenantRecipeInstances`, `catalogs`, `catalogRepositories`                                                                                    |
| **Snapshots**  | `snapshotProfiles`, `snapshotProfilePeriods`, `cloudSnapshots`, `cloudSnapshotVms`, `cloudSnapshotTenants`                                                                                       |
| **Sites**      | `sites`, `siteSyncsIncoming`, `siteSyncsOutgoing`, `siteSyncProfilePeriods`                                                                                                                      |
| **System**     | `system`, `clusters`, `nodes`, `settings`, `logs`, `tasks`                                                                                                                                       |
| **Monitoring** | `alarms`, `alarmTypes`, `webhooks`, `webhookUrls`                                                                                                                                                |
| **Tags**       | `tags`, `tagCategories`, `tagMembers`                                                                                                                                                            |
| **Auth**       | `users`, `groups`, `members`, `permissions`, `apiKeys`                                                                                                                                           |
| **Updates**    | `updateSettings`, `updateSources`, `updateSourcePackages`, `updateBranches`                                                                                                                      |
| **Other**      | `certificates`, `cloudInit`, `resourceGroups`                                                                                                                                                    |

## Service Hierarchy

Every service extends one of three base classes:

```
ReadOnlyService<T>          → list, get, getByName, listAll
WritableService<T, U>       → + update, delete
BaseService<T, C, U>        → + create
```

## Client Configuration

```typescript
interface ClientConfig {
  host: string; // Server hostname or URL
  apiKey?: string; // API key for bearer auth
  username?: string; // Username for basic auth
  password?: string; // Password for basic auth
  verifySsl?: boolean; // TLS verification (default: true)
  timeout?: number; // Request timeout in ms (default: 30000)
  retries?: number; // Retry attempts (default: 3)
  retryBackoff?: number; // Backoff between retries in ms (default: 1000)
  fetch?: typeof fetch; // Custom fetch implementation
  signal?: AbortSignal; // Cancellation signal
}
```

## Platform Support

- Node.js 18+
- Modern browsers (via custom `fetch`)
- Deno
- Bun

## SDK Family

| Language   | Package     | Repository                                                  |
| ---------- | ----------- | ----------------------------------------------------------- |
| TypeScript | `tsvergeos` | [verge-io/tsvergeos](https://github.com/verge-io/tsvergeos) |
| Python     | `pyvergeos` | [verge-io/pyvergeos](https://github.com/verge-io/pyvergeos) |
| Go         | `govergeos` | [verge-io/govergeos](https://github.com/verge-io/govergeos) |

## License

MIT
