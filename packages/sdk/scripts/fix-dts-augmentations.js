#!/usr/bin/env node

/**
 * Post-build script: rewrite module augmentation targets in emitted .d.ts/.d.cts files.
 *
 * During development, services use `declare module '../../client.js'` which
 * TypeScript and tsup resolve correctly via relative paths. But in the published
 * package, tsup bundles client.ts into a chunk file — there is no `client.js`
 * in dist. Consumers need augmentations to target the public package name
 * ('tsvergeos') so that `VergeClient` picks up service properties.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = new URL("../dist", import.meta.url).pathname;
const PATTERN = /declare module '\.\.\/\.\.\/client\.js'/g;
const REPLACEMENT = "declare module 'tsvergeos'";

let count = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith(".d.ts") || entry.name.endsWith(".d.cts")) {
      const content = readFileSync(full, "utf8");
      if (PATTERN.test(content)) {
        // Reset lastIndex since we're reusing a global regex
        PATTERN.lastIndex = 0;
        writeFileSync(full, content.replace(PATTERN, REPLACEMENT));
        count++;
      }
    }
  }
}

walk(DIST_DIR);
console.log(`Fixed module augmentations in ${count} declaration files.`);
