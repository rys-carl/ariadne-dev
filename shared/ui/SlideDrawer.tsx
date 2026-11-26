// shared/ui/SlideDrawer.tsx — full-height panel that slides in from the side
// (title, description, close ×, optional header slot, scrolling body, sticky footer).
// Spec: "Loan Details" slide drawer Figma (Templates, node 1242-1538).
// Documented at /components/slide-drawer.
//
// Same foundation as Dialog: the native <dialog> element with showModal(), so
// focus is trapped and restored, the page behind is inert, and Escape closes
// it. Page scroll is locked by the dialog rule in globals.css.
"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CircleX } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const sizes = {
	sm: "sm:max-w-md",
	md: "sm:max-w-xl",
	lg: "sm:max-w-3xl",
	xl: "sm:max-w-5xl",
	full: "sm:max-w-none",
} as const;

const sides = {
	right: "ml-auto mr-0 starting:open:translate-x-full",
	left: "mr-auto ml-0 starting:open:-translate-x-full",
} as const;

export type SlideDrawerProps = {
	open: boolean;
	/**
	 * Called on Escape, a backdrop click or the × button. Leave it out to
	 * make the drawer non-dismissable (e.g. while a save is running).
	 */
	onClose?: () => void;
	title?: ReactNode;
	description?: ReactNode;
	/** Content pinned under the title that doesn't scroll, e.g. a record summary or tabs. */
	header?: ReactNode;
	children?: ReactNode;
	/** Right-aligned action row, pinned to the bottom. */
	footer?: ReactNode;
	/** Which edge the drawer slides in from. */
	side?: keyof typeof sides;
	/** Max width on screens ≥ 640px. Below that the drawer is always full width. */
	size?: keyof typeof sizes;
	/** Hide the × button (Escape and backdrop still call onClose). */
	hideCloseButton?: boolean;
	"aria-labelledby"?: string;
	"aria-describedby"?: string;
	className?: string;
	/** Extra classes for the scrolling body. */
	bodyClassName?: string;
};

export function SlideDrawer({
	open,
	onClose,
	title,
	description,
	header,
	children,
	footer,
	side = "right",
	size = "lg",
	hideCloseButton = false,
	className,
	bodyClassName,
	...aria
}: SlideDrawerProps) {
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

	const showClose = onClose && !hideCloseButton;

	return (
		<dialog
			ref={ref}
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
				"my-0 h-dvh max-h-dvh w-full max-w-full overflow-hidden border-0 bg-surface p-0 text-text-900 shadow-2xl",
				"backdrop:bg-black/50 backdrop:transition-opacity backdrop:duration-300 starting:open:backdrop:opacity-0",
				"transition-transform duration-300 ease-out motion-reduce:transition-none",
				sides[side],
				sizes[size],
				className,
			)}
		>
			{open && (
				<div className="flex h-full flex-col">
					{(title || showClose || header) && (
						<div className="shrink-0 space-y-4 px-4 pt-5 pb-4 sm:px-6 sm:pt-6">
							{(title || showClose) && (
								<div className="flex items-start justify-between gap-4">
									<div className="min-w-0 space-y-1">
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
									{showClose && (
										<button
											type="button"
											onClick={onClose}
											aria-label="Close"
											className="-mr-1 shrink-0 cursor-pointer rounded-full p-1 text-text-700 transition-colors hover:bg-text-100 focus-visible:outline-2 focus-visible:outline-brand"
										>
											<CircleX className="size-6" strokeWidth={1.75} />
										</button>
									)}
								</div>
							)}
							{header}
						</div>
					)}
					<div
						className={cn(
							"min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6",
							!(title || showClose || header) && "pt-6",
							bodyClassName,
						)}
					>
						{children}
					</div>
					{footer && (
						<div className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-text-200 px-4 py-4 sm:px-6">
							{footer}
						</div>
					)}
				</div>
			)}
		</dialog>
	);
}
