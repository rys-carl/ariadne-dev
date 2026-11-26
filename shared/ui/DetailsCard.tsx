// shared/ui/DetailsCard.tsx — read-only label/value pairs.
// Spec: "Review Field" and "Details Card" Figma. Documented at /components/details-card.
//
//   <DetailsCard title="Payment Details">
//     <ReviewField label="Interest Amount" value="PHP 736.00" />
//     <ReviewField label="Outstanding Balance" value="PHP 236.00" tone="danger" />
//   </DetailsCard>
//
// Outside a card, group fields in <ReviewFields> (a <dl>), since each
// ReviewField is a <dt>/<dd> pair.
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type ReviewFieldProps = {
	label: ReactNode;
	value: ReactNode;
	/** "danger" for values that need attention, e.g. an overdue balance. */
	tone?: "default" | "danger";
	className?: string;
};

export function ReviewField({ label, value, tone = "default", className }: ReviewFieldProps) {
	return (
		<div className={cn("flex min-w-0 flex-col gap-1", className)}>
			<dt className="text-sm text-text-500">{label}</dt>
			<dd className={cn("break-words text-base", tone === "danger" ? "text-red-700" : "text-text-900")}>{value}</dd>
		</div>
	);
}

const columnClasses = { 1: "grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" } as const;

export type ReviewFieldsProps = {
	children: ReactNode;
	/** Columns from the sm breakpoint up. Always one column on phones. */
	columns?: 1 | 2 | 3;
	className?: string;
};

export function ReviewFields({ children, columns = 2, className }: ReviewFieldsProps) {
	return <dl className={cn("grid gap-x-6 gap-y-5", columnClasses[columns], className)}>{children}</dl>;
}

export type DetailsCardProps = ReviewFieldsProps & {
	title: ReactNode;
	/** Optional element on the right of the header, e.g. an Edit button. */
	action?: ReactNode;
};

export function DetailsCard({ title, action, children, columns = 2, className }: DetailsCardProps) {
	return (
		<section className={cn("overflow-hidden rounded-xl border border-text-100 bg-surface", className)}>
			<header className="flex items-center justify-between gap-4 bg-text-50 px-5 py-3">
				<h3 className="text-sm font-semibold text-brand-fg">{title}</h3>
				{action}
			</header>
			<ReviewFields columns={columns} className="p-5">
				{children}
			</ReviewFields>
		</section>
	);
}
