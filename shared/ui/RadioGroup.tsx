// shared/ui/RadioGroup.tsx — pick one option from a list.
// Spec: "Radio Button" Figma (selected = brand ring with brand dot,
// unselected = gray ring). Documented at /components/radio-group.
//
//   <RadioGroup
//     label="Loan term"
//     value={term}
//     onValueChange={setTerm}
//     options={[{ value: "25", label: "25 weeks" }, { value: "50", label: "50 weeks" }]}
//   />
//
// Native radios with a shared name: Tab enters the group, arrow keys move
// and select, and screen readers announce "2 of 3".
"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const sizes = {
	sm: { ring: "size-4", dot: "size-1.5" },
	md: { ring: "size-5", dot: "size-2" },
	lg: { ring: "size-6", dot: "size-2.5" },
} as const;

export type RadioOption = {
	value: string;
	label: ReactNode;
	description?: ReactNode;
	disabled?: boolean;
};

export type RadioGroupProps = {
	options: RadioOption[];
	/** Controlled value. */
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	/** Group label (rendered as the fieldset legend). */
	label?: ReactNode;
	/** Helper text under the label. */
	helper?: ReactNode;
	/** Error message; marks the group invalid. */
	error?: ReactNode;
	/** Form field name. Generated if left out. */
	name?: string;
	required?: boolean;
	disabled?: boolean;
	orientation?: "vertical" | "horizontal";
	size?: keyof typeof sizes;
	className?: string;
};

export function RadioGroup({
	options,
	value,
	defaultValue,
	onValueChange,
	label,
	helper,
	error,
	name,
	required,
	disabled = false,
	orientation = "vertical",
	size = "md",
	className,
}: RadioGroupProps) {
	const autoId = useId();
	const groupName = name ?? autoId;
	// Always controlled internally, so `value` can start undefined (nothing
	// picked yet) and become a string without React's controlled/uncontrolled warning.
	const [inner, setInner] = useState(defaultValue);
	const current = value !== undefined ? value : inner;
	const helperId = helper ? `${autoId}-helper` : undefined;
	const errorId = error ? `${autoId}-error` : undefined;
	const invalid = !!error;
	const s = sizes[size];

	return (
		<fieldset
			disabled={disabled}
			aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
			aria-invalid={invalid || undefined}
			className={cn("min-w-0 space-y-3", disabled && "opacity-50", className)}
		>
			{label && (
				<legend className={cn("mb-1 text-sm font-medium leading-5", invalid ? "text-danger" : "text-text-900")}>
					{label}
					{required && <span aria-hidden className="text-danger"> *</span>}
				</legend>
			)}
			{helper && (
				<p id={helperId} className="-mt-1 text-sm text-field-muted">
					{helper}
				</p>
			)}
			<div className={cn("flex", orientation === "vertical" ? "flex-col gap-3" : "flex-wrap gap-x-6 gap-y-3")}>
				{options.map((opt) => {
					const optId = `${autoId}-${opt.value}`;
					const off = disabled || opt.disabled;
					return (
						<label
							key={opt.value}
							htmlFor={optId}
							className={cn("inline-flex items-start gap-2.5", off ? "cursor-not-allowed" : "cursor-pointer", opt.disabled && "opacity-50")}
						>
							<span className="relative inline-flex shrink-0 items-center justify-center">
								<input
									id={optId}
									type="radio"
									name={groupName}
									value={opt.value}
									required={required}
									disabled={opt.disabled}
									checked={current === opt.value}
									onChange={(e) => {
										if (!e.target.checked) return;
										setInner(opt.value);
										onValueChange?.(opt.value);
									}}
									aria-describedby={opt.description ? `${optId}-description` : undefined}
									className="peer absolute inset-0 m-0 cursor-[inherit] appearance-none opacity-0"
								/>
								<span
									aria-hidden
									className={cn(
										"flex items-center justify-center rounded-full border-2 bg-surface transition-colors",
										"peer-checked:border-brand peer-checked:[&>span]:scale-100",
										"peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
										invalid ? "border-danger" : "border-text-500",
										s.ring,
									)}
								>
									<span className={cn("scale-0 rounded-full bg-brand transition-transform", s.dot)} />
								</span>
							</span>
							<span className="min-w-0 select-none">
								<span className="block text-sm leading-5 text-text-900">{opt.label}</span>
								{opt.description && (
									<span id={`${optId}-description`} className="mt-0.5 block text-sm leading-5 text-text-500">
										{opt.description}
									</span>
								)}
							</span>
						</label>
					);
				})}
			</div>
			{error && (
				<p id={errorId} className="text-sm text-danger">
					{error}
				</p>
			)}
		</fieldset>
	);
}
