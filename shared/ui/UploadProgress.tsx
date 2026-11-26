// shared/ui/UploadProgress.tsx — floating card for batch upload status.
// Spec: "Upload Progress Card" Figma (in progress / complete / failed, in a
// full card and a minimized chip). Documented at /components/upload-progress.
//
// Presentational: you own the upload and pass progress in. The ⤡ button
// switches between the full card and the minimized chip; the chevron
// collapses the details.
"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, CircleX, FileText, Maximize2, Minimize2, RefreshCw, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type UploadStatus = "uploading" | "complete" | "failed";

const STATUS = {
	uploading: {
		header: "Upload in progress",
		title: "Batch File Uploading",
		short: "Uploading...",
		bar: "bg-amber-600",
		caption: "text-amber-700",
		tile: "bg-blue-50 text-blue-950",
	},
	complete: {
		header: "Upload complete",
		title: "Batch Upload Complete",
		short: "Upload complete",
		bar: "bg-green-600",
		caption: "text-green-700",
		tile: "bg-green-50 text-green-900",
	},
	failed: {
		header: "Upload failed",
		title: "Batch Upload Failed",
		short: "Upload failed",
		bar: "bg-red-600",
		caption: "text-amber-700",
		tile: "bg-red-50 text-red-900",
	},
} as const;

export type UploadProgressProps = {
	status: UploadStatus;
	/** 0–100. */
	progress: number;
	totalFiles: number;
	/** Files uploaded so far. */
	uploadedFiles: number;
	failedFiles?: number;
	/** e.g. "about 2 min left". */
	timeRemaining?: string;
	/** Overrides the default title for the status. */
	title?: ReactNode;
	onCancel?: () => void;
	onRetry?: () => void;
	onClose?: () => void;
	/** Controlled minimized state. */
	minimized?: boolean;
	defaultMinimized?: boolean;
	onMinimizedChange?: (minimized: boolean) => void;
	className?: string;
};

function IconAction({ label, onClick, children }: { label: string; onClick?: () => void; children: ReactNode }) {
	return (
		<button
			type="button"
			aria-label={label}
			title={label}
			onClick={onClick}
			className="flex size-6 cursor-pointer items-center justify-center rounded text-text-700 transition-colors hover:bg-text-200/60 focus-visible:outline-2 focus-visible:outline-brand [&_svg]:size-4"
		>
			{children}
		</button>
	);
}

function ProgressBar({ value, className, label }: { value: number; className: string; label: string }) {
	return (
		<div
			role="progressbar"
			aria-label={label}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(value)}
			className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
		>
			<div className={cn("h-full rounded-full transition-[width] duration-300", className)} style={{ width: `${value}%` }} />
		</div>
	);
}

export function UploadProgress({
	status,
	progress,
	totalFiles,
	uploadedFiles,
	failedFiles = 0,
	timeRemaining,
	title,
	onCancel,
	onRetry,
	onClose,
	minimized: minimizedProp,
	defaultMinimized = false,
	onMinimizedChange,
	className,
}: UploadProgressProps) {
	const [innerMinimized, setInnerMinimized] = useState(defaultMinimized);
	const [collapsed, setCollapsed] = useState(false);
	const minimized = minimizedProp ?? innerMinimized;
	const s = STATUS[status];
	const pct = Math.max(0, Math.min(100, progress));

	const setMinimized = (next: boolean) => {
		if (minimizedProp === undefined) setInnerMinimized(next);
		onMinimizedChange?.(next);
	};

	const caption =
		status === "uploading" ? `${Math.round(pct)}% uploaded` : status === "complete" ? "100% uploaded" : `Upload stopped at ${Math.round(pct)}%`;
	const meta = [
		`${uploadedFiles} of ${totalFiles} files`,
		status === "uploading" ? timeRemaining : status === "complete" ? "Done" : failedFiles ? `${failedFiles} failed` : undefined,
	]
		.filter(Boolean)
		.join(" · ");
	const fileWord = totalFiles === 1 ? "file" : "files";

	const tile = (size: string) => (
		<span className={cn("flex shrink-0 items-center justify-center rounded-lg", size, s.tile)}>
			<FileText className="size-4" aria-hidden />
		</span>
	);

	if (minimized) {
		return (
			<section aria-label={s.header} className={cn("w-60 rounded-lg border border-text-100 bg-surface p-2.5 shadow-md", className)}>
				<div className="flex items-center gap-2.5">
					{tile("size-8")}
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium leading-5 text-text-900">
							{totalFiles} {fileWord}
						</p>
						<p className="truncate text-xs text-text-500" aria-live="polite">
							{s.short}
						</p>
					</div>
					<IconAction label="Expand" onClick={() => setMinimized(false)}>
						<Maximize2 />
					</IconAction>
					<IconAction label={collapsed ? "Show progress" : "Hide progress"} onClick={() => setCollapsed((c) => !c)}>
						{collapsed ? <ChevronUp /> : <ChevronDown />}
					</IconAction>
					{onClose && (
						<IconAction label="Close" onClick={onClose}>
							<X />
						</IconAction>
					)}
				</div>
				{!collapsed && (
					<div className="mt-2.5">
						<ProgressBar value={status === "complete" ? 100 : pct} className={s.bar} label={s.header} />
					</div>
				)}
			</section>
		);
	}

	return (
		<section
			aria-label={s.header}
			className={cn("w-full max-w-lg overflow-hidden rounded-lg border border-text-100 bg-surface shadow-md", className)}
		>
			<header className="flex items-center gap-1 bg-text-50 py-2 pl-3.5 pr-2">
				<p className="flex-1 text-xs font-medium text-text-800">{s.header}</p>
				<IconAction label="Minimize" onClick={() => setMinimized(true)}>
					<Minimize2 />
				</IconAction>
				<IconAction label={collapsed ? "Show details" : "Hide details"} onClick={() => setCollapsed((c) => !c)}>
					{collapsed ? <ChevronDown /> : <ChevronUp />}
				</IconAction>
				{onClose && (
					<IconAction label="Close" onClick={onClose}>
						<X />
					</IconAction>
				)}
			</header>
			{!collapsed && (
				<div className="flex gap-3.5 p-3.5 pb-5">
					{tile("size-10")}
					<div className="min-w-0 flex-1 space-y-2">
						<div className="flex items-center gap-3">
							<p className="flex-1 truncate text-base font-semibold text-text-900">{title ?? s.title}</p>
							{status === "uploading" && onCancel && (
								<IconAction label="Cancel upload" onClick={onCancel}>
									<CircleX />
								</IconAction>
							)}
							{status === "failed" && onRetry && (
								<IconAction label="Retry upload" onClick={onRetry}>
									<RefreshCw />
								</IconAction>
							)}
						</div>
						<ProgressBar value={status === "complete" ? 100 : pct} className={s.bar} label={s.header} />
						<div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs" aria-live="polite">
							<span className={cn("font-medium", s.caption)}>{caption}</span>
							<span className="text-text-500">{meta}</span>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
