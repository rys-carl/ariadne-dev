"use client";

import { useState } from "react";
import { Field } from "@/shared/ui/Field";
import { PhoneInput } from "@/shared/ui/PhoneInput";

export default function PhoneInputDemo() {
	const [e164, setE164] = useState("");

	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Field label="Mobile number" helper="We'll text a verification code.">
				<PhoneInput onValueChange={(_, details) => setE164(details.e164)} />
			</Field>
			<p className="text-xs text-text-500">
				Value sent to the API: <code className="font-mono text-text-800">{e164 || "—"}</code>
			</p>
		</div>
	);
}
