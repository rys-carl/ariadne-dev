// shared/ui/Pagination.tsx — page size, record range and page buttons.
// Spec: "Pagination" Figma. Documented at /components/pagination.
//
// Controlled: you own `page` and `pageSize`. Changing the page size also
// calls onPageChange(1), so the user never lands on a page that no longer exists.
"use client";

import { useId } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type PageItem = number | "ellipsis";

/**
 * Page numbers to show: first, last, the current page with `siblings` on
 * each side, and ellipses for the gaps. Always the same length once there
 * are enough pages, so the control doesn't jump around.
 */
export function getPageItems(page: number, pageCount: number, siblings = 1): PageItem[] {
	const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
	const slots = siblings * 2 + 5;
	if (pageCount <= slots) return range(1, pageCount);

	const left = Math.max(page - siblings, 1);
	const right = Math.min(page + siblings, pageCount);
	const leftGap = left > 3;
	const rightGap = right < pageCount - 2;

	if (!leftGap) return [...range(1, 3 + siblings * 2), "ellipsis", pageCount];
	if (!rightGap) return [1, "ellipsis", ...range(pageCount - (2 + siblings * 2), pageCount)];
	return [1, "ellipsis", ...range(left, right), "ellipsis", pageCount];
}

export type PaginationProps = {
	/** Current page, 1-based. */
	page: number;
	pageSize: number;
	/** Total number of records. 0 shows "No data to display". */
	total: number;
	onPageChange: (page: number) => void;
	/** Leave out to hide the page size picker. */
	onPageSizeChange?: (pageSize: number) => void;
	pageSizeOptions?: number[];
	/** Pages shown on each side of the current one. */
	siblings?: number;
	className?: string;
};

const arrow =
	"flex size-8 cursor-pointer items-center justify-center rounded-md text-brand-fg transition-colors hover:bg-brand-subtle disabled:cursor-not-allowed disabled:text-text-300 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-brand [&_svg]:size-4";

export function Pagination({
	page,
	pageSize,
	total,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 50, 100],
	siblings = 1,
	className,
}: PaginationProps) {
	const selectId = useId();

	if (total <= 0) {
		return <p className={cn("text-sm italic text-neutral-400", className)}>No data to display</p>;
	}

	const pageCount = Math.max(1, Math.ceil(total / pageSize));
	const current = Math.min(Math.max(1, page), pageCount);
	const from = (current - 1) * pageSize + 1;
	const to = Math.min(current * pageSize, total);
	const go = (p: number) => {
		const next = Math.min(Math.max(1, p), pageCount);
		if (next !== current) onPageChange(next);
	};
	const options = pageSizeOptions.includes(pageSize) ? pageSizeOptions : [...pageSizeOptions, pageSize].sort((a, b) => a - b);

	return (
		<div className={cn("flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm", className)}>
			<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
				{onPageSizeChange && (
					<div className="flex items-center gap-2">
						<label htmlFor={selectId} className="text-neutral-700">
							Items:
						</label>
						<span className="relative">
							<select
								id={selectId}
								value={pageSize}
								onChange={(e) => {
									onPageSizeChange(Number(e.target.value));
									onPageChange(1);
								}}
								className="h-8 cursor-pointer appearance-none rounded-lg border border-text-200 bg-surface pl-3 pr-8 text-sm text-text-900 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
							>
								{options.map((n) => (
									<option key={n} value={n}>
										{n}
									</option>
								))}
							</select>
							<ChevronDown aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-text-500" />
						</span>
					</div>
				)}
				<p className="text-text-800" aria-live="polite">
					Showing {from.toLocaleString()}–{to.toLocaleString()} of {total.toLocaleString()} records
				</p>
			</div>

			<nav aria-label="Pagination" className="flex items-center gap-1">
				<button type="button" className={arrow} onClick={() => go(1)} disabled={current === 1} aria-label="First page">
					<ChevronsLeft />
				</button>
				<button type="button" className={arrow} onClick={() => go(current - 1)} disabled={current === 1} aria-label="Previous page">
					<ChevronLeft />
				</button>
				{getPageItems(current, pageCount, siblings).map((item, i) =>
					item === "ellipsis" ? (
						<span key={`gap-${i}`} aria-hidden className="flex size-8 items-center justify-center text-text-500">
							…
						</span>
					) : (
						<button
							key={item}
							type="button"
							onClick={() => go(item)}
							aria-label={`Page ${item}`}
							aria-current={item === current ? "page" : undefined}
							className={cn(
								"flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
								item === current ? "bg-brand font-medium text-white" : "text-text-900 hover:bg-text-100",
							)}
						>
							{item}
						</button>
					),
				)}
				<button type="button" className={arrow} onClick={() => go(current + 1)} disabled={current === pageCount} aria-label="Next page">
					<ChevronRight />
				</button>
				<button type="button" className={arrow} onClick={() => go(pageCount)} disabled={current === pageCount} aria-label="Last page">
					<ChevronsRight />
				</button>
			</nav>
		</div>
	);
}
