"use client";

import { useState } from "react";
import { RadioGroup } from "@/shared/ui/RadioGroup";

export default function RadioGroupForm() {
	const [term, setTerm] = useState("25");
	const [pay, setPay] = useState<string>();

	return (
		<div className="flex w-full max-w-md flex-col gap-8 text-left">
			<RadioGroup
				label="Loan term"
				helper="Weekly payments."
				value={term}
				onValueChange={setTerm}
				options={[
					{ value: "25", label: "25 weeks", description: "Lower total interest" },
					{ value: "50", label: "50 weeks", description: "Smaller weekly payments" },
					{ value: "100", label: "100 weeks", description: "Housing loans only", disabled: true },
				]}
			/>
			<RadioGroup
				label="Payment channel"
				required
				orientation="horizontal"
				value={pay}
				onValueChange={setPay}
				error={!pay ? "Choose how the client will pay." : undefined}
				options={[
					{ value: "branch", label: "Branch" },
					{ value: "gcash", label: "GCash" },
					{ value: "bank", label: "Bank transfer" },
				]}
			/>
		</div>
	);
}
