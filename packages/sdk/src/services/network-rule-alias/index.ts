/**
 * Network Rule Alias service registration module.
 *
 * Importing this module registers the {@link NetworkRuleAliasService} on {@link VergeClient},
 * making `client.networkRuleAliases` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-rule-alias';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { NetworkRuleAliasService } from "./service.js";

VergeClient.registerService("networkRuleAliases", NetworkRuleAliasService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing network rule aliases (global named address groups). */
    readonly networkRuleAliases: NetworkRuleAliasService;
  }
}

export { NetworkRuleAliasService } from "./service.js";
export type {
  NetworkRuleAlias,
  NetworkRuleAliasCreateParams,
  NetworkRuleAliasUpdateParams,
  PublishingScope,
} from "./types.js";
