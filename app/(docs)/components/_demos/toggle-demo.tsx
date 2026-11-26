"use client";

import { useState } from "react";
import { Toggle } from "@/shared/ui/Toggle";

// The spec's two states, with the state text under the switch.
export default function ToggleDemo() {
	const [a, setA] = useState(true);
	const [b, setB] = useState(false);

	return (
		<div className="flex items-start gap-12">
			<Toggle size="lg" aria-label="Account status" stateLabels={{ on: "Active", off: "Inactive" }} checked={a} onCheckedChange={setA} />
			<Toggle size="lg" aria-label="Branch status" stateLabels={{ on: "Active", off: "Inactive" }} checked={b} onCheckedChange={setB} />
		</div>
	);
}
