import { Checkbox } from "@/shared/ui/Checkbox";
import { Field } from "@/shared/ui/Field";

export default function CheckboxStates() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4 text-left">
			<Checkbox label="With a description" description="Shown under the label and read by screen readers." defaultChecked />
			<Checkbox label="Disabled" disabled defaultChecked />
			<Field error="You must accept the terms to continue.">
				<Checkbox label="I accept the terms and conditions" required />
			</Field>
			<div className="flex items-center gap-4">
				<Checkbox size="sm" aria-label="Small" defaultChecked />
				<Checkbox size="md" aria-label="Medium" defaultChecked />
				<Checkbox size="lg" aria-label="Large" defaultChecked />
			</div>
		</div>
	);
}
