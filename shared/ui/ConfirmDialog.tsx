// shared/ui/ConfirmDialog.tsx — "are you sure?" dialog for consequential actions.
// Spec: "Confirmation Dialog" Figma (Reject, Reset MPIN, Deactivate,
// Block, Delete, Save Changes). Documented at /components/confirm-dialog.
//
// onConfirm may be async: the confirm button shows a spinner and the dialog
// can't be dismissed until it settles. Close the dialog yourself (set
// open=false) when it succeeds; if it throws, the dialog stays open.
"use client";

import { useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "./Button";
import { Callout } from "./Callout";
import { Field } from "./Field";
import { Textarea } from "./Textarea";
import type { StatusTone } from "./tones";

export type ConfirmDialogProps = {
	open: boolean;
	onCancel: () => void;
	/** Receives the remarks when `remarks` is enabled. */
	onConfirm: (remarks: string) => void | Promise<unknown>;
	tone?: StatusTone;
	icon?: LucideIcon;
	title: ReactNode;
	description?: ReactNode;
	/** Facts about the record being changed, e.g. CID and client name. */
	details?: { label: ReactNode; value: ReactNode }[];
	/** Consequence notice, shown in a callout in the dialog's tone. */
	notice?: ReactNode;
	/** Ask for remarks before confirming. `true` = required, with default text. */
	remarks?: boolean | { label?: string; placeholder?: string; required?: boolean };
	confirmLabel?: string;
	cancelLabel?: string;
	/** Red confirm button. Defaults to true for tone="danger". */
	destructive?: boolean;
};

export function ConfirmDialog({
	open,
	onCancel,
	onConfirm,
	tone = "warning",
	icon,
	title,
	description,
	details,
	notice,
	remarks,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	destructive = tone === "danger",
}: ConfirmDialogProps) {
	const [text, setText] = useState("");
	const [error, setError] = useState<string>();
	const [pending, setPending] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const remarksConfig = remarks ? (remarks === true ? {} : remarks) : null;
	const remarksRequired = remarksConfig ? (remarksConfig.required ?? true) : false;

	function reset() {
		setText("");
		setError(undefined);
	}

	function cancel() {
		if (pending) return;
		reset();
		onCancel();
	}

	async function confirm() {
		if (remarksRequired && !text.trim()) {
			setError("Remarks are required.");
			textareaRef.current?.focus();
			return;
		}
		setPending(true);
		try {
			await onConfirm(text.trim());
			reset();
		} catch {
			// The caller reports the failure (e.g. a toast); keep the dialog open to retry.
		} finally {
			setPending(false);
		}
	}

	return (
		<AlertDialog
			open={open}
			onClose={pending ? undefined : cancel}
			tone={tone}
			icon={icon}
			title={title}
			description={description}
			actions={
				<>
					<Button variant="neutral" size="sm" onClick={cancel} disabled={pending}>
						{cancelLabel}
					</Button>
					<Button size="sm" tone={destructive ? "destructive" : "default"} onClick={confirm} loading={pending}>
						{confirmLabel}
					</Button>
				</>
			}
		>
			{remarksConfig && (
				<div className="rounded-lg border border-text-100 bg-text-50 p-3">
					<Field label={remarksConfig.label ?? "Remarks"} required={remarksRequired} error={error}>
						<Textarea
							ref={textareaRef}
							value={text}
							onChange={(e) => {
								setText(e.target.value);
								if (error) setError(undefined);
							}}
							placeholder={remarksConfig.placeholder ?? "Enter the reason..."}
							rows={5}
						/>
					</Field>
				</div>
			)}
			{details && details.length > 0 && (
				<dl className="space-y-1.5 rounded-lg bg-text-50 p-3 text-sm">
					{details.map((d, i) => (
						<div key={i} className="flex flex-wrap gap-1">
							<dt className="text-text-700">{d.label}:</dt>
							<dd className="font-semibold text-text-900">{d.value}</dd>
						</div>
					))}
				</dl>
			)}
			{notice && <Callout tone={tone}>{notice}</Callout>}
		</AlertDialog>
	);
}
