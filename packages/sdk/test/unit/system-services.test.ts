import { describe, expect, it, vi } from "vitest";
import type { HttpClient } from "../../src/http.js";
import { ClusterService } from "../../src/services/cluster/service.js";
import type { Cluster } from "../../src/services/cluster/types.js";
import { LogService } from "../../src/services/log/service.js";
import type { Log } from "../../src/services/log/types.js";
import { NodeService } from "../../src/services/node/service.js";
import type { Node } from "../../src/services/node/types.js";
import { SettingsService } from "../../src/services/settings/service.js";
import type { Setting } from "../../src/services/settings/types.js";
import { SystemService } from "../../src/services/system/service.js";
import type { System, VersionInfo } from "../../src/services/system/types.js";

// ---------------------------------------------------------------------------
// Mock HttpClient factory
// ---------------------------------------------------------------------------

function mockHttp(host = "https://verge.example.com"): HttpClient {
  return {
    get: vi.fn(),
    getAbsolute: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    del: vi.fn(),
    host,
  } as unknown as HttpClient;
}

// ---------------------------------------------------------------------------
// Sample resources
// ---------------------------------------------------------------------------

const sampleVersionInfo: VersionInfo = {
  name: "VergeOS",
  version: "6.1.2",
  hash: "abc123def456",
};

const sampleSystem: System = {
  $key: 1,
  key: "self",
  id: "abc123",
  cloud_name: "Test Cloud",
  yb_version: "6.1.2",
  os_version: "5.15.0",
  branch: "stable",
  is_tenant: false,
  description: "Test system",
  domain: "example.com",
  city: "Austin",
  country: "US",
  timezone: "America/Chicago",
  url: "https://verge.example.com",
  latitude: 30.27,
  longitude: -97.74,
  vsan_host: "10.0.0.1",
  vsan_port: 14201,
  map_color: "#0000FF",
  ui_branding: 0,
  theme: 1,
};

const sampleSetting: Setting = {
  $key: 1,
  key: "cloud_name",
  value: "My Cloud",
  default_value: "VergeOS",
  description: "Display name of the cloud",
};

const sampleCluster: Cluster = {
  $key: 1,
  name: "cluster-1",
  description: "Main cluster",
  enabled: true,
  storage: true,
  compute: true,
} as Cluster;

const sampleNode: Node = {
  $key: 1,
  cluster: 1,
  name: "node-1",
  description: "First node",
  physical: true,
} as Node;

const sampleLog: Log = {
  $key: 100,
  level: "error",
  text: "Disk failure detected on /dev/sda",
  timestamp: 1700000000000000,
  user: "admin",
  object_type: "cluster",
  object_name: "cluster-1",
};

// ===========================================================================
// SystemService
// ===========================================================================

describe("SystemService", () => {
  describe("getInfo", () => {
    it("calls getAbsolute on /version.json", async () => {
      const http = mockHttp();
      const svc = new SystemService(http);
      vi.mocked(http.getAbsolute).mockResolvedValueOnce(sampleVersionInfo);

      const result = await svc.getInfo();

      expect(http.getAbsolute).toHaveBeenCalledWith("/version.json");
      expect(result).toEqual(sampleVersionInfo);
    });
  });

  describe("get", () => {
    it("fetches /system/self (singleton)", async () => {
      const http = mockHttp();
      const svc = new SystemService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleSystem);

      const result = await svc.get();

      expect(http.get).toHaveBeenCalledWith("/system/self");
      expect(result).toEqual(sampleSystem);
    });
  });

  describe("update", () => {
    it("PUTs to /system/self and does read-back", async () => {
      const http = mockHttp();
      const svc = new SystemService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleSystem,
        cloud_name: "Updated Cloud",
      });

      const result = await svc.update({ cloud_name: "Updated Cloud" });

      expect(http.put).toHaveBeenCalledWith("/system/self", {
        body: { cloud_name: "Updated Cloud" },
      });
      expect(result.cloud_name).toBe("Updated Cloud");
    });
  });

  describe("geoip", () => {
    it("dispatches geoip action to /system_actions", async () => {
      const http = mockHttp();
      const svc = new SystemService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.geoip();

      expect(http.post).toHaveBeenCalledWith("/system_actions", {
        body: { action: "geoip", params: {} },
      });
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.system", async () => {
      await import("../../src/services/system/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.system).toBeDefined();
      expect(client.system).toBeInstanceOf(SystemService);
    });
  });
});

// ===========================================================================
// SettingsService
// ===========================================================================

