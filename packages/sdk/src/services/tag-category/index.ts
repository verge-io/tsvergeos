/**
 * Tag category service registration module.
 *
 * Importing this module registers the {@link TagCategoryService} on {@link VergeClient},
 * making `client.tagCategories` available. This is a side-effect import:
 *
 * ```typescript
 * import 'tsvergeos/services/tag-category';
 * ```
 *
 * @module
 */

import { VergeClient } from "../../client.js";
import { TagCategoryService } from "./service.js";

VergeClient.registerService("tagCategories", TagCategoryService);

declare module "../../client.js" {
  interface VergeClient {
    /** Service for managing tag categories. */
    readonly tagCategories: TagCategoryService;
  }
}

export { TagCategoryService } from "./service.js";
export type {
  TagCategory,
  TagCategoryCreateParams,
  TagCategoryUpdateParams,
} from "./types.js";
