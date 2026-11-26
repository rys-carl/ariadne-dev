"use client";

import { useState } from "react";
import { Calendar } from "@/shared/ui/Calendar";

export default function CalendarDemo() {
	const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 14));

	return (
		<div className="rounded-xl border border-text-200 bg-surface p-4 shadow-md">
			<Calendar value={date} onChange={setDate} />
		</div>
	);
}
