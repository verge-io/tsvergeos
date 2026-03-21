import { describe, expect, it, vi } from "vitest";
import type { HttpClient } from "../../src/http.js";
import { APIKeyService } from "../../src/services/api-key/service.js";
import type { UserAPIKey } from "../../src/services/api-key/types.js";
import { GroupService } from "../../src/services/group/service.js";
import type { Group } from "../../src/services/group/types.js";
import { MemberService } from "../../src/services/member/service.js";
import type { Member } from "../../src/services/member/types.js";
import { PermissionService } from "../../src/services/permission/service.js";
import type { Permission } from "../../src/services/permission/types.js";
import { UserService } from "../../src/services/user/service.js";
import type { User } from "../../src/services/user/types.js";

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

const sampleUser: User = {
  $key: 1,
  name: "admin",
  id: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
  enabled: true,
  displayname: "Administrator",
  email: "admin@example.com",
  type: "normal",
  created: 1700000000,
  change_password: false,
  two_factor_authentication: false,
  two_factor_type: "email",
};

const sampleGroup: Group = {
  $key: 1,
  name: "developers",
  id: "dev-group",
  enabled: true,
  description: "Developer group",
  email: "devs@example.com",
  system_group: false,
};

const sampleMember: Member = {
  $key: 10,
  parent_group: 1,
  member: "users/3",
  system: false,
};

const sampleApiKey: UserAPIKey = {
  $key: 20,
  user: 1,
  user_name: "admin",
  name: "my-key",
  description: "Test API key",
  expires_type: "never",
  created: 1700000000,
};

const samplePermission: Permission = {
  $key: 30,
  identity: 5,
  identity_display: "admin",
  table: "vms",
  tableid: 1,
  row: 42,
  list: true,
  read: true,
  create: false,
  modify: false,
  delete: false,
};

// ===========================================================================
// UserService
// ===========================================================================

describe("UserService", () => {
  describe("CRUD", () => {
    it("list() calls /users", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleUser]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/users", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleUser]);
    });

    it("get() calls /users/{key}", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleUser);

      const result = await svc.get(1);

      expect(http.get).toHaveBeenCalledWith("/users/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleUser);
    });

    it("create() POSTs to /users and does read-back", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
      vi.mocked(http.get).mockResolvedValueOnce(sampleUser);

      const result = await svc.create({ name: "admin", password: "secret123" });

      expect(http.post).toHaveBeenCalledWith("/users", {
        body: { name: "admin", password: "secret123" },
      });
      expect(http.get).toHaveBeenCalledWith("/users/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleUser);
    });

    it("update() PUTs to /users/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleUser,
        displayname: "Updated Admin",
      });

      const result = await svc.update(1, { displayname: "Updated Admin" });

      expect(http.put).toHaveBeenCalledWith("/users/1", {
        body: { displayname: "Updated Admin" },
      });
      expect(result.displayname).toBe("Updated Admin");
    });

    it("delete() DELETEs /users/{key}", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(1);

      expect(http.del).toHaveBeenCalledWith("/users/1");
    });
  });

  describe("enable/disable actions", () => {
    it("enable() sends inline action to /users/3/enable", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.enable(3);

      expect(http.post).toHaveBeenCalledWith("/users/3/enable");
    });

    it("disable() sends inline action to /users/3/disable", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.disable(3);

      expect(http.post).toHaveBeenCalledWith("/users/3/disable");
    });

    it("enable() accepts string keys", async () => {
      const http = mockHttp();
      const svc = new UserService(http);
      vi.mocked(http.post).mockResolvedValueOnce(undefined);

      await svc.enable("3");

      expect(http.post).toHaveBeenCalledWith("/users/3/enable");
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.users", async () => {
      await import("../../src/services/user/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.users).toBeDefined();
      expect(client.users).toBeInstanceOf(UserService);
    });
  });
});

// ===========================================================================
// GroupService
// ===========================================================================