describe("SettingsService", () => {
  describe("CRUD", () => {
    it("list() calls /settings", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleSetting]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/settings", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleSetting]);
    });

    it("get() calls /settings/{key}", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleSetting);

      const result = await svc.get(1);

      expect(http.get).toHaveBeenCalledWith("/settings/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleSetting);
    });

    it("update() PUTs to /settings/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleSetting,
        value: "New Value",
      });

      const result = await svc.update(1, { value: "New Value" });

      expect(http.put).toHaveBeenCalledWith("/settings/1", {
        body: { value: "New Value" },
      });
      expect(result.value).toBe("New Value");
    });

    it("delete() DELETEs /settings/{key}", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(1);

      expect(http.del).toHaveBeenCalledWith("/settings/1");
    });
  });

  describe("getByKey", () => {
    it("filters by key name and returns first match", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleSetting]);

      const result = await svc.getByKey("cloud_name");

      expect(http.get).toHaveBeenCalledWith("/settings", {
        params: { fields: "most", filter: "key eq 'cloud_name'" },
      });
      expect(result).toEqual(sampleSetting);
    });

    it("throws NotFoundError when no setting matches", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      await expect(svc.getByKey("nonexistent")).rejects.toThrow(/not found/i);
    });
  });

  describe("resetToDefault", () => {
    it("dispatches reset action to /settings_actions", async () => {
      const http = mockHttp();
      const svc = new SettingsService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.resetToDefault(1);

      expect(http.post).toHaveBeenCalledWith("/settings_actions", {
        body: { setting: 1, action: "reset" },
      });
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.settings", async () => {
      await import("../../src/services/settings/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.settings).toBeDefined();
      expect(client.settings).toBeInstanceOf(SettingsService);
    });
  });
});

// ===========================================================================
// ClusterService
// ===========================================================================

describe("ClusterService", () => {
  describe("CRUD", () => {
    it("list() calls /clusters", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleCluster]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/clusters", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleCluster]);
    });

    it("get() calls /clusters/{key}", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleCluster);

      const result = await svc.get(1);

      expect(http.get).toHaveBeenCalledWith("/clusters/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleCluster);
    });

    it("create() POSTs to /clusters and does read-back", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
      vi.mocked(http.get).mockResolvedValueOnce(sampleCluster);

      const result = await svc.create({ name: "cluster-1" } as Cluster);

      expect(http.post).toHaveBeenCalledWith("/clusters", {
        body: { name: "cluster-1" },
      });
      expect(http.get).toHaveBeenCalledWith("/clusters/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleCluster);
    });

    it("update() PUTs to /clusters/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleCluster,
        description: "updated",
      });

      const result = await svc.update(1, { description: "updated" });

      expect(http.put).toHaveBeenCalledWith("/clusters/1", {
        body: { description: "updated" },
      });
      expect(result.description).toBe("updated");
    });

    it("delete() DELETEs /clusters/{key}", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(1);

      expect(http.del).toHaveBeenCalledWith("/clusters/1");
    });
  });

  describe("convenience filters", () => {
    it("listStorage() filters for storage eq true", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleCluster]);

      const result = await svc.listStorage();

      expect(http.get).toHaveBeenCalledWith("/clusters", {
        params: { fields: "most", filter: "storage eq true" },
      });
      expect(result).toEqual([sampleCluster]);
    });

    it("listCompute() filters for compute eq true", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleCluster]);

      const result = await svc.listCompute();

      expect(http.get).toHaveBeenCalledWith("/clusters", {
        params: { fields: "most", filter: "compute eq true" },
      });
      expect(result).toEqual([sampleCluster]);
    });

    it("listStorage() combines with existing filter", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleCluster]);

      await svc.listStorage({ filter: "name eq 'cluster-1'" });

      expect(http.get).toHaveBeenCalledWith("/clusters", {
        params: {
          fields: "most",
          filter: "(name eq 'cluster-1') and (storage eq true)",
        },
      });
    });
  });

  describe("actions", () => {
    it("shutdown dispatches to /cluster_actions", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.shutdown(1);

      expect(http.post).toHaveBeenCalledWith("/cluster_actions", {
        body: { cluster: 1, action: "shutdown" },
      });
    });

    it("cancelShutdown dispatches cancel_shutdown action", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.cancelShutdown(1);

      expect(http.post).toHaveBeenCalledWith("/cluster_actions", {
        body: { cluster: 1, action: "cancel_shutdown" },
      });
    });

    it("refresh dispatches refresh action", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.refresh(1);

      expect(http.post).toHaveBeenCalledWith("/cluster_actions", {
        body: { cluster: 1, action: "refresh" },
      });
    });

    it("accepts string keys for actions", async () => {
      const http = mockHttp();
      const svc = new ClusterService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.shutdown("1");

      expect(http.post).toHaveBeenCalledWith("/cluster_actions", {
        body: { cluster: "1", action: "shutdown" },
      });
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.clusters", async () => {
      await import("../../src/services/cluster/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.clusters).toBeDefined();
      expect(client.clusters).toBeInstanceOf(ClusterService);
    });
  });
});

// ===========================================================================
// NodeService
// ===========================================================================

