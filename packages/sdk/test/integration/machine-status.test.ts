import { beforeAll, expect, it } from "vitest";
import { VergeClient } from "../../src/client.js";
import "../../src/services/machine-status/index.js";
import "../../src/services/vm/index.js";
import { createClientConfig, delay, skipIfNoCredentials } from "./helpers.js";

const describeIf = skipIfNoCredentials();

describeIf("Machine status integration", () => {
  let client: VergeClient;

  beforeAll(async () => {
    const config = await createClientConfig();
    client = await VergeClient.connect(config);
  });

  it("should list machine statuses with status and state fields", async () => {
    await delay();
    const statuses = await client.machineStatuses.list({ limit: 10 });

    expect(Array.isArray(statuses)).toBe(true);
    // System should have at least one machine with a status entry
    expect(statuses.length).toBeGreaterThan(0);

    for (const entry of statuses) {
      expect(entry.$key).toBeDefined();
      expect(entry.machine).toBeDefined();
      // status should be one of the known enum values
      expect(typeof entry.status).toBe("string");
      expect(entry.status).toBeTruthy();
      // state should be one of the known enum values
      expect(typeof entry.state).toBe("string");
    }
  });

  it("should get a single machine status by key", async () => {
    await delay();
    const statuses = await client.machineStatuses.list({ limit: 1 });
    expect(statuses.length).toBeGreaterThan(0);

    await delay();
    const entry = await client.machineStatuses.get(statuses[0]!.$key);

    expect(entry.$key).toBe(statuses[0]!.$key);
    expect(entry.machine).toBe(statuses[0]!.machine);
    expect(entry.status).toBeDefined();
  });

  it("should get machine status by machine FK via getByMachine", async () => {
    await delay();
    // Get a status entry to find a valid machine FK
    const statuses = await client.machineStatuses.list({ limit: 1 });
    expect(statuses.length).toBeGreaterThan(0);
    const machineKey = statuses[0]!.machine;

    await delay();
    const entry = await client.machineStatuses.getByMachine(machineKey);

    expect(entry.machine).toBe(machineKey);
    expect(entry.status).toBeDefined();
    expect(entry.state).toBeDefined();
  });

  it("should return running=true and powerstate=true for running machines", async () => {
    await delay();
    const running = await client.machineStatuses.list({
      filter: "running eq true",
      limit: 5,
    });

    // At least one machine should be running on a live system
    expect(running.length).toBeGreaterThan(0);

    for (const entry of running) {
      expect(entry.running).toBe(true);
      expect(entry.powerstate).toBe(true);
      expect(entry.status).toBe("running");
      expect(entry.state).toBe("online");
    }
  });

  it("should include resource allocation fields for running machines", async () => {
    await delay();
    const running = await client.machineStatuses.list({
      filter: "running eq true",
      limit: 5,
    });

    expect(running.length).toBeGreaterThan(0);

    for (const entry of running) {
      // running_cores and running_ram are numbers (may be 0 for network routers)
      expect(typeof entry.running_cores).toBe("number");
      expect(typeof entry.running_ram).toBe("number");
      expect(typeof entry.node).toBe("number");
    }
  });

  it("should return machine status that matches a known VM", async () => {
    await delay();
    const vms = await client.vms.list({
      limit: 1,
      filter: "is_snapshot eq false",
    });

    if (vms.length === 0) return; // skip if no VMs

    const vm = vms[0]!;
    // VM has a machine FK we can use to look up status
    if (!vm.machine) return; // skip if machine FK not present

    await delay();
    const status = await client.machineStatuses.getByMachine(vm.machine);

    expect(status.machine).toBe(vm.machine);
    expect(status.status).toBeDefined();
  });
});
