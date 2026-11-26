// shared/ui/StatusBadge.tsx — business status → colored badge.
// Spec: "Status badges" Figma (21 statuses in 5 categories).
// Documented at /components/status-badge.
//
//   <StatusBadge status="Partially Paid" />   // amber
//   <StatusBadge status="Pending UM Approval" /> // amber: matches "Pending …"
import { Badge, type BadgeProps, type BadgeTone } from "./Badge";

/** The spec's status → category map. Keys are lowercase. */
export const STATUS_TONES: Readonly<Record<string, BadgeTone>> = {
	// Success
	posted: "success",
	approved: "success",
	paid: "success",
	matched: "success",
	active: "success",
	open: "success",
	// Warning
	pending: "warning",
	"for review": "warning",
	"partially paid": "warning",
	mismatch: "warning",
	// Destructive
	rejected: "danger",
	voided: "danger",
	overdue: "danger",
	cancelled: "danger",
	// Info
	scheduled: "info",
	submitted: "info",
	// Neutral
	draft: "neutral",
	inactive: "neutral",
	closed: "neutral",
	locked: "neutral",
	reversed: "neutral",
};

/**
 * Tone for a status. Exact match first, then a known status at the start
 * ("Pending UM Approval" → pending). Unknown statuses are neutral.
 */
export function statusTone(status: string): BadgeTone {
	const key = status.trim().toLowerCase();
	if (STATUS_TONES[key]) return STATUS_TONES[key];
	const prefix = Object.keys(STATUS_TONES)
		.sort((a, b) => b.length - a.length)
		.find((known) => key.startsWith(known + " "));
	return prefix ? STATUS_TONES[prefix] : "neutral";
}

export type StatusBadgeProps = Omit<BadgeProps, "children" | "tone"> & {
	status: string;
	/** Overrides the mapped tone, for statuses outside the spec. */
	tone?: BadgeTone;
};

export function StatusBadge({ status, tone, size = "md", ...props }: StatusBadgeProps) {
	return (
		<Badge tone={tone ?? statusTone(status)} size={size} {...props}>
			{status}
		</Badge>
	);
}
