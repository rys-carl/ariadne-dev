// shared/ui/Timeline.tsx — dated sequence of events (e.g. an escalation schedule).
// Spec: "Timeline Item" Figma (done / current / upcoming).
// Documented at /components/timeline.
//
//   <Timeline>
//     <TimelineItem date="September 14, 2026" status="done">
//       <TimelineFields fields={[{ label: "Day", value: "Day 0" }, …]} />
//     </TimelineItem>
//   </Timeline>
import type { ReactNode } from "react";
import { Bell, Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type TimelineStatus = "done" | "current" | "upcoming";

export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
	return <ol className={cn("flex flex-col", className)}>{children}</ol>;
}

const markers: Record<TimelineStatus, ReactNode> = {
	done: (
		<span className="flex size-5 items-center justify-center rounded-full bg-brand text-white">
			<Check className="size-3" strokeWidth={3} />
		</span>
	),
	current: (
		<span className="flex size-5 items-center justify-center rounded-full border-2 border-brand bg-surface">
			<span className="size-2 rounded-full bg-brand" />
		</span>
	),
	upcoming: <span className="size-5 rounded-full border-[1.5px] border-text-300 bg-surface" />,
};

const statusText: Record<TimelineStatus, string> = { done: "Completed", current: "In progress", upcoming: "Upcoming" };

export type TimelineItemProps = {
	date: ReactNode;
	status: TimelineStatus;
	children: ReactNode;
	className?: string;
};

export function TimelineItem({ date, status, children, className }: TimelineItemProps) {
	return (
		<li
			aria-current={status === "current" ? "step" : undefined}
			className={cn(
				"group/item grid grid-cols-[1.25rem_1fr] gap-x-4 sm:grid-cols-[9rem_1.25rem_1fr]",
				className,
			)}
		>
			<p
				className={cn(
					"col-start-2 pb-2 text-sm sm:col-start-1 sm:pb-0 sm:pt-3 sm:text-right",
					status === "upcoming" ? "text-text-600" : "font-medium text-text-900",
				)}
			>
				{date}
				<span className="sr-only">, {statusText[status]}</span>
			</p>
			{/* Marker + the line down to the next item (hidden after the last one). */}
			<div className="col-start-1 row-span-2 row-start-1 flex flex-col items-center sm:col-start-2 sm:row-span-1 sm:pt-3">
				<span aria-hidden>{markers[status]}</span>
				<span aria-hidden className="w-px flex-1 bg-text-200 group-last/item:hidden" />
			</div>
			<div
				className={cn(
					"col-start-2 mb-6 rounded-xl p-4 sm:col-start-3",
					status === "current" && "border border-green-200 bg-green-50",
					status === "upcoming" && "bg-neutral-50",
				)}
			>
				{children}
			</div>
		</li>
	);
}

/** Bold label / value rows inside a TimelineItem. */
export function TimelineFields({ fields }: { fields: { label: ReactNode; value: ReactNode }[] }) {
	return (
		<dl className="grid grid-cols-[6rem_1fr] items-center gap-x-4 gap-y-2.5 text-sm">
			{fields.map((f, i) => (
				<div key={i} className="contents">
					<dt className="font-semibold text-text-900">{f.label}</dt>
					<dd className="min-w-0 text-text-700">{f.value}</dd>
				</div>
			))}
		</dl>
	);
}

/** Green banner for an event that fired, e.g. "Notification sent to …". */
export function TimelineNotice({ children }: { children: ReactNode }) {
	return (
		<p className="my-2.5 flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-xs text-white">
			<Bell className="size-3.5 shrink-0" aria-hidden />
			{children}
		</p>
	);
}
