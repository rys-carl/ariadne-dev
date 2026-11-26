"use client";

import { useState } from "react";
import { formatRange, formatTime, type DateRange, type TimeValue } from "@/shared/lib/dates";
import { Calendar } from "@/shared/ui/Calendar";
import { TimePicker } from "@/shared/ui/TimePicker";

// The spec's range card: date range + time, each with a large readout.
export default function CalendarRangeDemo() {
	const [range, setRange] = useState<DateRange>({ from: new Date(2026, 1, 8), to: new Date(2026, 1, 22) });
	const [time, setTime] = useState<TimeValue>({ hours: 8, minutes: 30 });

	return (
		<div className="flex flex-wrap gap-6 rounded-xl border border-text-200 bg-surface p-4 shadow-md">
			<div className="space-y-3">
				<p className="rounded-lg bg-brand-subtle px-4 py-2.5 text-center text-2xl font-semibold text-brand-fg" aria-live="polite">
					{range.from ? formatRange(range) : "Pick a start date"}
				</p>
				<Calendar mode="range" value={range} onChange={setRange} defaultMonth={new Date(2026, 1, 1)} />
			</div>
			<div className="space-y-1">
				<TimePicker value={time} onChange={setTime} showSummary />
				<p className="sr-only" aria-live="polite">{formatTime(time)}</p>
			</div>
		</div>
	);
}
