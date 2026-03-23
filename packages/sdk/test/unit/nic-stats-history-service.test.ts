import { describe, expect, it, vi } from "vitest";
import type { HttpClient } from "../../src/http.js";
import { MachineNicStatsHistoryLongService } from "../../src/services/machine-nic-stats-history-long/service.js";
import type { MachineNicStatsHistoryLong } from "../../src/services/machine-nic-stats-history-long/types.js";
import { MachineNicStatsHistoryShortService } from "../../src/services/machine-nic-stats-history-short/service.js";
import type { MachineNicStatsHistoryShort } from "../../src/services/machine-nic-stats-history-short/types.js";

// ---------------------------------------------------------------------------
// Mock HttpClient factory
// ---------------------------------------------------------------------------

function mockHttp(host = "https://verge.example.com"): HttpClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    del: vi.fn(),
    host,
  } as unknown as HttpClient;
}

// ---------------------------------------------------------------------------
// Sample resources
// ---------------------------------------------------------------------------

const sampleNicHistoryShort: MachineNicStatsHistoryShort = {
  $key: 1,
  parent_nic: 10,
  txbps: 1048576,
  rxbps: 2097152,
  txpps: 500,
  rxpps: 1200,
  totalxbps: 3145728,
  tx_pckts: 66,
  rx_pckts: 111,
  tx_bytes: 73243,
  rx_bytes: 23911,
  timestamp: 1700000000,
};

const sampleNicHistoryLong: MachineNicStatsHistoryLong = {
  $key: 2,
  parent_nic: 10,
  txbps_avg: 524288,
  rxbps_avg: 1048576,
  txpps_avg: 250,
  rxpps_avg: 600,
  txbps_peak: 5242880,
  rxbps_peak: 10485760,
  txpps_peak: 2500,
  rxpps_peak: 6000,
  totalxbps_avg: 1572864,
  totalxbps_peak: 15728640,
  tx_pckts: 37,
  rx_pckts: 40,
  tx_bytes: 5738,
  rx_bytes: 5050,
  timestamp: 1700000000,
};

// ---------------------------------------------------------------------------
// MachineNicStatsHistoryShortService Tests
// ---------------------------------------------------------------------------

describe("MachineNicStatsHistoryShortService", () => {
  describe("constructor", () => {
    it("uses /machine_nic_stats_history_short resource path", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryShortService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNicHistoryShort]);

      await svc.list();

      expect(http.get).toHaveBeenCalledWith(
        "/machine_nic_stats_history_short",
        {
          params: { fields: "most" },
        },
      );
    });
  });

  describe("read-only enforcement", () => {
    it("does not have create method", () => {
      const svc = new MachineNicStatsHistoryShortService(mockHttp());
      expect((svc as Record<string, unknown>).create).toBeUndefined();
    });

    it("does not have update method", () => {
      const svc = new MachineNicStatsHistoryShortService(mockHttp());
      expect((svc as Record<string, unknown>).update).toBeUndefined();
    });

    it("does not have delete method", () => {
      const svc = new MachineNicStatsHistoryShortService(mockHttp());
      expect((svc as Record<string, unknown>).delete).toBeUndefined();
    });
  });

  describe("listByNic", () => {
    it("filters by parent_nic FK", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryShortService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNicHistoryShort]);

      const result = await svc.listByNic(10);

      expect(http.get).toHaveBeenCalledWith(
        "/machine_nic_stats_history_short",
        {
          params: { fields: "most", filter: "parent_nic eq 10" },
        },
      );
      expect(result).toEqual([sampleNicHistoryShort]);
    });

    it("merges additional list options", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryShortService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNicHistoryShort]);

      await svc.listByNic(10, { sort: "-timestamp", limit: 10 });

      expect(http.get).toHaveBeenCalledWith(
        "/machine_nic_stats_history_short",
        {
          params: {
            fields: "most",
            sort: "-timestamp",
            limit: 10,
            filter: "parent_nic eq 10",
          },
        },
      );
    });

    it("returns empty array when no history exists", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryShortService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      const result = await svc.listByNic(999);

      expect(result).toEqual([]);
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.machineNicStatsHistoryShort", async () => {
      await import("../../src/services/machine-nic-stats-history-short/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.machineNicStatsHistoryShort).toBeDefined();
      expect(client.machineNicStatsHistoryShort).toBeInstanceOf(
        MachineNicStatsHistoryShortService,
      );
    });
  });
});

// ---------------------------------------------------------------------------
// MachineNicStatsHistoryLongService Tests
// ---------------------------------------------------------------------------

describe("MachineNicStatsHistoryLongService", () => {
  describe("constructor", () => {
    it("uses /machine_nic_stats_history_long resource path", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryLongService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNicHistoryLong]);

      await svc.list();

      expect(http.get).toHaveBeenCalledWith("/machine_nic_stats_history_long", {
        params: { fields: "most" },
      });
    });
  });

  describe("read-only enforcement", () => {
    it("does not have create method", () => {
      const svc = new MachineNicStatsHistoryLongService(mockHttp());
      expect((svc as Record<string, unknown>).create).toBeUndefined();
    });

    it("does not have update method", () => {
      const svc = new MachineNicStatsHistoryLongService(mockHttp());
      expect((svc as Record<string, unknown>).update).toBeUndefined();
    });

    it("does not have delete method", () => {
      const svc = new MachineNicStatsHistoryLongService(mockHttp());
      expect((svc as Record<string, unknown>).delete).toBeUndefined();
    });
  });

  describe("listByNic", () => {
    it("filters by parent_nic FK", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryLongService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNicHistoryLong]);

      const result = await svc.listByNic(10);

      expect(http.get).toHaveBeenCalledWith("/machine_nic_stats_history_long", {
        params: { fields: "most", filter: "parent_nic eq 10" },
      });
      expect(result).toEqual([sampleNicHistoryLong]);
    });

    it("merges additional list options", async () => {
      const http = mockHttp();
      const svc = new MachineNicStatsHistoryLongService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNicHistoryLong]);

      await svc.listByNic(10, { sort: "-timestamp", limit: 100 });

      expect(http.get).toHaveBeenCalledWith("/machine_nic_stats_history_long", {
        params: {
          fields: "most",
          sort: "-timestamp",
          limit: 100,
          filter: "parent_nic eq 10",
        },
      });
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.machineNicStatsHistoryLong", async () => {
      await import("../../src/services/machine-nic-stats-history-long/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.machineNicStatsHistoryLong).toBeDefined();
      expect(client.machineNicStatsHistoryLong).toBeInstanceOf(
        MachineNicStatsHistoryLongService,
      );
    });
  });
});
