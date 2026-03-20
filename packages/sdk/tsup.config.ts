import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    types: "src/types.ts",
    full: "src/full.ts",
    "services/vm/index": "src/services/vm/index.ts",
    "services/network/index": "src/services/network/index.ts",
    "services/machine-drive/index": "src/services/machine-drive/index.ts",
    "services/machine-device/index": "src/services/machine-device/index.ts",
    "services/machine-nic/index": "src/services/machine-nic/index.ts",
    "services/machine-snapshot/index": "src/services/machine-snapshot/index.ts",
    "services/network-address/index": "src/services/network-address/index.ts",
    "services/network-rule/index": "src/services/network-rule/index.ts",
    "services/network-rule-alias/index":
      "src/services/network-rule-alias/index.ts",
    "services/network-dns-view/index": "src/services/network-dns-view/index.ts",
    "services/network-dns-zone/index": "src/services/network-dns-zone/index.ts",
    "services/network-dns-record/index":
      "src/services/network-dns-record/index.ts",
    "services/network-host/index": "src/services/network-host/index.ts",
    "services/wireguard/index": "src/services/wireguard/index.ts",
    "services/wireguard-peer/index": "src/services/wireguard-peer/index.ts",
    "services/ipsec/index": "src/services/ipsec/index.ts",
    "services/ipsec-phase1/index": "src/services/ipsec-phase1/index.ts",
    "services/ipsec-phase2/index": "src/services/ipsec-phase2/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  outDir: "dist",
  splitting: true,
  treeshake: true,
});
