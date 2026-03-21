import type { FlexKey, Resource } from '../../types.js';

/**
 * A VergeOS VM recipe instance resource.
 *
 * VM recipe instances represent deployed instances of VM recipes.
 * They are created when a VM recipe is deployed and track the
 * relationship between the recipe and the resulting VM.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VMRecipeInstance extends Resource {
	/** Parent recipe (FK to `vm_recipes`). Read-only. */
	recipe: FlexKey;

	/** Associated VM (FK to `vms`). Read-only. */
	vm?: FlexKey;

	/** Recipe version string. */
	version?: string;

	/** Recipe build number. */
	build?: number;

	/** Answers to recipe questions (JSON). */
	answers?: Record<string, unknown>;

	/** Instance name. 1–128 chars. */
	name: string;

	/** Whether to trigger an update. */
	update?: boolean;

	/** Whether to trigger verification. */
	verify?: boolean;

	/** Whether to run in simulation mode. */
	simulate?: boolean;

	/** Whether to auto-update when the recipe changes. Default: `false`. */
	auto_update?: boolean;

	/** Creation timestamp. Read-only. */
	created?: number;

	/** Last modification timestamp. Read-only. */
	modified?: number;
}

/**
 * Parameters for creating a VM recipe instance (deploying a recipe).
 */
export interface VMRecipeInstanceCreateParams {
	/** Recipe key (40-char hex string FK to `vm_recipes`). Required. */
	recipe: FlexKey;

	/** Instance name. Required. */
	name: string;

	/** Answers to recipe questions, keyed by question name. */
	answers?: Record<string, unknown>;

	/** Whether to auto-update when the recipe changes. */
	auto_update?: boolean;
}

/**
 * Parameters for updating a VM recipe instance.
 */
export interface VMRecipeInstanceUpdateParams {
	/** Instance name. */
	name?: string;

	/** Answers to recipe questions. */
	answers?: Record<string, unknown>;

	/** Whether to trigger an update. */
	update?: boolean;

	/** Whether to trigger verification. */
	verify?: boolean;

	/** Whether to run in simulation mode. */
	simulate?: boolean;

	/** Whether to auto-update when the recipe changes. */
	auto_update?: boolean;
}
