import { Stepper } from "@/shared/ui/Stepper";

export default function StepperStates() {
	return (
		<div className="flex w-full max-w-md flex-col gap-6">
			<Stepper steps={["Verify Staff", "Account Details", "Set Role"]} current={0} />
			<Stepper steps={["Verify Staff", "Account Details", "Set Role"]} current={1} />
			<Stepper steps={["Verify Staff", "Account Details", "Review"]} current={2} />
		</div>
	);
}
