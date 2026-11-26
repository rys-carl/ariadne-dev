"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Stepper } from "@/shared/ui/Stepper";

const STEPS = ["Verify Staff", "Account Details", "Set Role", "Review"];

export default function StepperDemo() {
	const [step, setStep] = useState(0);

	return (
		<div className="flex w-full max-w-lg flex-col gap-8">
			<Stepper steps={STEPS} current={step} />
			<div className="flex justify-between">
				<Button variant="neutral" size="sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
					Back
				</Button>
				<Button size="sm" disabled={step === STEPS.length} onClick={() => setStep((s) => s + 1)}>
					{step >= STEPS.length - 1 ? "Finish" : "Next"}
				</Button>
			</div>
		</div>
	);
}
