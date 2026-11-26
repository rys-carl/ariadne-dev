// shared/ui/AlertDialog.tsx — centered status dialog: icon, title, message, actions.
// Spec: "Alert Dialog" Figma (Syncing data, Session timed out, Service
// timeout, Can't Upload File). Documented at /components/alert-dialog.
// For "are you sure?" decisions use ConfirmDialog, which builds on this.
"use client";

import { useId, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertIcon } from "./AlertIcon";
import { Dialog } from "./Dialog";
import type { StatusTone } from "./tones";

export type AlertDialogProps = {
	open: boolean;
	/** Escape / backdrop. Leave out to force the user to pick an action. */
	onClose?: () => void;
	tone?: StatusTone;
	/** Replaces the tone's default icon. */
	icon?: LucideIcon;
	/** Spinner icon, for work in progress. */
	loading?: boolean;
	title: ReactNode;
	description?: ReactNode;
	/** Extra content between the message and the actions (details, notices, inputs). */
	children?: ReactNode;
	/** Buttons. They stretch to share the full width equally. */
	actions?: ReactNode;
};

export function AlertDialog({
	open,
	onClose,
	tone = "info",
	icon,
	loading,
	title,
	description,
	children,
	actions,
}: AlertDialogProps) {
	const titleId = useId();
	const descriptionId = useId();

	return (
		<Dialog
			open={open}
			onClose={onClose}
			size="sm"
			role="alertdialog"
			hideCloseButton
			aria-labelledby={titleId}
			aria-describedby={description ? descriptionId : undefined}
		>
			<div className="flex flex-col items-center gap-3 text-center">
				<AlertIcon tone={tone} icon={icon} loading={loading} />
				<h2 id={titleId} className="mt-2 text-xl font-bold tracking-tight text-slate-900">
					{title}
				</h2>
				{description && (
					<p id={descriptionId} className="text-sm leading-6 text-slate-500">
						{description}
					</p>
				)}
			</div>
			{children && <div className="flex flex-col gap-4">{children}</div>}
			{/* Buttons share the row equally: one button is full width, two split it 50/50. */}
			{actions && <div className="flex gap-3 *:min-w-0 *:flex-1">{actions}</div>}
		</Dialog>
	);
}
