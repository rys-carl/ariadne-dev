import { Field } from "@/shared/ui/Field";
import { PhoneInput } from "@/shared/ui/PhoneInput";

export default function PhoneInputStates() {
	return (
		<div className="grid w-full gap-6 sm:grid-cols-2">
			<Field label="Filled">
				<PhoneInput defaultValue="9171234567" />
			</Field>
			<Field label="Other country">
				<PhoneInput defaultCountry="SG" defaultValue="81234567" />
			</Field>
			<Field label="Error" error="Enter a valid mobile number.">
				<PhoneInput defaultValue="917123" />
			</Field>
			<Field label="Disabled" disabled>
				<PhoneInput defaultValue="9171234567" />
			</Field>
		</div>
	);
}
