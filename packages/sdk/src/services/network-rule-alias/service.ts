import type { HttpClient } from "../../http.js";
import { BaseService } from "../base.js";
import type {
  NetworkRuleAlias,
  NetworkRuleAliasCreateParams,
  NetworkRuleAliasUpdateParams,
} from "./types.js";

/**
 * Service for managing VergeOS network rule aliases.
 *
 * Rule aliases are global named address groups that can be referenced in
 * firewall rules. Unlike rules and addresses, aliases are not scoped to a
 * specific network — they exist at the system level with visibility controlled
 * by the `publishing_scope` field.
 *
 * @example
 * ```typescript
 * import { VergeClient } from 'tsvergeos';
 * import 'tsvergeos/services/network-rule-alias';
 *
 * const client = await VergeClient.connect({ host: '...', apiKey: '...' });
 *
 * // Create a rule alias
 * const alias = await client.networkRuleAliases.create({
 *   name: 'trusted-hosts',
 *   value: '10.0.0.0/8,192.168.1.0/24',
 *   publishing_scope: 'global',
 * });
 *
 * // List all aliases
 * const aliases = await client.networkRuleAliases.list();
 *
 * // Update an alias
 * await client.networkRuleAliases.update(alias.$key, {
 *   value: '10.0.0.0/8,192.168.0.0/16',
 * });
 *
 * // Delete an alias
 * await client.networkRuleAliases.delete(alias.$key);
 * ```
 */
export class NetworkRuleAliasService extends BaseService<
  NetworkRuleAlias,
  NetworkRuleAliasCreateParams,
  NetworkRuleAliasUpdateParams
> {
  constructor(http: HttpClient) {
    super(http, "/vnet_rule_aliases", "Network Rule Alias");
  }
}
