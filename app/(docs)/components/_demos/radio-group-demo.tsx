"use client";

import { useState } from "react";
import { RadioGroup } from "@/shared/ui/RadioGroup";

// The spec's two states.
export default function RadioGroupDemo() {
	const [v, setV] = useState("a");
	return (
		<RadioGroup
			label={<span className="sr-only">Example</span>}
			orientation="horizontal"
			size="lg"
			value={v}
			onValueChange={setV}
			options={[
				{ value: "a", label: <span className="sr-only">Option A</span> },
				{ value: "b", label: <span className="sr-only">Option B</span> },
			]}
			className="[&_div]:gap-x-10"
		/>
	);
}
