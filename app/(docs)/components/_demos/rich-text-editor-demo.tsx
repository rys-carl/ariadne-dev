"use client";

import { useState } from "react";
import { RichTextEditor } from "@/shared/ui/RichTextEditor";

// The spec's states: default (click in to see the focus border) and disabled.
export default function RichTextEditorDemo() {
	const [html, setHtml] = useState("");

	return (
		<div className="flex w-full flex-col gap-6 text-left">
			<RichTextEditor aria-label="Notes" value={html} onChange={setHtml} />
			<RichTextEditor aria-label="Notes (disabled)" disabled />
		</div>
	);
}
