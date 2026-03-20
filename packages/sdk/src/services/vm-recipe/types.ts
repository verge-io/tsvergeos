import type { FlexKey, Resource } from '../../types.js';

// ─── Shared Recipe Types ────────────────────────────────────────────────────
// These types are shared between VM and tenant recipe services.
// They are defined here and re-exported from the tenant-recipe module.

/**
 * Valid question types for recipe questions.
 *
 * These are the exact string values used by the VergeOS API.
 */
export type RecipeQuestionType =
	| 'bool'
	| 'cluster'
	| 'database_create'
	| 'database_edit'
	| 'field'
	| 'database_find'
	| 'timestamp'
	| 'disksize'
	| 'hidden'
	| 'hostname'
	| 'list'
	| 'network'
	| 'num'
	| 'password'
	| 'ram'
	| 'row'
	| 'script'
	| 'seconds'
	| 'string'
	| 'textarea'
	| 'virtualip';

/**
 * Post-processing transformation applied to question values.
 */
export type RecipeQuestionPostprocess =
	| 'none'
	| 'lowercase'
	| 'uppercase'
	| 'crypt-des'
	| 'crypt-md5'
	| 'crypt-sha256'
	| 'crypt-sha512'
	| 'trim'
	| 'base64'
	| 'hex'
	| 'escape';

/**
 * Database context for database-type recipe questions.
 */
export type RecipeDatabaseContext = 'local' | 'tenant';

/**
 * A recipe question resource.
 *
 * Questions define the input fields shown when deploying a recipe.
 * They are shared between VM and tenant recipes via a generic
 * `recipe` FK reference string (e.g., `"vm_recipes/{key}"`).
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface RecipeQuestion extends Resource {
	/** Parent recipe reference (e.g., `"vm_recipes/{key}"`). Read-only. */
	recipe?: string;

	/** Parent section (FK to `recipe_sections`). */
	section?: FlexKey;

	/** Question identifier name. 1–64 chars, unique within recipe. */
	name: string;

	/** Display order within section. */
	orderid?: number;

	/** Display label shown in UI. */
	display?: string;

	/** Placeholder hint text. */
	hint?: string;

	/** Tooltip help text. */
	help?: string;

	/** Note text. */
	note?: string;

	/** Question input type. */
	type: RecipeQuestionType;

	/** Database context for database-type questions. Default: `"tenant"`. */
	database_context?: RecipeDatabaseContext;

	/** Default value. */
	default?: string;

	/** Database table name (for database-type questions). */
	table?: string;

	/** Database filter expression. */
	filter?: string;

	/** Database fields list. */
	fields?: string;

	/** Regex validation pattern. */
	regex?: string;

	/** Whether the question requires an answer. */
	required?: boolean;

	/** Minimum value. */
	min?: number;

	/** Maximum value. */
	max?: number;

	/** Normalization value. */
	normalize?: number;

	/** Post-processing transformation. Default: `"none"`. */
	postprocess_string?: RecipeQuestionPostprocess;

	/** List of options (for list-type questions). */
	list?: unknown;

	/** Whether the question is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether to hide the "none" option. Default: `false`. */
	hide_none?: boolean;

	/** Whether the question is read-only. Default: `false`. */
	readonly?: boolean;

	/** Whether to skip storing the answer. Default: `false`. */
	dont_store?: boolean;

	/** Whether this is a system question. Default: `false`. */
	system?: boolean;

	/** Whether this uses the system default. */
	system_default?: boolean;

	/** Visibility conditions (JSON array). */
	conditions?: unknown;

	/** On-change handler configuration. */
	on_change?: unknown;

	/** Autocomplete hint. */
	autocomplete?: string;

	/** Last modification timestamp. Read-only. */
	modified?: number;
}

/**
 * A recipe section resource.
 *
 * Sections group questions together in the recipe deployment form.
 * They are shared between VM and tenant recipes via a generic
 * `recipe` FK reference string.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface RecipeSection extends Resource {
	/** Parent recipe reference (e.g., `"vm_recipes/{key}"`). Read-only. */
	recipe?: string;

	/** Display order. */
	orderid?: number;

	/** Section name. 1–128 chars, unique within recipe. */
	name: string;

	/** Section description. 0–2048 chars. */
	description?: string;
}

// ─── VM Recipe Types ────────────────────────────────────────────────────────

/**
 * Valid actions for VM recipe `_actions` endpoint.
 */
export type VMRecipeAction = 'clone' | 'download' | 'remove' | 'republish';

/**
 * A VergeOS VM recipe resource.
 *
 * VM recipes are marketplace templates for deploying virtual machines.
 * They are managed by the catalog system — create is not supported via
 * the SDK. Supports list, get, update, and delete operations.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface VMRecipe extends Resource {
	/** 40-character hex string identifier. Read-only. */
	id?: string;

	/** Recipe name. 1–128 chars. */
	name: string;

	/** Recipe icon identifier. */
	icon?: string;

	/** Recipe description. 0–2048 chars. */
	description?: string;

	/** Parent catalog (FK to `catalogs`). */
	catalog?: FlexKey;

	/** Recipe status (FK to `recipe_status`). Read-only. */
	status?: FlexKey;

	/** Associated VM snapshot (FK to `vms`). */
	vm_snapshot?: FlexKey;

	/** Associated VM (FK to `vms`). */
	vm?: FlexKey;

	/** Whether the recipe has been downloaded. Default: `false`. */
	downloaded?: boolean;

	/** Whether an update is available. Default: `false`. */
	update_available?: boolean;

	/** Whether the recipe needs republishing. Default: `false`. */
	needs_republish?: boolean;

	/** Recipe version string. Default: `"1.0.0"`. */
	version?: string;

	/** Recipe build number. Default: `0`. */
	build?: number;

	/** Recipe dependencies. */
	dependencies?: string;

	/** Total size in bytes. Default: `0`. */
	size?: number;

	/** Recipe assets (JSON). */
	assets?: unknown;

	/** Whether the recipe has question assets. Default: `false`. */
	question_assets?: boolean;

	/** Recipe creator. Read-only. */
	creator?: string;
}

/**
 * Parameters for updating an existing VM recipe.
 */
export interface VMRecipeUpdateParams {
	/** Recipe name. */
	name?: string;

	/** Recipe icon identifier. */
	icon?: string;

	/** Recipe description. */
	description?: string;

	/** Associated VM snapshot (FK to `vms`). */
	vm_snapshot?: FlexKey;

	/** Associated VM (FK to `vms`). */
	vm?: FlexKey;

	/** Recipe version string. */
	version?: string;
}

/**
 * Options for deploying a VM recipe instance.
 */
export interface VMRecipeDeployOptions {
	/** Name for the deployed instance. */
	name: string;

	/** Answers to recipe questions, keyed by question name. */
	answers?: Record<string, unknown>;

	/** Whether to auto-update the instance when the recipe changes. */
	auto_update?: boolean;
}
