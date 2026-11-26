// shared/ui/tones.ts — status colors shared by AlertIcon, Callout, Toast,
// Badge, ConfirmDialog and UploadProgress, so "warning" is the same amber
// everywhere. Values sampled from the design system Figma; they map exactly
// to Tailwind's amber / red / green / blue scales.
import { CircleAlert, CircleCheck, Info, type LucideIcon } from "lucide-react";

export type StatusTone = "warning" | "danger" | "success" | "info";

export const toneStyles: Record<
	StatusTone,
	{
		/** Icon / accent color (600). */
		fg: string;
		/** Text on soft/subtle backgrounds (700): 600 fails WCAG AA contrast there. */
		text: string;
		/** Tile and toast background. */
		soft: string;
		/** Notice box background (lighter). */
		subtle: string;
		/** Solid fill for progress bars. */
		solid: string;
		icon: LucideIcon;
	}
> = {
	warning: { fg: "text-amber-600", text: "text-amber-700", soft: "bg-amber-100", subtle: "bg-amber-50", solid: "bg-amber-600", icon: CircleAlert },
	danger: { fg: "text-red-600", text: "text-red-700", soft: "bg-red-100", subtle: "bg-red-50", solid: "bg-red-600", icon: CircleAlert },
	success: { fg: "text-green-600", text: "text-green-700", soft: "bg-green-100", subtle: "bg-green-50", solid: "bg-green-600", icon: CircleCheck },
	info: { fg: "text-blue-600", text: "text-blue-700", soft: "bg-blue-100", subtle: "bg-blue-50", solid: "bg-blue-600", icon: Info },
};
