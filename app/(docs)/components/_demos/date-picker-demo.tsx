"use client";

import { useState } from "react";
import type { DateRange } from "@/shared/lib/dates";
import { DatePicker } from "@/shared/ui/DatePicker";
import { Field } from "@/shared/ui/Field";

export default function DatePickerDemo() {
	const [due, setDue] = useState<Date>();
	const [period, setPeriod] = useState<DateRange>();
	const [meeting, setMeeting] = useState<Date>();

	return (
		<div className="grid w-full max-w-sm gap-5 text-left">
			<Field label="Due date">
				<DatePicker value={due} onChange={setDue} />
			</Field>
			<Field label="Report period" helper="Pick the first and last day.">
				<DatePicker mode="range" value={period} onChange={setPeriod} />
			</Field>
			<Field label="Branch visit">
				<DatePicker withTime minuteStep={15} value={meeting} onChange={setMeeting} />
			</Field>
		</div>
	);
}