describe("GroupService", () => {
  describe("CRUD", () => {
    it("list() calls /groups", async () => {
      const http = mockHttp();
      const svc = new GroupService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleGroup]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/groups", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleGroup]);
    });

    it("get() calls /groups/{key}", async () => {
      const http = mockHttp();
      const svc = new GroupService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleGroup);

      const result = await svc.get(1);

      expect(http.get).toHaveBeenCalledWith("/groups/1", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleGroup);
    });

    it("create() POSTs to /groups and does read-back", async () => {
      const http = mockHttp();
      const svc = new GroupService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 1 });
      vi.mocked(http.get).mockResolvedValueOnce(sampleGroup);

      const result = await svc.create({ name: "developers" });

      expect(http.post).toHaveBeenCalledWith("/groups", {
        body: { name: "developers" },
      });
      expect(result).toEqual(sampleGroup);
    });

    it("update() PUTs to /groups/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new GroupService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleGroup,
        description: "Updated",
      });

      const result = await svc.update(1, { description: "Updated" });

      expect(http.put).toHaveBeenCalledWith("/groups/1", {
        body: { description: "Updated" },
      });
      expect(result.description).toBe("Updated");
    });

    it("delete() DELETEs /groups/{key}", async () => {
      const http = mockHttp();
      const svc = new GroupService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(1);

      expect(http.del).toHaveBeenCalledWith("/groups/1");
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.groups", async () => {
      await import("../../src/services/group/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.groups).toBeDefined();
      expect(client.groups).toBeInstanceOf(GroupService);
    });
  });
});

// ===========================================================================
// MemberService
// ===========================================================================

describe("MemberService", () => {
  describe("CRUD", () => {
    it("list() calls /members", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleMember]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/members", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleMember]);
    });

    it("create() POSTs to /members and does read-back", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
      vi.mocked(http.get).mockResolvedValueOnce(sampleMember);

      const result = await svc.create({ parent_group: 1, member: "users/3" });

      expect(http.post).toHaveBeenCalledWith("/members", {
        body: { parent_group: 1, member: "users/3" },
      });
      expect(result).toEqual(sampleMember);
    });

    it("delete() DELETEs /members/{key}", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(10);

      expect(http.del).toHaveBeenCalledWith("/members/10");
    });
  });

  describe("listByGroup", () => {
    it("applies parent_group filter", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleMember]);

      const result = await svc.listByGroup(1);

      expect(http.get).toHaveBeenCalledWith("/members", {
        params: { fields: "most", filter: "parent_group eq 1" },
      });
      expect(result).toEqual([sampleMember]);
    });
  });

  describe("add convenience method", () => {
    it("creates a membership for the given group and member", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 10 });
      vi.mocked(http.get).mockResolvedValueOnce(sampleMember);

      const result = await svc.add(1, "users/3");

      expect(http.post).toHaveBeenCalledWith("/members", {
        body: { parent_group: 1, member: "users/3" },
      });
      expect(result).toEqual(sampleMember);
    });
  });

  describe("remove convenience method", () => {
    it("finds and deletes the membership", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleMember]);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.remove(1, "users/3");

      expect(http.get).toHaveBeenCalledWith("/members", {
        params: {
          fields: "most",
          filter: "parent_group eq 1 and member eq 'users/3'",
        },
      });
      expect(http.del).toHaveBeenCalledWith("/members/10");
    });

    it("throws NotFoundError when membership does not exist", async () => {
      const http = mockHttp();
      const svc = new MemberService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      await expect(svc.remove(1, "users/99")).rejects.toThrow(/not found/i);
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.members", async () => {
      await import("../../src/services/member/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.members).toBeDefined();
      expect(client.members).toBeInstanceOf(MemberService);
    });
  });
});

// ===========================================================================
// APIKeyService
// ===========================================================================