describe("NodeService", () => {
  describe("read/update (no create/delete)", () => {
    it("list() calls /nodes", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/nodes", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleNode]);
    });

    it("get() calls /nodes/{key}", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleNode);

      const result = await svc.get(1);

      expect(http.get).toHaveBeenCalledWith("/nodes/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleNode);
    });

    it("update() PUTs to /nodes/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleNode,
        description: "updated node",
      });

      const result = await svc.update(1, { description: "updated node" });

      expect(http.put).toHaveBeenCalledWith("/nodes/1", {
        body: { description: "updated node" },
      });
      expect(result.description).toBe("updated node");
    });

    it("delete() DELETEs /nodes/{key}", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(1);

      expect(http.del).toHaveBeenCalledWith("/nodes/1");
    });

    it("has no create method (WritableService)", () => {
      const http = mockHttp();
      const svc = new NodeService(http);

      expect("create" in svc).toBe(false);
    });
  });

  describe("convenience filters", () => {
    it("listByCluster filters by cluster FK", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

      const result = await svc.listByCluster(1);

      expect(http.get).toHaveBeenCalledWith("/nodes", {
        params: { fields: "most", filter: "cluster eq 1" },
      });
      expect(result).toEqual([sampleNode]);
    });

    it("listPhysical filters for physical eq true", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

      const result = await svc.listPhysical();

      expect(http.get).toHaveBeenCalledWith("/nodes", {
        params: { fields: "most", filter: "physical eq true" },
      });
      expect(result).toEqual([sampleNode]);
    });

    it("listByCluster combines with existing filter", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleNode]);

      await svc.listByCluster(1, { filter: "physical eq true" });

      expect(http.get).toHaveBeenCalledWith("/nodes", {
        params: {
          fields: "most",
          filter: "(physical eq true) and (cluster eq 1)",
        },
      });
    });
  });

  describe("actions", () => {
    it("enableMaintenance dispatches maintenance action", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.enableMaintenance(1);

      expect(http.post).toHaveBeenCalledWith("/node_actions", {
        body: { node: 1, action: "maintenance" },
      });
    });

    it("disableMaintenance dispatches leavemaintenance action", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.disableMaintenance(1);

      expect(http.post).toHaveBeenCalledWith("/node_actions", {
        body: { node: 1, action: "leavemaintenance" },
      });
    });

    it("maintenanceReboot dispatches maintenance_reboot action", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.maintenanceReboot(1);

      expect(http.post).toHaveBeenCalledWith("/node_actions", {
        body: { node: 1, action: "maintenance_reboot" },
      });
    });

    it("accepts string keys for actions", async () => {
      const http = mockHttp();
      const svc = new NodeService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.enableMaintenance("1");

      expect(http.post).toHaveBeenCalledWith("/node_actions", {
        body: { node: "1", action: "maintenance" },
      });
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.nodes", async () => {
      await import("../../src/services/node/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.nodes).toBeDefined();
      expect(client.nodes).toBeInstanceOf(NodeService);
    });
  });
});

// ===========================================================================
// LogService
// ===========================================================================

describe("LogService", () => {
  describe("list", () => {
    it("applies default sort -timestamp", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: { fields: "most", sort: "-timestamp" },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("allows overriding default sort", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      await svc.list({ sort: "timestamp" });

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: { fields: "most", sort: "timestamp" },
      });
    });

    it("get() calls /logs/{key}", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleLog);

      const result = await svc.get(100);

      expect(http.get).toHaveBeenCalledWith("/logs/100", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleLog);
    });

    it("has no create/update/delete methods (ReadOnlyService)", () => {
      const http = mockHttp();
      const svc = new LogService(http);

      expect("create" in svc).toBe(false);
      expect("update" in svc).toBe(false);
      expect("delete" in svc).toBe(false);
    });
  });

  describe("convenience methods", () => {
    it("listByLevel filters by level", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.listByLevel("error");

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "level eq 'error'",
        },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("listByObjectType filters by object_type", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.listByObjectType("cluster");

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "object_type eq 'cluster'",
        },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("listErrors filters for error or critical", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.listErrors();

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "(level eq 'error') or (level eq 'critical')",
        },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("listByUser filters by username", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.listByUser("admin");

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "user eq 'admin'",
        },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("listSince filters by timestamp", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.listSince(1700000000000000);

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "timestamp ge 1700000000000000",
        },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("search filters by text contains", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      const result = await svc.search("disk failure");

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "text ct 'disk failure'",
        },
      });
      expect(result).toEqual([sampleLog]);
    });

    it("search escapes single quotes in pattern", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      await svc.search("can't start");

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter: "text ct 'can''t start'",
        },
      });
    });

    it("listErrors combines with existing filter", async () => {
      const http = mockHttp();
      const svc = new LogService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleLog]);

      await svc.listErrors({ filter: "user eq 'admin'" });

      expect(http.get).toHaveBeenCalledWith("/logs", {
        params: {
          fields: "most",
          sort: "-timestamp",
          filter:
            "(user eq 'admin') and ((level eq 'error') or (level eq 'critical'))",
        },
      });
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.logs", async () => {
      await import("../../src/services/log/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.logs).toBeDefined();
      expect(client.logs).toBeInstanceOf(LogService);
    });
  });
});
