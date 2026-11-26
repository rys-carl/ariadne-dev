"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { IconButton } from "@/shared/ui/Button";

export default function CopyButton({ value, className }: { value: string; className?: string }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// Clipboard can be unavailable (insecure origin, permissions); fail quietly.
		}
	}

	return (
		<IconButton
			variant="ghost"
			size="xs"
			aria-label={copied ? "Copied" : "Copy code"}
			title={copied ? "Copied" : "Copy code"}
			icon={copied ? <Check /> : <Copy />}
			onClick={copy}
			className={className}
		/>
	);
}
