"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Input } from "@/shared/ui/Input";

// Show errors after submit, then re-validate as the user fixes them.
export default function InputValidation() {
	const [cid, setCid] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const error = submitted && !/^CID-\d{3,}$/.test(cid) ? "Use the format CID-001." : undefined;

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		setSubmitted(true);
	}

	return (
		<form onSubmit={onSubmit} noValidate className="flex w-full max-w-sm flex-col gap-4">
			<Field label="Client ID" helper="Found on the member's ID card." error={error} required>
				<Input value={cid} onChange={(e) => setCid(e.target.value.toUpperCase())} placeholder="CID-000" />
			</Field>
			<Button type="submit" className="self-start">
				Verify
			</Button>
		</form>
	);
}
