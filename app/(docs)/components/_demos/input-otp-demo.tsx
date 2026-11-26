"use client";

import { useState } from "react";
import { Field } from "@/shared/ui/Field";
import { OtpInput } from "@/shared/ui/OtpInput";

const CORRECT = "123456";

export default function InputOtpDemo() {
	const [code, setCode] = useState("");
	const done = code.length === 6;
	const error = done && code !== CORRECT ? "Your one-time password must match the code we sent." : undefined;

	return (
		<Field
			label="One-time password"
			helper={done && !error ? "Verified." : "Try 123456. You can also paste the code."}
			error={error}
		>
			<OtpInput value={code} onChange={setCode} />
		</Field>
	);
}
