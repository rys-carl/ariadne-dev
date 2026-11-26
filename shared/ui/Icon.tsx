// shared/ui/Icon.tsx — Bakawan icon wrapper around lucide-react.
// Lucide is the enterprise icon standard; don't add another icon library.
// Documented (with a searchable browser) at /components/icons.
//
// Inside Button / IconButton, pass a bare lucide icon instead
// (leftIcon={<Plus />}); the button sizes it for you.
import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconTone = "inherit" | "default" | "muted" | "brand" | "danger" | "inverse";

/** px. md (16) matches body text and md buttons. */
export const iconSizes: Record<IconSize, number> = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 20,
	xl: 24,
};

const tones: Record<IconTone, string> = {
	inherit: "",
	default: "text-text-800",
	muted: "text-text-400",
	brand: "text-brand-fg",
	danger: "text-danger",
	inverse: "text-white",
};

export type IconProps = Omit<LucideProps, "size" | "color"> & {
	/** Any lucide-react icon component, e.g. `icon={Plus}`. */
	icon: LucideIcon;
	size?: IconSize;
	/** Color. "inherit" (default) uses the surrounding text color. */
	tone?: IconTone;
	/**
	 * Accessible name. Leave it out for decorative icons next to text
	 * (they're hidden from screen readers). Set it when the icon alone
	 * carries meaning, e.g. a status indicator.
	 */
	label?: string;
};

export function Icon({ icon: Component, size = "md", tone = "inherit", label, className, ...props }: IconProps) {
	return (
		<Component
			size={iconSizes[size]}
			className={cn("shrink-0", tones[tone], className)}
			{...(label ? { "aria-label": label, role: "img" } : {})}
			{...props}
		/>
	);
}
