// shared/ui/TableCells.tsx — formatted values for table cells and details.
// Spec: "Table cell" Figma (−₱ red / +₱ green amounts, "—" for empty).
// Documented at /components/table.
import { cn } from "@/shared/lib/cn";

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

export type AmountProps = {
	value: number;
	/**
	 * Show the sign and color it: −₱ in red, +₱ in green. Use for movements
	 * (debits / credits); leave off for balances and totals.
	 */
	signed?: boolean;
	/** Use another currency formatter. Defaults to PHP. */
	format?: (value: number) => string;
	className?: string;
};

export function Amount({ value, signed = false, format = (v) => peso.format(v), className }: AmountProps) {
	const abs = format(Math.abs(value));
	if (!signed || value === 0) {
		return <span className={cn("tabular-nums", className)}>{value < 0 ? `−${abs}` : abs}</span>;
	}
	return (
		<span className={cn("font-semibold tabular-nums", value < 0 ? "text-red-600" : "text-green-600", className)}>
			{value < 0 ? "−" : "+"}
			{abs}
		</span>
	);
}

/** Placeholder for an empty value. Reads as "None" to screen readers. */
export function NullValue({ className }: { className?: string }) {
	return (
		<span className={cn("text-text-500", className)}>
			<span aria-hidden>—</span>
			<span className="sr-only">None</span>
		</span>
	);
}
