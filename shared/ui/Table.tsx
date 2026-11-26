// shared/ui/Table.tsx — column-driven data table.
// Spec: "Table row", "Table cell" and "Table Template Normal" Figma.
// Documented at /components/table.
//
//   <Table
//     caption="Loan applications"
//     columns={[
//       { key: "client", header: "Client", cell: (r) => <ClientCell name={r.name} id={r.cid} /> },
//       { key: "amount", header: "Amount", align: "right", cell: (r) => <Amount value={r.amount} signed /> },
//     ]}
//     rows={rows}
//     getRowKey={(r) => r.id}
//   />
//
// No "use client": column `cell` functions can be passed from Server
// Components. onRowClick needs a Client Component, like any event handler.
// Pair with <Pagination> below the table.
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type TableColumn<T> = {
	key: string;
	header: ReactNode;
	cell: (row: T, index: number) => ReactNode;
	align?: "left" | "center" | "right";
	/** Extra classes for this column's cells, e.g. a width. */
	className?: string;
};

export type TableProps<T> = {
	columns: TableColumn<T>[];
	rows: T[];
	getRowKey: (row: T, index: number) => string | number;
	/** Accessible name for the table (visually hidden). */
	caption: string;
	/** Makes rows clickable and keyboard-activatable (Enter / Space). */
	onRowClick?: (row: T) => void;
	/** Highlights one row, e.g. the record open in a side panel. */
	selectedRowKey?: string | number;
	/** Header row color: gray (default) or brand green, both from the spec. */
	headerTone?: "neutral" | "brand";
	/** Shows skeleton rows instead of data. */
	loading?: boolean;
	/** Rows of skeleton to show while loading. */
	loadingRows?: number;
	/** Shown when rows is empty. Defaults to "No data to display". */
	empty?: ReactNode;
	className?: string;
};

const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

export function Table<T>({
	columns,
	rows,
	getRowKey,
	caption,
	onRowClick,
	selectedRowKey,
	headerTone = "neutral",
	loading = false,
	loadingRows = 5,
	empty,
	className,
}: TableProps<T>) {
	const cellBase = "px-4 py-3 align-middle first:rounded-l-lg last:rounded-r-lg";

	return (
		// relative: makes this the containing block for absolutely positioned
		// content (e.g. sr-only labels), so it scrolls here instead of widening the page.
		<div className={cn("relative w-full overflow-x-auto", className)}>
			<table className="w-full border-separate border-spacing-0 text-sm" aria-busy={loading || undefined}>
				<caption className="sr-only">{caption}</caption>
				<thead>
					<tr>
						{columns.map((col) => (
							<th
								key={col.key}
								scope="col"
								className={cn(
									cellBase,
									"whitespace-nowrap font-semibold",
									headerTone === "brand" ? "bg-brand text-white" : "bg-text-50 text-text-700",
									alignClass[col.align ?? "left"],
								)}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						Array.from({ length: loadingRows }, (_, r) => (
							<tr key={`skeleton-${r}`}>
								{columns.map((col) => (
									<td key={col.key} className={cn(cellBase, "border-b border-text-100")}>
										<span className="block h-4 w-3/4 animate-pulse rounded bg-text-100" />
									</td>
								))}
							</tr>
						))
					) : rows.length === 0 ? (
						<tr>
							<td colSpan={columns.length} className="px-4 py-10">
								{empty ?? <p className="text-sm italic text-neutral-400">No data to display</p>}
							</td>
						</tr>
					) : (
						rows.map((row, r) => {
							const key = getRowKey(row, r);
							const selected = selectedRowKey !== undefined && key === selectedRowKey;
							return (
								<tr
									key={key}
									aria-current={selected || undefined}
									tabIndex={onRowClick ? 0 : undefined}
									onClick={onRowClick ? () => onRowClick(row) : undefined}
									onKeyDown={
										onRowClick
											? (e: KeyboardEvent) => {
													if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
														e.preventDefault();
														onRowClick(row);
													}
												}
											: undefined
									}
									className={cn(
										"group/row outline-none transition-colors",
										onRowClick && "cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
										// A light tint, not solid brand: cells keep their own colors
										// (red amounts, badges), which solid green would hide.
										"text-text-900",
										selected ? "bg-brand-subtle" : "hover:bg-text-50",
									)}
								>
									{columns.map((col) => (
										<td
											key={col.key}
											className={cn(
												cellBase,
												"border-b border-text-100",
												selected && "first:shadow-[inset_3px_0_0_var(--color-brand)]",
												alignClass[col.align ?? "left"],
												col.className,
											)}
										>
											{col.cell(row, r)}
										</td>
									))}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
