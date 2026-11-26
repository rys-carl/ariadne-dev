"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";

export default function CheckboxDemo() {
	const [a, setA] = useState(true);
	const [b, setB] = useState(false);

	return (
		<div className="flex items-center gap-10">
			<Checkbox size="lg" aria-label="Checked example" checked={a} onCheckedChange={setA} />
			<Checkbox size="lg" aria-label="Unchecked example" checked={b} onCheckedChange={setB} />
		</div>
	);
}
