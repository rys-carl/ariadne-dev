// shared/ui/Field.tsx — label + control + helper text + error message.
// Wraps any form control from shared/ui (Input, PhoneInput, OtpInput,
// SearchInput) and wires up id, aria-describedby, aria-invalid and
// disabled through context, so accessibility is correct by default.
// Documented at /components/input.
"use client";

import { createContext, useContext, useId, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type FieldContextValue = {
	id: string;
	describedBy?: string;
	invalid: boolean;
	disabled: boolean;
	required: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * For control authors: merges a control's own props with the surrounding
 * Field (if any). Explicit props win over the Field's values.
 */
export function useFieldControl(props: {
	id?: string;
	invalid?: boolean;
	disabled?: boolean;
	required?: boolean;
	"aria-describedby"?: string;
}) {
	const field = useContext(FieldContext);
	return {
		id: props.id ?? field?.id,
		invalid: props.invalid ?? field?.invalid ?? false,
		disabled: props.disabled ?? field?.disabled ?? false,
		required: props.required ?? field?.required,
		describedBy:
			[props["aria-describedby"], field?.describedBy].filter(Boolean).join(" ") || undefined,
	};
}

export type FieldProps = {
	label?: ReactNode;
	/** Helper text under the control. */
	helper?: ReactNode;
	/**
	 * Error message. Any truthy value marks the field invalid; pass `true`
	 * to mark it invalid without showing a message.
	 */
	error?: ReactNode | boolean;
	required?: boolean;
	disabled?: boolean;
	/** id for the control. Generated if left out. */
	id?: string;
	className?: string;
	children: ReactNode;
};

export function Field({
	label,
	helper,
	error,
	required = false,
	disabled = false,
	id: idProp,
	className,
	children,
}: FieldProps) {
	const autoId = useId();
	const id = idProp ?? autoId;
	const invalid = Boolean(error);
	const helperId = helper ? `${id}-helper` : undefined;
	const errorId = invalid && error !== true ? `${id}-error` : undefined;
	const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

	return (
		<FieldContext value={{ id, describedBy, invalid, disabled, required }}>
			<div className={cn("flex flex-col gap-2", className)}>
				{label && (
					<label
						htmlFor={id}
						className={cn("text-sm font-medium leading-5", invalid ? "text-danger" : "text-text-900")}
					>
						{label}
						{required && (
							<span aria-hidden className="text-danger">
								{" "}
								*
							</span>
						)}
					</label>
				)}
				{children}
				{(helperId || errorId) && (
					<div className={cn("flex flex-col gap-1.5 text-sm leading-5", disabled && "opacity-50")}>
						{helperId && (
							<p id={helperId} className="text-field-muted">
								{helper}
							</p>
						)}
						{errorId && (
							<p id={errorId} className="text-danger">
								{error}
							</p>
						)}
					</div>
				)}
			</div>
		</FieldContext>
	);
}
