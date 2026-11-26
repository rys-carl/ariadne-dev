// shared/ui/Dialog.tsx — modal container (title, description, close ×, body, footer).
// Spec: "Modal Container" Figma. Documented at /components/dialog.
//
// Built on the native <dialog> element with showModal(): focus is trapped
// and restored, the rest of the page is inert, and Escape closes it, all
// handled by the browser. Page scroll is locked by a rule in globals.css.
"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CircleX } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" } as const;

export type DialogProps = {
	open: boolean;
	/**
	 * Called on Escape, a backdrop click or the × button. Leave it out to
	 * make the dialog non-dismissable (e.g. while a sync is running).
	 */
	onClose?: () => void;
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	/** Right-aligned action row. */
	footer?: ReactNode;
	size?: keyof typeof sizes;
	/** "alertdialog" for dialogs that interrupt with something urgent. */
	role?: "dialog" | "alertdialog";
	/** Hide the × button (Escape and backdrop still call onClose). */
	hideCloseButton?: boolean;
	"aria-labelledby"?: string;
	"aria-describedby"?: string;
	className?: string;
};

export function Dialog({
	open,
	onClose,
	title,
	description,
	children,
	footer,
	size = "lg",
	role = "dialog",
	hideCloseButton = false,
	className,
	...aria
}: DialogProps) {
	const ref = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const descriptionId = useId();
	const openRef = useRef(open);

	useEffect(() => {
		openRef.current = open;
		const dialog = ref.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog
			ref={ref}
			role={role}
			aria-labelledby={aria["aria-labelledby"] ?? (title ? titleId : undefined)}
			aria-describedby={aria["aria-describedby"] ?? (description ? descriptionId : undefined)}
			// Escape: let React state decide instead of the browser closing it.
			onCancel={(e) => {
				e.preventDefault();
				onClose?.();
			}}
			// The browser can still force-close (e.g. a repeated Escape). Keep the
			// element in sync with the `open` prop when that happens.
			onClose={() => {
				if (!openRef.current) return;
				if (onClose) onClose();
				else ref.current?.showModal();
			}}
			// A click whose target is the <dialog> itself landed on the backdrop.
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose?.();
			}}
			className={cn(
				"m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto overscroll-contain rounded-2xl border-0 bg-surface p-0 text-text-900 shadow-2xl",
				"backdrop:bg-black/50",
				"transition duration-150 ease-out starting:open:scale-95 starting:open:opacity-0",
				sizes[size],
				className,
			)}
		>
			{open && (
				<div className="flex flex-col gap-6 p-6 sm:p-8">
					{(title || (onClose && !hideCloseButton)) && (
						<div className="flex items-start justify-between gap-4">
							<div className="space-y-1">
								{title && (
									<h2 id={titleId} className="text-2xl font-medium tracking-tight text-text-900">
										{title}
									</h2>
								)}
								{description && (
									<p id={descriptionId} className="text-sm text-text-500">
										{description}
									</p>
								)}
							</div>
							{onClose && !hideCloseButton && (
								<button
									type="button"
									onClick={onClose}
									aria-label="Close"
									className="-mr-1 shrink-0 cursor-pointer rounded-full p-1 text-slate-700 transition-colors hover:bg-text-100 focus-visible:outline-2 focus-visible:outline-brand"
								>
									<CircleX className="size-6" strokeWidth={1.75} />
								</button>
							)}
						</div>
					)}
					{children}
					{footer && <div className="flex flex-wrap justify-end gap-3">{footer}</div>}
				</div>
			)}
		</dialog>
	);
}
