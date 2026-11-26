// shared/ui/NotificationBell.tsx — bell button with an unread dot.
// Spec: the bell in the "Meta Bar" and "Header" Figma.
// Documented at /components/header.
import type { ComponentProps } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type NotificationBellProps = Omit<ComponentProps<"button">, "children"> & {
	/** Unread count. Shows a red dot when above 0. */
	unread?: number;
};

export function NotificationBell({ unread = 0, className, type = "button", ...props }: NotificationBellProps) {
	const label = unread > 0 ? `Notifications, ${unread} unread` : "Notifications";
	return (
		<button
			type={type}
			aria-label={label}
			title={label}
			className={cn(
				"relative inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-900 transition-colors hover:bg-text-100 focus-visible:outline-2 focus-visible:outline-brand",
				className,
			)}
			{...props}
		>
			<Bell className="size-5" aria-hidden />
			{unread > 0 && (
				<span aria-hidden className="absolute right-2 top-1.5 size-2 rounded-full bg-red-600 ring-2 ring-surface" />
			)}
		</button>
	);
}
