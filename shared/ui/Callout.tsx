// shared/ui/Callout.tsx — tinted notice box for consequences and context,
// e.g. "This action cannot be undone." inside a ConfirmDialog.
// Spec: the notice boxes in the "Confirmation Dialog" Figma.
// Documented at /components/callout.
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { toneStyles, type StatusTone } from "./tones";

export type CalloutProps = {
	tone?: StatusTone;
	children: ReactNode;
	className?: string;
};

export function Callout({ tone = "info", children, className }: CalloutProps) {
	const style = toneStyles[tone];
	return (
		<div className={cn("rounded-lg px-3 py-2.5 text-xs leading-5", style.subtle, style.text, className)}>{children}</div>
	);
}
