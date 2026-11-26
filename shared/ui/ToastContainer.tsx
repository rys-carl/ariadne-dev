// shared/ui/ToastContainer.tsx — app-wide toasts.
// Spec: "Toast" Figma (success / info / warning / error, with a countdown bar).
// Documented at /components/toast.
//
// <ToastContainer /> is mounted once in app/layout.tsx. Anywhere in a
// Client Component:
//   const toast = useAppToast();
//   toast.success("Changes saved successfully.");
"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { toneStyles, type StatusTone } from "./tones";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
	id: number;
	type: ToastType;
	title?: string;
	message: string;
	/** ms before it dismisses. Defaults: 6000 for errors, 4000 otherwise. */
	duration?: number;
}

const TOAST_EVENT = "app-toast-event";
let nextId = 0;

const dispatchToast = (toast: Omit<ToastItem, "id">) => {
	window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: toast }));
};

const toneFor = (type: ToastType): StatusTone => (type === "error" ? "danger" : type);

function Toast({ type, title, message, duration, onClose }: ToastItem & { onClose: () => void }) {
	const [leaving, setLeaving] = useState(false);
	const style = toneStyles[toneFor(type)];
	const Icon = style.icon;

	return (
		<div
			role={type === "error" ? "alert" : "status"}
			onTransitionEnd={() => leaving && onClose()}
			className={cn(
				// Solid surface underneath: the tint (style.soft) is translucent in
				// dark mode, so without it the page would show through the toast.
				"group pointer-events-auto relative w-full overflow-hidden rounded-lg bg-surface shadow-lg ring-1 ring-black/5 transition duration-200 ease-out dark:ring-white/10",
				"starting:translate-x-4 starting:opacity-0",
				leaving && "translate-x-4 opacity-0",
			)}
		>
			<span aria-hidden className={cn("absolute inset-0", style.soft)} />
			<div className="relative flex items-start gap-2.5 py-3 pl-3.5 pr-2 text-sm">
				<Icon className={cn("mt-0.5 size-4 shrink-0", style.fg)} aria-hidden />
				<div className={cn("min-w-0 flex-1", style.text)}>
					{title && <p className="font-semibold">{title}</p>}
					<p>{message}</p>
				</div>
				<button
					type="button"
					onClick={() => setLeaving(true)}
					aria-label="Dismiss notification"
					className={cn("shrink-0 cursor-pointer rounded p-0.5 opacity-60 transition-opacity hover:opacity-100", style.text)}
				>
					<X className="size-4" />
				</button>
			</div>
			{/* Countdown bar. Its animationend dismisses the toast; hovering or
			    focusing the toast pauses it. */}
			<span
				aria-hidden
				onAnimationEnd={() => setLeaving(true)}
				style={{ animationDuration: `${duration ?? (type === "error" ? 6000 : 4000)}ms` }}
				className={cn(
					"absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[toast-timer_linear_forwards]",
					"group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
					style.solid,
				)}
			/>
		</div>
	);
}

export function ToastContainer() {
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleAddToast = (e: Event) => {
			const detail = (e as CustomEvent<Omit<ToastItem, "id">>).detail;
			setToasts((prev) => [...prev, { ...detail, id: ++nextId }]);
		};
		window.addEventListener(TOAST_EVENT, handleAddToast);
		return () => window.removeEventListener(TOAST_EVENT, handleAddToast);
	}, []);

	// The container is a popover so it renders in the browser's top layer,
	// above any open modal <dialog> (z-index can't do that). Re-showing it
	// moves it to the top of that layer when a newer dialog is open.
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (el.matches(":popover-open")) el.hidePopover();
		if (toasts.length > 0) el.showPopover();
	}, [toasts.length]);

	return (
		<div
			ref={ref}
			popover="manual"
			aria-label="Notifications"
			className="pointer-events-none fixed inset-auto right-4 top-4 m-0 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2 overflow-visible border-0 bg-transparent p-0 sm:right-6 sm:top-6"
		>
			{toasts.map((t) => (
				<Toast key={t.id} {...t} onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
			))}
		</div>
	);
}

export function useAppToast() {
	const toast = (type: ToastType) => (message: string, title?: string, duration?: number) => {
		dispatchToast({ type, title, message, duration });
	};

	return {
		success: toast("success"),
		error: toast("error"),
		warning: toast("warning"),
		info: toast("info"),
	};
}
