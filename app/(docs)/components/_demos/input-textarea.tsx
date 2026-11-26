import { Field } from "@/shared/ui/Field";
import { Textarea } from "@/shared/ui/Textarea";

export default function InputTextarea() {
	return (
		<div className="grid w-full max-w-sm gap-6">
			<Field label="Remarks" helper="Visible to the approver.">
				<Textarea placeholder="Enter the reason..." />
			</Field>
			<Field label="Remarks" required error="Remarks are required.">
				<Textarea placeholder="Enter the reason..." />
			</Field>
		</div>
	);
}
