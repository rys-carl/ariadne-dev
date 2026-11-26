"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { RichTextEditor } from "@/shared/ui/RichTextEditor";

const START = "<p><strong>Visit summary</strong></p><ul><li><p>Collected 3 weekly payments</p></li><li><p>Client requested a <u>term extension</u></p></li></ul>";

export default function RichTextEditorForm() {
	const [html, setHtml] = useState(START);
	const [submitted, setSubmitted] = useState(false);
	const error = submitted && !html ? "Add remarks before submitting." : undefined;

	function submit(e: FormEvent) {
		e.preventDefault();
		setSubmitted(true);
	}

	return (
		<form onSubmit={submit} noValidate className="flex w-full flex-col gap-4 text-left">
			<Field label="Remarks" helper="Shared with the approver." error={error} required>
				<RichTextEditor value={html} onChange={setHtml} maxLength={500} minHeight="8rem" />
			</Field>
			<div className="flex gap-3">
				<Button type="submit" size="sm">Submit</Button>
				<Button size="sm" variant="neutral" onClick={() => { setHtml(""); setSubmitted(false); }}>Clear</Button>
			</div>
			<div className="space-y-1">
				<p className="text-xs font-medium text-text-500">Value (HTML)</p>
				<pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-text-50 p-3 font-mono text-xs text-text-700">{html || "\"\""}</pre>
			</div>
		</form>
	);
}
