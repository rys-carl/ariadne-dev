"use client";

import { useState } from "react";
import { addDays, startOfDay } from "@/shared/lib/dates";
import { DatePicker } from "@/shared/ui/DatePicker";
import { Field } from "@/shared/ui/Field";

const today = startOfDay(new Date());
const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

export default function DatePickerStates() {
	const [release, setRelease] = useState<Date>();
	const [birth, setBirth] = useState<Date>();

	return (
		<div className="grid w-full max-w-sm gap-5 text-left">
			<Field label="Release date" helper="Weekdays in the next 30 days only.">
				<DatePicker value={release} onChange={setRelease} min={today} max={addDays(today, 30)} isDisabled={isWeekend} />
			</Field>
			<Field label="Birthday" error={!birth ? "Enter the client's birthday." : undefined}>
				<DatePicker value={birth} onChange={setBirth} max={today} />
			</Field>
			<Field label="Locked" disabled>
				<DatePicker value={today} onChange={() => {}} />
			</Field>
		</div>
	);
}
