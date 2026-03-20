/**
 * Volume browser query types.
 * The volume browser supports directory listing, rename, delete, and paste (copy/move).
 */
export type VolumeBrowserQuery = 'get-dir' | 'rename' | 'delete' | 'paste';

/**
 * Volume browser job status values.
 * Jobs are async — they start as `running` and transition to `complete` or `error`.
 */
export type VolumeBrowserStatus = 'running' | 'complete' | 'error';

/** Paste operation mode: copy or move. */
export type VolumeBrowserPasteMode = 'copy' | 'move';

/**
 * A volume browser job record.
 *
 * The volume browser API is asynchronous: POST creates a job, GET polls for results.
 * Jobs use SHA1 string keys.
 *
 * **Important**: The `result` field is NOT returned by default — you must request it
 * explicitly via `?fields=id,status,result`.
 */
export interface VolumeBrowserJob {
	/** SHA1 string key. */
	$key: string;
	/** SHA1 job identifier (same as $key). */
	id: string;
	/** Volume SHA1 key being browsed. */
	volume: string;
	/** The operation type. */
	query: VolumeBrowserQuery;
	/** Query parameters (JSON). */
	params?: unknown;
	/** Job status. */
	status: VolumeBrowserStatus;
	/** Operation result (must be explicitly requested via fields param). */
	result?: unknown;
	/** Command used to execute the query (read-only). */
	command?: string;
	/** Creation timestamp in microseconds. */
	created?: number;
	/** Last modified timestamp. */
	modified?: number;
	/** Expiration timestamp. */
	expires?: number;
}

/**
 * A file or directory entry returned by a `get-dir` browse operation.
 */
export interface VolumeBrowserEntry {
	/** File or directory name. */
	name: string;
	/** Normalized name (lowercase). */
	n_name?: string;
	/** Size in bytes. */
	size: number;
	/** Modification time (Unix timestamp). */
	date: number;
	/** Entry type: `file` or `directory`. */
	type: string;
}

/**
 * Filter options for browse operations.
 */
export interface VolumeBrowserFilter {
	/** Filter by file extensions (empty for all). */
	extensions?: string;
}

/**
 * Parameters for browse operations.
 *
 * Different query types use different subsets of these fields:
 * - `get-dir`: dir, limit, offset, filter, volume, sort
 * - `rename`: dir, name, items
 * - `delete`: dir, items
 * - `paste`: dir, items, dest_dir, mode
 */
export interface VolumeBrowserParams {
	/** Directory path. Use `""` for root, NOT `"/"`. */
	dir: string;
	/** Maximum number of entries to return (get-dir). */
	limit?: number;
	/** Pagination offset (get-dir). */
	offset?: number;
	/** Filter options (get-dir). */
	filter?: VolumeBrowserFilter;
	/** Volume SHA1 key (get-dir, must match top-level volume). */
	volume?: string;
	/** Sort field (get-dir, empty for default). */
	sort?: string;
	/** New name (rename). */
	name?: string;
	/** Items to operate on (rename/delete/paste). */
	items?: string[];
	/** Destination directory (paste). */
	dest_dir?: string;
	/** Paste mode: copy or move (paste). */
	mode?: VolumeBrowserPasteMode;
}

/**
 * Request body for creating a volume browser job.
 */
export interface VolumeBrowserRequest {
	/** Volume SHA1 key to browse (required). */
	volume: string;
	/** Operation type (required). */
	query: VolumeBrowserQuery;
	/** Query-specific parameters (required). */
	params: VolumeBrowserParams;
}

/**
 * Options for browse convenience methods.
 */
export interface BrowseOptions {
	/** Maximum number of entries to return. */
	limit?: number;
	/** Pagination offset. */
	offset?: number;
	/** Filter by file extensions. */
	extensions?: string;
	/** Sort field. */
	sort?: string;
}

/**
 * Options for polling a volume browser job.
 */
export interface WaitOptions {
	/** Timeout in milliseconds. Default: 30000 (30s). */
	timeout?: number;
	/** Poll interval in milliseconds. Default: 500. */
	pollInterval?: number;
}