describe("APIKeyService", () => {
  describe("CRUD", () => {
    it("list() calls /user_api_keys", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleApiKey]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/user_api_keys", {
        params: { fields: "most" },
      });
      expect(result).toEqual([sampleApiKey]);
    });

    it("get() calls /user_api_keys/{key}", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.get).mockResolvedValueOnce(sampleApiKey);

      const result = await svc.get(20);

      expect(http.get).toHaveBeenCalledWith("/user_api_keys/20", {
        params: { fields: "most" },
      });
      expect(result).toEqual(sampleApiKey);
    });

    it("update() PUTs to /user_api_keys/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...sampleApiKey,
        description: "Updated key",
      });

      const result = await svc.update(20, { description: "Updated key" });

      expect(http.put).toHaveBeenCalledWith("/user_api_keys/20", {
        body: { description: "Updated key" },
      });
      expect(result.description).toBe("Updated key");
    });

    it("delete() DELETEs /user_api_keys/{key}", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(20);

      expect(http.del).toHaveBeenCalledWith("/user_api_keys/20");
    });
  });

  describe("create with token", () => {
    it("returns both apiKey and one-time token", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.post).mockResolvedValueOnce({
        $key: 20,
        response: { token: "secret-token-value" },
      });
      vi.mocked(http.get).mockResolvedValueOnce(sampleApiKey);

      const result = await svc.create({ user: 1, name: "my-key" });

      expect(http.post).toHaveBeenCalledWith("/user_api_keys", {
        body: { user: 1, name: "my-key" },
      });
      expect(result.apiKey).toEqual(sampleApiKey);
      expect(result.token).toBe("secret-token-value");
    });

    it("returns empty token when API does not include one", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 20 });
      vi.mocked(http.get).mockResolvedValueOnce(sampleApiKey);

      const result = await svc.create({ user: 1, name: "my-key" });

      expect(result.token).toBe("");
      expect(result.apiKey).toEqual(sampleApiKey);
    });

    it("skips read-back when readBack: false", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.post).mockResolvedValueOnce({
        $key: 20,
        response: { token: "tok" },
      });

      const result = await svc.create(
        { user: 1, name: "my-key" },
        { readBack: false },
      );

      expect(result.apiKey.$key).toBe(20);
      expect(result.token).toBe("tok");
      expect(http.get).not.toHaveBeenCalled();
    });
  });

  describe("listByUser", () => {
    it("applies user filter", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleApiKey]);

      const result = await svc.listByUser(1);

      expect(http.get).toHaveBeenCalledWith("/user_api_keys", {
        params: { fields: "most", filter: "user eq 1" },
      });
      expect(result).toEqual([sampleApiKey]);
    });
  });

  describe("getByUserAndName", () => {
    it("finds API key by user and name filter", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.get).mockResolvedValueOnce([sampleApiKey]);

      const result = await svc.getByUserAndName(1, "my-key");

      expect(http.get).toHaveBeenCalledWith("/user_api_keys", {
        params: {
          fields: "most",
          filter: "user eq 1 and name eq 'my-key'",
        },
      });
      expect(result).toEqual(sampleApiKey);
    });

    it("throws NotFoundError when no match", async () => {
      const http = mockHttp();
      const svc = new APIKeyService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      await expect(svc.getByUserAndName(1, "missing")).rejects.toThrow(
        /not found/i,
      );
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.apiKeys", async () => {
      await import("../../src/services/api-key/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.apiKeys).toBeDefined();
      expect(client.apiKeys).toBeInstanceOf(APIKeyService);
    });
  });
});

// ===========================================================================
// PermissionService
// ===========================================================================

