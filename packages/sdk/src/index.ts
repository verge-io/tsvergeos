// ─── Curated Core Service Registrations (side-effect imports) ────────────────
// Importing 'tsvergeos' registers the ~40 most-used services on VergeClient.
// For all ~84 services, use 'tsvergeos/full' instead.
import './services/vm/index.js';
import './services/network/index.js';
import './services/machine-drive/index.js';
import './services/machine-device/index.js';
import './services/machine-nic/index.js';
import './services/machine-snapshot/index.js';
import './services/network-address/index.js';
import './services/network-rule/index.js';
import './services/network-rule-alias/index.js';
import './services/network-dns-view/index.js';
import './services/network-dns-zone/index.js';
import './services/network-dns-record/index.js';
import './services/network-host/index.js';
import './services/wireguard/index.js';
import './services/wireguard-peer/index.js';
import './services/wireguard-peer-status/index.js';
import './services/ipsec/index.js';
import './services/ipsec-phase1/index.js';
import './services/ipsec-phase2/index.js';
import './services/ipsec-connection/index.js';
import './services/machine-stats/index.js';
import './services/machine-stats-history-short/index.js';
import './services/machine-stats-history-long/index.js';
import './services/machine-status/index.js';
import './services/machine-drive-stats/index.js';
import './services/machine-nic-stats/index.js';
import './services/machine-nic-stats-history-short/index.js';
import './services/machine-nic-stats-history-long/index.js';
import './services/machine-drive-phys/index.js';
import './services/vnet-monitor-stats-history-short/index.js';
import './services/vnet-monitor-stats-history-long/index.js';
import './services/volume/index.js';
import './services/volume-cifs-share/index.js';
import './services/volume-nfs-share/index.js';
import './services/volume-snapshot/index.js';
import './services/volume-sync/index.js';
import './services/nas-service/index.js';
import './services/nas-service-user/index.js';
import './services/volume-browser/index.js';
import './services/file/index.js';
import './services/storage-tier/index.js';
import './services/storage-tier-stats/index.js';
import './services/cluster-tier/index.js';
import './services/cluster-tier-stats/index.js';
import './services/cluster-tier-status/index.js';
import './services/tenant-stats-history-short/index.js';
import './services/tenant-stats-history-long/index.js';
import './services/machine-log/index.js';

export { VergeClient } from './client.js';
export {
	API_BASE_PATH,
	API_VERSION,
	DEFAULT_PAGE_SIZE,
	DEFAULT_RETRIES,
	DEFAULT_RETRY_BACKOFF,
	DEFAULT_TIMEOUT,
	ENV_PREFIX,
	MAX_PAGE_SIZE,
	MIN_MAJOR_VERSION,
	SDK_VERSION,
	TASK_POLL_INTERVAL,
	TASK_WAIT_TIMEOUT,
	UPLOAD_CHUNK_SIZE,
} from './constants.js';
export type {
	CrossSiteResult,
	CrossSiteServices,
	SiteResource,
} from './cross-site.js';
export { CrossSiteReadProxy } from './cross-site.js';
export {
	ApiError,
	AuthError,
	ConflictError,
	isApiError,
	isAuthError,
	isConflictError,
	isNotFoundError,
	isSiteError,
	isTaskError,
	isTaskTimeoutError,
	isUnsupportedVersionError,
	isValidationError,
	isVergeError,
	NotFoundError,
	SiteError,
	TaskError,
	TaskTimeoutError,
	UnsupportedVersionError,
	ValidationError,
	VergeError,
} from './errors.js';
export type {
	BuildFilterValue,
	FilterValue,
	OperatorObject,
} from './filter.js';
export { buildFilter, Filter, quoteFilterString } from './filter.js';
export { HttpClient } from './http.js';
export type { ActionConfig } from './services/base.js';
export {
	BaseService,
	ReadOnlyService,
	WritableService,
} from './services/base.js';
export type {
	SiteConfig,
	SiteManagerOptions,
	SiteStatus,
} from './site-manager.js';
export { SiteManager } from './site-manager.js';
export type {
	ApiResponse,
	ClientConfig,
	FlexKey,
	ListAllOptions,
	ListOptions,
	MutationOptions,
	Resource,
} from './types.js';
