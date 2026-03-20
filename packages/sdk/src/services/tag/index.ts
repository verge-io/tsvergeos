/**
 * Tag service registration module.
 *
 * Importing this module registers the {@link TagService} on {@link VergeClient},
 * making `client.tags` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tag';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { TagService } from "./service.js";

VergeClient.registerService("tags", TagService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing tags. */
    readonly tags: TagService;
  }
}

export { TagService } from "./service.js";
export type { Tag, TagCreateParams, TagUpdateParams } from "./types.js";
