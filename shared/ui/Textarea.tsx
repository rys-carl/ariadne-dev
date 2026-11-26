// shared/ui/Textarea.tsx — multi-line text, styled like Input.
// Use inside <Field> for label, helper text and error.
// Documented on /components/input.
"use client";

import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";

export type TextareaProps = ComponentProps<"textarea"> & { invalid?: boolean };

export function Textarea({
	invalid: invalidProp,
	id: idProp,
	disabled: disabledProp,
	required: requiredProp,
	className,
	rows = 4,
	...props
}: TextareaProps) {
	const { id, invalid, disabled, required, describedBy } = useFieldControl({
		id: idProp,
		invalid: invalidProp,
		disabled: disabledProp,
		required: requiredProp,
		"aria-describedby": props["aria-describedby"],
	});
	return (
		<textarea
			id={id}
			rows={rows}
			disabled={disabled}
			required={required}
			aria-invalid={invalid || undefined}
			{...props}
			aria-describedby={describedBy}
			className={cn(
				"block w-full resize-y rounded-lg border bg-surface px-3 py-2 text-sm leading-6 outline-none transition-shadow",
				"focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
				invalid
					? "border-input-border-danger text-danger placeholder:text-danger focus:placeholder:text-text-500 focus-visible:ring-danger"
					: "border-input-border text-text-900 placeholder:text-text-500 focus-visible:ring-brand",
				className,
			)}
		/>
	);
}
