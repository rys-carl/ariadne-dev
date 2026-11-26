import { OtpInput } from "@/shared/ui/OtpInput";

export default function InputOtpStates() {
	return (
		<div className="grid gap-6 text-left">
			<OtpInput length={4} aria-label="Empty" />
			<OtpInput length={4} defaultValue="12" aria-label="Partly filled" />
			<OtpInput length={4} defaultValue="1234" invalid aria-label="Error" />
			<OtpInput length={4} defaultValue="1234" disabled aria-label="Disabled" />
		</div>
	);
}
