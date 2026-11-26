import { StatusBadge } from "@/shared/ui/StatusBadge";

const CATEGORIES = [
	{ name: "Success", statuses: ["Posted", "Approved", "Paid", "Matched", "Active", "Open"] },
	{ name: "Warning", statuses: ["Pending", "For Review", "Partially Paid", "Mismatch"] },
	{ name: "Destructive", statuses: ["Rejected", "Voided", "Overdue", "Cancelled"] },
	{ name: "Info", statuses: ["Scheduled", "Submitted"] },
	{ name: "Neutral", statuses: ["Draft", "Inactive", "Closed", "Locked", "Reversed"] },
];

export default function StatusBadgeDemo() {
	return (
		<dl className="grid w-full gap-4 text-left sm:grid-cols-[7rem_1fr]">
			{CATEGORIES.map((c) => (
				<div key={c.name} className="contents">
					<dt className="pt-1 text-sm text-text-600">{c.name}</dt>
					<dd className="flex flex-wrap gap-2">
						{c.statuses.map((s) => (
							<StatusBadge key={s} status={s} />
						))}
					</dd>
				</div>
			))}
		</dl>
	);
}
