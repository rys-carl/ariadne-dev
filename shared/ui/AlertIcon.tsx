// shared/ui/AlertIcon.tsx — tinted icon tile used at the top of dialogs.
// Spec: "Alert Icon" Figma (warning / danger / success / info).
// Documented at /components/alert-icon.
import { LoaderCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { toneStyles, type StatusTone } from "./tones";

export type AlertIconProps = {
	tone?: StatusTone;
	/** Replaces the tone's default icon, e.g. Timer or ShieldAlert. */
	icon?: LucideIcon;
	/** Shows a spinner instead of an icon, for "in progress" dialogs. */
	loading?: boolean;
	size?: "md" | "lg";
	className?: string;
};

export function AlertIcon({ tone = "info", icon, loading = false, size = "lg", className }: AlertIconProps) {
	const style = toneStyles[tone];
	const Icon = loading ? LoaderCircle : (icon ?? style.icon);
	return (
		<span
			aria-hidden
			className={cn(
				"inline-flex shrink-0 items-center justify-center",
				size === "lg" ? "size-12 rounded-2xl [&_svg]:size-6" : "size-9 rounded-xl [&_svg]:size-5",
				style.soft,
				style.fg,
				className,
			)}
		>
			<Icon className={loading ? "animate-spin" : undefined} />
		</span>
	);
}
