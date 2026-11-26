// shared/ui/Badge.tsx — small status pill ("Done", "Notified", "Upcoming").
// Spec: "Status badges" Figma (5 categories) and the Timeline pills.
// For named business statuses ("Paid", "Overdue"…) use StatusBadge, which
// picks the tone for you. Documented at /components/badge.
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

// 50 background + 700 text, sampled from the spec; all pass WCAG AA.
const tones: Record<BadgeTone, string> = {
	neutral: "bg-gray-100 text-gray-700",
	success: "bg-green-50 text-green-700",
	warning: "bg-amber-50 text-amber-700",
	danger: "bg-red-50 text-red-700",
	info: "bg-blue-50 text-blue-700",
};

// "tag" = rectangular with a border, as in the header's "Status: Closed".
const borders: Record<BadgeTone, string> = {
	neutral: "border-gray-200",
	success: "border-green-200",
	warning: "border-amber-200",
	danger: "border-red-200",
	info: "border-blue-200",
};

const sizes = {
	sm: "px-2 py-0.5 text-xs leading-5",
	md: "px-2.5 py-1 text-sm leading-5",
};

export type BadgeProps = {
	tone?: BadgeTone;
	size?: keyof typeof sizes;
	/** "pill" (rounded, default) or "tag" (rectangular with a border). */
	shape?: "pill" | "tag";
	children: ReactNode;
	className?: string;
};

export function Badge({ tone = "neutral", size = "sm", shape = "pill", children, className }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center whitespace-nowrap font-medium",
				shape === "tag" ? cn("rounded-md border", borders[tone]) : "rounded-full",
				sizes[size],
				tones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}
