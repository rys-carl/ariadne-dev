"use client";

import { useState } from "react";
import { formatTime, type TimeValue } from "@/shared/lib/dates";
import { TimePicker } from "@/shared/ui/TimePicker";

export default function TimePickerDemo() {
	const [time, setTime] = useState<TimeValue>({ hours: 8, minutes: 30 });
	const [slot, setSlot] = useState<TimeValue>({ hours: 14, minutes: 15 });

	return (
		<div className="flex flex-wrap items-start gap-8">
			<div className="rounded-xl border border-text-200 bg-surface p-4 shadow-md">
				<TimePicker value={time} onChange={setTime} />
				<p className="mt-3 text-center text-xs text-text-500">Value: {formatTime(time)}</p>
			</div>
			<div className="rounded-xl border border-text-200 bg-surface p-4 shadow-md">
				<TimePicker value={slot} onChange={setSlot} minuteStep={15} showSummary title="Appointment (15-min slots)" />
			</div>
		</div>
	);
}
