// shared/ui/EmptyState.tsx — illustration + message when there's nothing to show.
// Spec: "Empty state" Figma (orbiting document icons, "No data to display").
// Documented at /components/empty-state.
import type { ReactNode } from "react";
import { File, FileText, Folder, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

// Small icons scattered on the rings: [icon, left %, top %, size class].
const ORBIT: [LucideIcon, number, number, string][] = [
	[Folder, 18, 14, "size-2.5"],
	[File, 78, 12, "size-3"],
	[File, 30, 30, "size-3"],
	[FileText, 72, 31, "size-3"],
	[FileText, 94, 41, "size-2.5"],
	[Folder, 30, 58, "size-3.5"],
	[Folder, 86, 60, "size-3.5"],
	[FileText, 8, 70, "size-2.5"],
];

export type EmptyStateProps = {
	title?: ReactNode;
	description?: ReactNode;
	/** Center icon. Defaults to a document. */
	icon?: LucideIcon;
	/** Optional button, e.g. "Clear filters". */
	action?: ReactNode;
	className?: string;
};

export function EmptyState({
	title = "No data to display",
	description = "Try adjusting your filters, or contact your admin.",
	icon: Icon = FileText,
	action,
	className,
}: EmptyStateProps) {
	return (
		<div className={cn("flex flex-col items-center px-4 py-6 text-center", className)}>
			<div aria-hidden className="relative size-48">
				{[0, 14, 28].map((inset) => (
					<span
						key={inset}
						className="absolute rounded-full border border-slate-100"
						style={{ inset: `${inset}%` }}
					/>
				))}
				{ORBIT.map(([OrbitIcon, left, top, size], i) => (
					<OrbitIcon
						key={i}
						className={cn("absolute -translate-x-1/2 -translate-y-1/2 text-brand-fg", size)}
						style={{ left: `${left}%`, top: `${top}%` }}
					/>
				))}
				<span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-brand text-white shadow-[0_0_0_10px_var(--color-brand-subtle)]">
					<Icon className="size-5" />
				</span>
			</div>
			<p className="mt-2 text-base font-medium text-text-900">{title}</p>
			{description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
			{action && <div className="mt-4">{action}</div>}
		</div>
	);
}
