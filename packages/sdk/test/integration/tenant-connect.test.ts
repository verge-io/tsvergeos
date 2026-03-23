import { beforeAll, describe, expect, it } from "vitest";
import { VergeClient } from "../../src/client.js";
import "../../src/services/tenant/index.js";
import "../../src/services/system/index.js";
import "../../src/services/vm/index.js";
import type { Tenant } from "../../src/services/tenant/types.js";
import type { ClientConfig } from "../../src/types.js";
import { delay } from "./helpers.js";

/**
 * Tenant context connection integration tests.
 *
 * Validates the full host → tenant connection flow: connecting to a host
 * system, resolving a tenant's address via the priority chain (url →
 * ui_fqdn → ui_address#ip), and operating inside the tenant's VergeOS.
 *
 * Requires env vars:
 *   VERGEOS_TENANT_HOST     — host system URL (e.g., "https://192.168.10.74")
 *   VERGEOS_TENANT_USERNAME — host + tenant username (e.g., "admin")
 *   VERGEOS_TENANT_PASSWORD — host + tenant password
 *   VERGEOS_VERIFY_SSL      — "false" for self-signed certs (optional)
 */

function hasTenantCredentials(): boolean {
  return Boolean(
    process.env.VERGEOS_TENANT_HOST &&
    process.env.VERGEOS_TENANT_USERNAME &&
    process.env.VERGEOS_TENANT_PASSWORD,
  );
}

const describeIf = hasTenantCredentials() ? describe : describe.skip;

describeIf("Tenant context connection integration", () => {
  let hostClient: VergeClient;
  let firstTenant: Tenant | undefined;
  /** Credentials + SSL config to pass when connecting to tenants. */
  let tenantCreds: Partial<ClientConfig>;

  beforeAll(async () => {
    const verifySsl = process.env.VERGEOS_VERIFY_SSL?.toLowerCase() !== "false";

    const config: Record<string, unknown> = {
      host: process.env.VERGEOS_TENANT_HOST!,
      username: process.env.VERGEOS_TENANT_USERNAME!,
      password: process.env.VERGEOS_TENANT_PASSWORD!,
      verifySsl,
      retries: 0,
    };

    // Self-signed cert support via undici — shared across host and tenant clients
    let customFetch: typeof globalThis.fetch | undefined;
    if (!verifySsl) {
      const { Agent, fetch: undiciFetch } = await import("undici");
      const dispatcher = new Agent({
        connect: { rejectUnauthorized: false },
      });
      customFetch = (input: RequestInfo | URL, init?: RequestInit) =>
        undiciFetch(
          input as Parameters<typeof undiciFetch>[0],
          {
            ...init,
            dispatcher,
          } as Parameters<typeof undiciFetch>[1],
        ) as unknown as Promise<Response>;
      config.fetch = customFetch;
    }

    hostClient = await VergeClient.connect(config as ClientConfig);

    // Build reusable tenant credentials (same auth, same SSL handling)
    tenantCreds = {
      username: process.env.VERGEOS_TENANT_USERNAME!,
      password: process.env.VERGEOS_TENANT_PASSWORD!,
      verifySsl,
      retries: 0,
      ...(customFetch ? { fetch: customFetch } : {}),
    };

    // Find a running tenant
    await delay();
    const tenants = await hostClient.tenants.list();
    firstTenant = tenants.find((t) => t.name) ?? tenants[0];
  });

  // ─── Host-side tenant operations ─────────────────────────────────────

  it("should list tenants on the host", async () => {
    await delay();
    const tenants = await hostClient.tenants.list();

    expect(Array.isArray(tenants)).toBe(true);
    expect(tenants.length).toBeGreaterThan(0);

    for (const t of tenants) {
      expect(t.$key).toBeDefined();
      expect(typeof t.name).toBe("string");
    }
  });

  it("should get a tenant by key with expected fields", async () => {
    if (!firstTenant) return;

    await delay();
    const tenant = await hostClient.tenants.get(firstTenant.$key);

    expect(tenant.$key).toBe(firstTenant.$key);
    expect(tenant.name).toBe(firstTenant.name);
    expect(tenant.uuid).toBeDefined();
  });

  // ─── Tenant context connection ───────────────────────────────────────

  it("should connect to a tenant and get system info", async () => {
    if (!firstTenant) return;

    await delay();
    const tenantClient = await hostClient.tenants.connect(
      firstTenant.$key,
      tenantCreds,
    );

    // The tenant client should target a different host than the parent
    expect(tenantClient.host).not.toBe(hostClient.host);

    // Fetch system info from inside the tenant
    await delay();
    const system = await tenantClient.system.get();

    expect(system).toBeDefined();
    expect(system.is_tenant).toBe(true);
    expect(typeof system.cloud_name).toBe("string");
  });

  it("should list VMs inside a tenant", async () => {
    if (!firstTenant) return;

    await delay();
    const tenantClient = await hostClient.tenants.connect(
      firstTenant.$key,
      tenantCreds,
    );

    await delay();
    const vms = await tenantClient.vms.list();

    expect(Array.isArray(vms)).toBe(true);
    // Tenant may or may not have VMs, just verify the API works
    for (const vm of vms) {
      expect(vm.$key).toBeDefined();
      expect(typeof vm.name).toBe("string");
    }
  });

  it("should connect to multiple tenants independently", async () => {
    await delay();
    const tenants = await hostClient.tenants.list();

    if (tenants.length < 2) return;

    await delay();
    const client1 = await hostClient.tenants.connect(
      tenants[0].$key,
      tenantCreds,
    );
    await delay();
    const client2 = await hostClient.tenants.connect(
      tenants[1].$key,
      tenantCreds,
    );

    // They should target different hosts
    expect(client1.host).not.toBe(client2.host);

    // Both should work independently
    await delay();
    const sys1 = await client1.system.get();
    await delay();
    const sys2 = await client2.system.get();

    expect(sys1.cloud_name).not.toBe(sys2.cloud_name);
    expect(sys1.is_tenant).toBe(true);
    expect(sys2.is_tenant).toBe(true);
  });

  // ─── Tenant client should support the full SDK API ───────────────────

  it("should use tenant client like any normal VergeClient", async () => {
    if (!firstTenant) return;

    await delay();
    const tenantClient = await hostClient.tenants.connect(
      firstTenant.$key,
      tenantCreds,
    );

    // The tenant is a full VergeOS — it can even have its own tenants
    await delay();
    const tenantTenants = await tenantClient.tenants.list();
    expect(Array.isArray(tenantTenants)).toBe(true);
  });
});
