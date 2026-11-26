// shared/ui/Input.tsx — Bakawan text input (also handles type="file").
// Source of truth: the "Input" Figma (Default / Focus / Filled / Disabled ×
// Default / Destructive). Documented at /components/input.
//
// Use inside <Field> for label, helper text and error message.
"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";

/**
 * The bordered box shared by every form control (Input, PhoneInput,
 * OtpInput slots), so focus, error and disabled states look identical.
 * Focus = 2px ring with a 1px white gap, as drawn in the spec.
 */
export function controlStyles({ invalid = false, className }: { invalid?: boolean; className?: string } = {}) {
	return cn(
		"flex items-center rounded-lg border bg-surface text-sm transition-shadow",
		"focus-within:ring-2 focus-within:ring-offset-1",
		"has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
		"[&_svg]:size-4 [&_svg]:shrink-0",
		invalid
			? "border-input-border-danger text-danger focus-within:ring-danger [&_svg]:text-danger"
			: "border-input-border text-text-900 focus-within:ring-brand [&_svg]:text-text-600",
		className,
	);
}

/** Classes for the bare <input> inside a control box. */
export function controlInputStyles({ invalid = false, className }: { invalid?: boolean; className?: string } = {}) {
	return cn(
		"h-full min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed",
		// Placeholder is red at rest in the destructive state, gray while typing.
		invalid ? "placeholder:text-danger focus:placeholder:text-text-500" : "placeholder:text-text-500",
		className,
	);
}

export type InputProps = Omit<ComponentProps<"input">, "size"> & {
	/** Icon before the text, e.g. a lucide icon. */
	leftIcon?: ReactNode;
	/** Icon or element after the text. */
	rightIcon?: ReactNode;
	/** Error state. Inherited from <Field error> when left out. */
	invalid?: boolean;
	/** Applies to the outer box (layout only: width, margin). */
	className?: string;
};

export function Input({
	leftIcon,
	rightIcon,
	invalid: invalidProp,
	className,
	id: idProp,
	disabled: disabledProp,
	required: requiredProp,
	type = "text",
	ref,
	...props
}: InputProps) {
	const { id, invalid, disabled, required, describedBy } = useFieldControl({
		id: idProp,
		invalid: invalidProp,
		disabled: disabledProp,
		required: requiredProp,
		"aria-describedby": props["aria-describedby"],
	});
	const innerRef = useRef<HTMLInputElement | null>(null);

	return (
		<div
			className={controlStyles({ invalid, className: cn("h-10 w-full gap-2 px-3", className) })}
			// Clicking the padding or an icon focuses the input, like a native field.
			onMouseDown={(e) => {
				if (e.target !== innerRef.current && !disabled) {
					e.preventDefault();
					innerRef.current?.focus();
				}
			}}
		>
			{leftIcon}
			<input
				ref={(node) => {
					innerRef.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) ref.current = node;
				}}
				id={id}
				type={type}
				disabled={disabled}
				required={required}
				aria-invalid={invalid || undefined}
				{...props}
				aria-describedby={describedBy}
				className={controlInputStyles({
					invalid,
					className:
						type === "file"
							? "cursor-pointer text-text-500 file:mr-3 file:cursor-pointer file:border-0 file:bg-transparent file:p-0 file:text-sm file:font-medium file:text-text-900 aria-invalid:text-danger"
							: undefined,
				})}
			/>
			{rightIcon}
		</div>
	);
}
