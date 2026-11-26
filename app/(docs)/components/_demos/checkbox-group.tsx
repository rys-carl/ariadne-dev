"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";

const REPORTS = ["Staff list", "Remittance report", "Loan aging", "Collection summary"];

// "Select all" uses indeterminate when only some are checked.
export default function CheckboxGroup() {
	const [picked, setPicked] = useState<string[]>(["Staff list"]);
	const all = picked.length === REPORTS.length;

	return (
		<fieldset className="flex w-full max-w-sm flex-col gap-3 text-left">
			<legend className="mb-2 text-sm font-medium text-text-900">Reports to export</legend>
			<Checkbox
				label="Select all"
				checked={all}
				indeterminate={picked.length > 0 && !all}
				onCheckedChange={(on) => setPicked(on ? REPORTS : [])}
			/>
			<div className="ml-7 flex flex-col gap-3">
				{REPORTS.map((r) => (
					<Checkbox
						key={r}
						label={r}
						checked={picked.includes(r)}
						onCheckedChange={(on) => setPicked((p) => (on ? [...p, r] : p.filter((x) => x !== r)))}
					/>
				))}
			</div>
		</fieldset>
	);
}
