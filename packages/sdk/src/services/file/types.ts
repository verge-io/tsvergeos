import type { FlexKey, Resource } from '../../types.js';

/**
 * File type enum values supported by VergeOS.
 */
export type VgFileType =
	| 'iso'
	| 'img'
	| 'qcow'
	| 'qcow2'
	| 'qed'
	| 'raw'
	| 'vdi'
	| 'vhd'
	| 'vhdx'
	| 'vmdk'
	| 'ova'
	| 'ovf'
	| 'vmx'
	| '9p'
	| 'dir'
	| 'png'
	| 'jpg'
	| 'svg'
	| 'webp'
	| 'ybvm'
	| 'nvram'
	| 'unknown'
	| 'ico'
	| 'diagnostics'
	| 'zip'
	| 'lrq'
	| 'run';

/**
 * Preferred storage tier values (1-5).
 */
export type FilePreferredTier = '1' | '2' | '3' | '4' | '5';

/**
 * A file resource in VergeOS.
 *
 * Uses `VgFile` to avoid collision with the global `File` type.
 * Represents file metadata (name, type, size, etc.). Actual file
 * content is uploaded/downloaded via separate methods.
 */
export interface VgFile extends Resource {
	/** Unique file identifier. */
	$key: FlexKey;
	/** File name. */
	name: string;
	/** File description. */
	description?: string;
	/** File type (iso, img, qcow2, etc.). */
	type?: VgFileType;
	/** Owning machine drive ID (FK to machine_drives). */
	owner?: FlexKey;
	/** Allocated size in bytes. */
	allocated_bytes?: number;
	/** Actual size on disk in bytes. */
	used_bytes?: number;
	/** Logical file size in bytes. */
	filesize?: number;
	/** Last modified timestamp (Unix epoch). */
	modified?: number;
	/** Used percentage (read-only). */
	used_pct?: number;
	/** Preferred storage tier (1-5). */
	preferred_tier?: FilePreferredTier;
	/** Source URL if imported from URL (read-only). */
	url?: string;
	/** Public link FK (FK to files_public_links). */
	public_link?: FlexKey;
	/** Username that created this file (read-only). */
	creator?: string;
	/** Skip upload head check flag. */
	skip_upload_head_check?: boolean;
}

/**
 * Parameters for creating a new file entry in VergeOS.
 *
 * After creating the entry, use {@link FileService.upload} to upload content.
 * If `url` is provided, VergeOS will import the file from that URL automatically.
 */
export interface VgFileCreateParams {
	/** File name (required). */
	name: string;
	/** File description. */
	description?: string;
	/** File type. */
	type?: VgFileType;
	/** Expected file size in bytes (required for uploads). */
	allocated_bytes?: number;
	/** Preferred storage tier (1-5). */
	preferred_tier?: FilePreferredTier;
	/** Source URL to import the file from. */
	url?: string;
}

/**
 * Parameters for updating a file's metadata.
 */
export interface VgFileUpdateParams {
	/** Updated file name. */
	name?: string;
	/** Updated description. */
	description?: string;
	/** Updated preferred storage tier. */
	preferred_tier?: FilePreferredTier;
}

/**
 * Options for file upload operations.
 */
export interface FileUploadOptions {
	/** Chunk size in bytes for upload. Defaults to {@link DEFAULT_CHUNK_SIZE} (256KB). */
	chunkSize?: number;
}
