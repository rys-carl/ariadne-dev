// shared/ui/MetaBar.tsx — a row of short facts separated by dividers.
// Spec: "Meta Bar" Figma ("S: March 25, 2026 | 10:30 AM | C: July 30, 2026 |
// Status: Closed | 🔔"). Documented at /components/header.
//
//   <MetaBar
//     items={[
//       { label: "S", labelFull: "Started", value: "March 25, 2026" },
//       { value: "10:30 AM" },
//       { value: <Badge shape="tag" tone="danger" size="md">Status: Closed</Badge> },
//       { value: <NotificationBell /> },
//     ]}
//   />
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type MetaItem = {
	/** Short label before the value, e.g. "S". */
	label?: string;
	/** What an abbreviated label means ("Started"). Read by screen readers and shown on hover. */
	labelFull?: string;
	value: ReactNode;
};

export function MetaBar({ items, className }: { items: MetaItem[]; className?: string }) {
	return (
		<ul className={cn("flex flex-wrap items-center gap-y-2 text-base", className)}>
			{items.map((item, i) => (
				<li
					key={i}
					className="flex items-center gap-1 px-3 first:pl-0 last:pr-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-text-400"
				>
					{item.label && (
						<span className="text-slate-500">
							{item.labelFull ? (
								<abbr title={item.labelFull} className="no-underline">
									{item.label}
								</abbr>
							) : (
								item.label
							)}
							:
						</span>
					)}
					<span className="text-text-900">{item.value}</span>
				</li>
			))}
		</ul>
	);
}
