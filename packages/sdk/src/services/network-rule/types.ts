import type { FlexKey, Resource } from '../../types.js';

// ─── String Literal Unions ───────────────────────────────────────────────────

/** Firewall rule action type. */
export type RuleAction = 'accept' | 'drop' | 'reject' | 'translate' | 'route' | (string & {});

/** Traffic direction for a rule. */
export type RuleDirection = 'incoming' | 'outgoing' | (string & {});

/** Network protocol for a rule. Includes numeric protocol IDs for OSPF, IGMP, GRE, ESP, AH. */
export type RuleProtocol =
	| 'tcp'
	| 'tcpudp'
	| 'udp'
	| 'icmp'
	| '89'
	| '2'
	| '47'
	| '50'
	| '51'
	| 'any'
	| (string & {});

/** Network interface for a rule. */
export type RuleInterface = 'auto' | 'router' | 'dmz' | 'wireguard' | 'any' | (string & {});

/** Rule pinning position for ordering. */
export type RulePin = 'no' | 'top' | 'bottom' | (string & {});

// ─── Resource Type ───────────────────────────────────────────────────────────

/**
 * A VergeOS network firewall rule resource.
 *
 * Rules control firewall behavior (accept/drop/reject), NAT/PAT translation,
 * and static routing on a virtual network. The `action` field determines which
 * fields are relevant — `target_ip` and `target_ports` only apply to `translate`
 * and `route` actions.
 *
 * Field names use snake_case to match the VergeOS API exactly.
 */
export interface NetworkRule extends Resource {
	/** Parent network reference (FK to `vnets`). Read-only. */
	vnet: FlexKey;

	/** Rule display name. Min 1, max 128 characters. Unique. */
	name: string;

	/** Processing order within the parent network. */
	orderid?: number;

	/** Pin position for auto-ordering. Default: `no`. */
	pin?: RulePin;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Last modification timestamp (Unix epoch). Read-only. */
	modified?: number;

	/** Whether the rule is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether trace/debug mode is enabled for this rule. Default: `false`. */
	trace?: boolean;

	/** Whether this is a system-managed rule. Read-only. */
	system_rule?: boolean;

	/** Owner reference. Read-only. */
	owner?: FlexKey;

	/** Network protocol. Default: `any`. */
	protocol?: RuleProtocol;

	/** Traffic direction. Default: `incoming`. */
	direction?: RuleDirection;

	/** Connection tracking state filter. */
	ct_state?: string;

	/** Network interface. Default: `auto`. */
	interface?: RuleInterface;

	/** Rule action type. Default: `accept`. */
	action?: RuleAction;

	/** Source IP address or CIDR filter. */
	source_ip?: string;

	/** Source port(s) or port ranges. */
	source_ports?: string;

	/** Destination IP address or CIDR filter. */
	destination_ip?: string;

	/** Destination port(s) or port ranges. */
	destination_ports?: string;

	/** Target IP for translate/route actions. */
	target_ip?: string;

	/** Target port(s) or port ranges for translate/route actions. */
	target_ports?: string;

	/** Whether to track rule hit statistics. Default: `false`. */
	statistics?: boolean;

	/** Whether to log rule matches. Default: `false`. */
	log?: boolean;

	/** Throttle expression. */
	throttle?: string;

	/** Whether to drop throttled traffic. */
	drop_throttle?: boolean;

	/** Packet count (statistics). */
	packets?: number;

	/** Byte count (statistics). */
	bytes?: number;

	/** Creator identifier. Read-only. */
	creator?: string;
}

// ─── Create Params ───────────────────────────────────────────────────────────

/**
 * Parameters for creating a new network rule.
 *
 * `vnet` and `name` are required. Read-only fields are excluded.
 */
export interface NetworkRuleCreateParams {
	/** Parent network reference (FK to `vnets`). */
	vnet: FlexKey;

	/** Rule display name. Min 1, max 128 characters. Must be unique. */
	name: string;

	/** Processing order within the parent network. */
	orderid?: number;

	/** Pin position for auto-ordering. Default: `no`. */
	pin?: RulePin;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the rule is enabled. Default: `true`. */
	enabled?: boolean;

	/** Whether trace/debug mode is enabled. Default: `false`. */
	trace?: boolean;

	/** Network protocol. Default: `any`. */
	protocol?: RuleProtocol;

	/** Traffic direction. Default: `incoming`. */
	direction?: RuleDirection;

	/** Connection tracking state filter. */
	ct_state?: string;

	/** Network interface. Default: `auto`. */
	interface?: RuleInterface;

	/** Rule action type. Default: `accept`. */
	action?: RuleAction;

	/** Source IP address or CIDR filter. */
	source_ip?: string;

	/** Source port(s) or port ranges. */
	source_ports?: string;

	/** Destination IP address or CIDR filter. */
	destination_ip?: string;

	/** Destination port(s) or port ranges. */
	destination_ports?: string;

	/** Target IP for translate/route actions. */
	target_ip?: string;

	/** Target port(s) or port ranges for translate/route actions. */
	target_ports?: string;

	/** Whether to track rule hit statistics. Default: `false`. */
	statistics?: boolean;

	/** Whether to log rule matches. Default: `false`. */
	log?: boolean;

	/** Throttle expression. */
	throttle?: string;

	/** Whether to drop throttled traffic. */
	drop_throttle?: boolean;
}

// ─── Update Params ───────────────────────────────────────────────────────────

/**
 * Parameters for updating an existing network rule.
 *
 * All fields are optional — only provided fields are changed.
 * Read-only fields (`vnet`, `modified`, `system_rule`, `owner`, `creator`) are excluded.
 */
export interface NetworkRuleUpdateParams {
	/** Rule display name. Min 1, max 128 characters. Must be unique. */
	name?: string;

	/** Processing order within the parent network. */
	orderid?: number;

	/** Pin position for auto-ordering. */
	pin?: RulePin;

	/** Human-readable description. Max 2048 characters. */
	description?: string;

	/** Whether the rule is enabled. */
	enabled?: boolean;

	/** Whether trace/debug mode is enabled. */
	trace?: boolean;

	/** Network protocol. */
	protocol?: RuleProtocol;

	/** Traffic direction. */
	direction?: RuleDirection;

	/** Connection tracking state filter. */
	ct_state?: string;

	/** Network interface. */
	interface?: RuleInterface;

	/** Rule action type. */
	action?: RuleAction;

	/** Source IP address or CIDR filter. */
	source_ip?: string;

	/** Source port(s) or port ranges. */
	source_ports?: string;

	/** Destination IP address or CIDR filter. */
	destination_ip?: string;

	/** Destination port(s) or port ranges. */
	destination_ports?: string;

	/** Target IP for translate/route actions. */
	target_ip?: string;

	/** Target port(s) or port ranges for translate/route actions. */
	target_ports?: string;

	/** Whether to track rule hit statistics. */
	statistics?: boolean;

	/** Whether to log rule matches. */
	log?: boolean;

	/** Throttle expression. */
	throttle?: string;

	/** Whether to drop throttled traffic. */
	drop_throttle?: boolean;

	/** Packet count (statistics). */
	packets?: number;

	/** Byte count (statistics). */
	bytes?: number;
}
