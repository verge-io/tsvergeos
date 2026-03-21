import { beforeAll, expect, it } from "vitest";
import { VergeClient } from "../../src/client.js";
import "../../src/services/machine-stats-history-short/index.js";
import "../../src/services/machine-stats-history-long/index.js";
import "../../src/services/vnet-monitor-stats-history-short/index.js";
import "../../src/services/vnet-monitor-stats-history-long/index.js";
import { createClientConfig, delay, skipIfNoCredentials } from "./helpers.js";

const describeIf = skipIfNoCredentials();

describeIf("Stats history integration", () => {
  let client: VergeClient;

  beforeAll(async () => {
    const config = await createClientConfig();
    client = await VergeClient.connect(config);
  });

  it("should list machine stats history short with CPU fields", async () => {
    await delay();
    const stats = await client.machineStatsHistoryShort.list({ limit: 5 });

    expect(Array.isArray(stats)).toBe(true);
    // History entries may or may not exist depending on system uptime
    for (const entry of stats) {
      expect(entry.$key).toBeDefined();
      expect(typeof entry.total_cpu).toBe("number");
      expect(typeof entry.timestamp).toBe("number");
      expect(entry.machine).toBeDefined();
    }
  });

  it("should list machine stats history long with aggregate fields", async () => {
    await delay();
    const stats = await client.machineStatsHistoryLong.list({ limit: 5 });

    expect(Array.isArray(stats)).toBe(true);
    for (const entry of stats) {
      expect(entry.$key).toBeDefined();
      expect(typeof entry.timestamp).toBe("number");
      expect(entry.machine).toBeDefined();
    }
  });

  it("should filter machine stats history by machine", async () => {
    await delay();
    const all = await client.machineStatsHistoryShort.list({ limit: 1 });
    if (all.length === 0) return; // No history data available

    const machineKey = all[0].machine;
    await delay();
    const filtered = await client.machineStatsHistoryShort.listByMachine(
      machineKey,
      { limit: 5 },
    );

    expect(filtered.length).toBeGreaterThan(0);
    for (const entry of filtered) {
      expect(entry.machine).toBe(machineKey);
    }
  });

  it("should list vnet monitor stats history short", async () => {
    await delay();
    const stats = await client.vnetMonitorStatsHistoryShort.list({ limit: 5 });

    expect(Array.isArray(stats)).toBe(true);
    for (const entry of stats) {
      expect(entry.$key).toBeDefined();
      expect(typeof entry.timestamp).toBe("number");
      expect(entry.vnet).toBeDefined();
    }
  });

  it("should list vnet monitor stats history long", async () => {
    await delay();
    const stats = await client.vnetMonitorStatsHistoryLong.list({ limit: 5 });

    expect(Array.isArray(stats)).toBe(true);
    for (const entry of stats) {
      expect(entry.$key).toBeDefined();
      expect(typeof entry.timestamp).toBe("number");
      expect(entry.vnet).toBeDefined();
    }
  });

  it("should filter vnet monitor stats history by vnet", async () => {
    await delay();
    const all = await client.vnetMonitorStatsHistoryShort.list({ limit: 1 });
    if (all.length === 0) return; // No monitor data available

    const vnetKey = all[0].vnet;
    await delay();
    const filtered = await client.vnetMonitorStatsHistoryShort.listByVnet(
      vnetKey,
      { limit: 5 },
    );

    expect(filtered.length).toBeGreaterThan(0);
    for (const entry of filtered) {
      expect(entry.vnet).toBe(vnetKey);
    }
  });
});
