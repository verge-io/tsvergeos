/**
 * Node service registration module.
 *
 * Importing this module registers the {@link NodeService} on {@link VergeClient},
 * making `client.nodes` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/node';
 * ```
 *
 * @module
 */

import { VergeClient } from '../../client.js';
import { NodeService } from './service.js';

VergeClient.registerService('nodes', NodeService);

declare module '../../client.js' {
	interface VergeClient {
		/** Service for managing VergeOS nodes. */
		readonly nodes: NodeService;
	}
}

export { NodeService } from './service.js';
export type { IpmiStatus, Node, NodeUpdateParams } from './types.js';
