/**
 * Network Rule service registration module.
 *
 * Importing this module registers the {@link NetworkRuleService} on {@link VergeClient},
 * making `client.networkRules` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/network-rule';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NetworkRuleService } from './service.js';

VergeClient.registerService('networkRules', NetworkRuleService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing network firewall rules. */
		readonly networkRules: NetworkRuleService;
	}
}

export { NetworkRuleService } from './service.js';
export type {
	NetworkRule,
	NetworkRuleCreateParams,
	NetworkRuleUpdateParams,
	RuleAction,
	RuleDirection,
	RuleInterface,
	RulePin,
	RuleProtocol,
} from './types.js';