describe("PermissionService", () => {
  describe("CRUD", () => {
    it("list() calls /permissions", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([samplePermission]);

      const result = await svc.list();

      expect(http.get).toHaveBeenCalledWith("/permissions", {
        params: { fields: "most" },
      });
      expect(result).toEqual([samplePermission]);
    });

    it("get() calls /permissions/{key}", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce(samplePermission);

      const result = await svc.get(30);

      expect(http.get).toHaveBeenCalledWith("/permissions/30", {
        params: { fields: "most" },
      });
      expect(result).toEqual(samplePermission);
    });

    it("create() POSTs to /permissions and does read-back", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 30 });
      vi.mocked(http.get).mockResolvedValueOnce(samplePermission);

      const result = await svc.create({
        identity: 5,
        table: "vms",
        row: 42,
        list: true,
        read: true,
      });

      expect(http.post).toHaveBeenCalledWith("/permissions", {
        body: {
          identity: 5,
          table: "vms",
          row: 42,
          list: true,
          read: true,
        },
      });
      expect(result).toEqual(samplePermission);
    });

    it("update() PUTs to /permissions/{key} and does read-back", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.put).mockResolvedValueOnce(undefined);
      vi.mocked(http.get).mockResolvedValueOnce({
        ...samplePermission,
        modify: true,
      });

      const result = await svc.update(30, { modify: true });

      expect(http.put).toHaveBeenCalledWith("/permissions/30", {
        body: { modify: true },
      });
      expect(result.modify).toBe(true);
    });

    it("delete() DELETEs /permissions/{key}", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.delete(30);

      expect(http.del).toHaveBeenCalledWith("/permissions/30");
    });
  });

  describe("listByIdentity", () => {
    it("applies identity filter", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([samplePermission]);

      const result = await svc.listByIdentity(5);

      expect(http.get).toHaveBeenCalledWith("/permissions", {
        params: { fields: "most", filter: "identity eq 5" },
      });
      expect(result).toEqual([samplePermission]);
    });
  });

  describe("listByTable", () => {
    it("applies table filter", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([samplePermission]);

      const result = await svc.listByTable("vms");

      expect(http.get).toHaveBeenCalledWith("/permissions", {
        params: { fields: "most", filter: "table eq 'vms'" },
      });
      expect(result).toEqual([samplePermission]);
    });
  });

  describe("listByResource", () => {
    it("applies table + row filter", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([samplePermission]);

      const result = await svc.listByResource("vms", 42);

      expect(http.get).toHaveBeenCalledWith("/permissions", {
        params: {
          fields: "most",
          filter: "table eq 'vms' and row eq 42",
        },
      });
      expect(result).toEqual([samplePermission]);
    });
  });

  describe("getByIdentityAndResource", () => {
    it("finds permission by identity/table/row", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([samplePermission]);

      const result = await svc.getByIdentityAndResource(5, "vms", 42);

      expect(http.get).toHaveBeenCalledWith("/permissions", {
        params: {
          fields: "most",
          filter: "identity eq 5 and table eq 'vms' and row eq 42",
        },
      });
      expect(result).toEqual(samplePermission);
    });

    it("throws NotFoundError when no match", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      await expect(svc.getByIdentityAndResource(5, "vms", 999)).rejects.toThrow(
        /not found/i,
      );
    });
  });

  describe("grant", () => {
    it("creates permission with specified flags", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 30 });
      vi.mocked(http.get).mockResolvedValueOnce(samplePermission);

      const result = await svc.grant(5, "vms", 42, {
        list: true,
        read: true,
        modify: false,
      });

      expect(http.post).toHaveBeenCalledWith("/permissions", {
        body: {
          identity: 5,
          table: "vms",
          row: 42,
          list: true,
          read: true,
          modify: false,
        },
      });
      expect(result).toEqual(samplePermission);
    });
  });

  describe("grantReadOnly", () => {
    it("creates permission with list+read true, others false", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 30 });
      vi.mocked(http.get).mockResolvedValueOnce(samplePermission);

      await svc.grantReadOnly(5, "vms", 42);

      expect(http.post).toHaveBeenCalledWith("/permissions", {
        body: {
          identity: 5,
          table: "vms",
          row: 42,
          list: true,
          read: true,
          create: false,
          modify: false,
          delete: false,
        },
      });
    });
  });

  describe("grantFullAccess", () => {
    it("creates permission with all flags true", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.post).mockResolvedValueOnce({ $key: 30 });
      vi.mocked(http.get).mockResolvedValueOnce({
        ...samplePermission,
        list: true,
        read: true,
        create: true,
        modify: true,
        delete: true,
      });

      const result = await svc.grantFullAccess(5, "vms", 42);

      expect(http.post).toHaveBeenCalledWith("/permissions", {
        body: {
          identity: 5,
          table: "vms",
          row: 42,
          list: true,
          read: true,
          create: true,
          modify: true,
          delete: true,
        },
      });
      expect(result.create).toBe(true);
      expect(result.modify).toBe(true);
      expect(result.delete).toBe(true);
    });
  });

  describe("revoke", () => {
    it("finds permission and deletes it", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([samplePermission]);
      vi.mocked(http.del).mockResolvedValueOnce(undefined);

      await svc.revoke(5, "vms", 42);

      // First call: list to find the permission
      expect(http.get).toHaveBeenCalledWith("/permissions", {
        params: {
          fields: "most",
          filter: "identity eq 5 and table eq 'vms' and row eq 42",
        },
      });
      // Second call: delete it
      expect(http.del).toHaveBeenCalledWith("/permissions/30");
    });

    it("throws NotFoundError when permission does not exist", async () => {
      const http = mockHttp();
      const svc = new PermissionService(http);
      vi.mocked(http.get).mockResolvedValueOnce([]);

      await expect(svc.revoke(5, "vms", 999)).rejects.toThrow(/not found/i);
    });
  });

  describe("service registration", () => {
    it("registers on VergeClient as client.permissions", async () => {
      await import("../../src/services/permission/index.js");
      const { VergeClient } = await import("../../src/client.js");

      const client = new VergeClient({
        host: "https://test.example.com",
        apiKey: "test-key",
      });

      expect(client.permissions).toBeDefined();
      expect(client.permissions).toBeInstanceOf(PermissionService);
    });
  });
});
