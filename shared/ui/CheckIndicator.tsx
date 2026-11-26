// shared/ui/CheckIndicator.tsx — small check marks for completed items.
// Spec: "Check Indicator" Figma, five styles left to right:
// subtle, success, muted, solid, outline. Documented at /components/check-indicator.
import { Check, CircleCheck } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type CheckIndicatorVariant = "subtle" | "success" | "muted" | "solid" | "outline";

const variants: Record<Exclude<CheckIndicatorVariant, "outline">, string> = {
	subtle: "bg-green-100 text-brand-fg",
	success: "border-2 border-green-500 bg-green-100 text-green-600",
	muted: "border-2 border-text-400 bg-text-100 text-text-400",
	solid: "bg-brand text-white",
};

export type CheckIndicatorProps = {
	variant?: CheckIndicatorVariant;
	size?: "sm" | "md";
	/** Accessible name, e.g. "Completed". Leave out when nearby text says it. */
	label?: string;
	className?: string;
};

export function CheckIndicator({ variant = "solid", size = "md", label, className }: CheckIndicatorProps) {
	const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
	const box = size === "md" ? "size-5" : "size-4";

	if (variant === "outline") {
		return <CircleCheck {...a11y} className={cn(box, "shrink-0 text-green-500", className)} />;
	}
	return (
		<span
			{...a11y}
			className={cn("inline-flex shrink-0 items-center justify-center rounded-full", box, variants[variant], className)}
		>
			<Check strokeWidth={3} className={size === "md" ? "size-3" : "size-2.5"} />
		</span>
	);
}
