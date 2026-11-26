// shared/ui/Checkbox.tsx — checkbox with optional label and description.
// Spec: "Checkbox" Figma (checked = brand fill with white check, unchecked =
// gray outline). Documented at /components/checkbox.
//
//   <Checkbox label="Remember me" checked={remember} onCheckedChange={setRemember} />
//
// A real <input type="checkbox"> sits under the visual box, so the label,
// Space key, form submission and screen readers all work natively.
"use client";

import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";

const sizes = {
	sm: { box: "size-4 rounded", icon: "size-3" },
	md: { box: "size-5 rounded-md", icon: "size-3.5" },
	lg: { box: "size-6 rounded-md", icon: "size-4" },
} as const;

export type CheckboxProps = Omit<ComponentProps<"input">, "type" | "size"> & {
	label?: ReactNode;
	/** Smaller text under the label. */
	description?: ReactNode;
	/** "Some selected" state, e.g. a select-all box. Shows a dash. */
	indeterminate?: boolean;
	/** Convenience: called with the new checked value. */
	onCheckedChange?: (checked: boolean) => void;
	invalid?: boolean;
	size?: keyof typeof sizes;
	className?: string;
};

export function Checkbox({
	label,
	description,
	indeterminate = false,
	onCheckedChange,
	onChange,
	invalid: invalidProp,
	disabled: disabledProp,
	required: requiredProp,
	id: idProp,
	size = "md",
	className,
	ref,
	checked,
	defaultChecked,
	...props
}: CheckboxProps) {
	const { id, invalid, disabled, required, describedBy } = useFieldControl({
		id: idProp,
		invalid: invalidProp,
		disabled: disabledProp,
		required: requiredProp,
		"aria-describedby": props["aria-describedby"],
	});
	const innerRef = useRef<HTMLInputElement | null>(null);
	// Always controlled internally (checked can start undefined): `checked`
	// wins when given, otherwise our own state, seeded from defaultChecked.
	const [innerOn, setInnerOn] = useState(!!defaultChecked);
	const on = checked ?? innerOn;
	// Own id fallback so the description is linked even outside a Field.
	const fallbackId = useId();
	const descriptionId = description ? `${id ?? fallbackId}-description` : undefined;
	const s = sizes[size];

	// indeterminate is a DOM property only, not an attribute.
	useEffect(() => {
		if (innerRef.current) innerRef.current.indeterminate = indeterminate;
	}, [indeterminate]);

	return (
		<label className={cn("inline-flex items-start gap-2.5", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", className)}>
			<span className="relative inline-flex shrink-0 items-center justify-center">
				<input
					ref={(node) => {
						innerRef.current = node;
						if (typeof ref === "function") ref(node);
						else if (ref) ref.current = node;
					}}
					id={id}
					type="checkbox"
					disabled={disabled}
					required={required}
					aria-invalid={invalid || undefined}
					{...props}
					checked={on}
					aria-describedby={[describedBy, descriptionId].filter(Boolean).join(" ") || undefined}
					onChange={(e) => {
						setInnerOn(e.target.checked);
						onChange?.(e);
						onCheckedChange?.(e.target.checked);
					}}
					className="peer absolute inset-0 m-0 cursor-[inherit] appearance-none opacity-0"
				/>
				<span
					aria-hidden
					className={cn(
						"flex items-center justify-center border-2 bg-surface text-white transition-colors",
						"peer-checked:border-brand peer-checked:bg-brand peer-indeterminate:border-brand peer-indeterminate:bg-brand",
						"peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
						"[&>svg]:hidden peer-checked:[&>.check]:block peer-indeterminate:[&>.dash]:block peer-indeterminate:[&>.check]:hidden",
						invalid ? "border-danger" : "border-text-500",
						s.box,
					)}
				>
					<Check className={cn("check", s.icon)} strokeWidth={3.5} />
					<Minus className={cn("dash", s.icon)} strokeWidth={3.5} />
				</span>
			</span>
			{(label || description) && (
				<span className="min-w-0 select-none">
					{label && <span className={cn("block text-sm leading-5", invalid ? "text-danger" : "text-text-900")}>{label}</span>}
					{description && (
						<span id={descriptionId} className="mt-0.5 block text-sm leading-5 text-text-500">
							{description}
						</span>
					)}
				</span>
			)}
		</label>
	);
}
