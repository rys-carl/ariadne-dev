import { Mail } from "lucide-react";
import { Field } from "@/shared/ui/Field";
import { Input } from "@/shared/ui/Input";

export default function InputDemo() {
	return (
		<Field label="Email" helper="We'll send the payslip to this address." className="w-full max-w-sm">
			<Input type="email" placeholder="juan.delacruz@bakawan.com" leftIcon={<Mail />} />
		</Field>
	);
}
