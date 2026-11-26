// shared/ui/Toggle.tsx — on / off switch for settings that apply immediately.
// Spec: "Toggle" Figma (Active = brand track with the knob on the right,
// Inactive = gray track with the knob on the left). Documented at /components/toggle.
//
//   <Toggle label="Email notifications" checked={on} onCheckedChange={setOn} />
//   <Toggle stateLabels={{ on: "Active", off: "Inactive" }} … />   // as in the spec
//
// A native checkbox with role="switch": Space toggles it, and screen readers
// announce "on" / "off".
"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";

const sizes = {
	sm: { track: "h-5 w-9", knob: "size-3.5", on: "peer-checked:[&>span]:translate-x-4" },
	md: { track: "h-6 w-11", knob: "size-4.5", on: "peer-checked:[&>span]:translate-x-5" },
	lg: { track: "h-8 w-[3.75rem]", knob: "size-6", on: "peer-checked:[&>span]:translate-x-7" },
} as const;

export type ToggleProps = Omit<ComponentProps<"input">, "type" | "size"> & {
	label?: ReactNode;
	description?: ReactNode;
	/** Text under the switch that follows its state, e.g. { on: "Active", off: "Inactive" }. */
	stateLabels?: { on: string; off: string };
	onCheckedChange?: (checked: boolean) => void;
	invalid?: boolean;
	size?: keyof typeof sizes;
	className?: string;
};

export function Toggle({
	label,
	description,
	stateLabels,
	onCheckedChange,
	onChange,
	invalid: invalidProp,
	disabled: disabledProp,
	id: idProp,
	size = "md",
	className,
	checked,
	defaultChecked,
	...props
}: ToggleProps) {
	const { id, invalid, disabled, describedBy } = useFieldControl({
		id: idProp,
		invalid: invalidProp,
		disabled: disabledProp,
		"aria-describedby": props["aria-describedby"],
	});
	// Always controlled internally (checked can start undefined): `checked`
	// wins when given, otherwise our own state, seeded from defaultChecked.
	const [innerOn, setInnerOn] = useState(!!defaultChecked);
	const on = checked ?? innerOn;
	// Own id fallback so the description is linked even outside a Field.
	const fallbackId = useId();
	const descriptionId = description ? `${id ?? fallbackId}-description` : undefined;
	const s = sizes[size];

	const control = (
		<span className="relative inline-flex shrink-0">
			<input
				id={id}
				type="checkbox"
				role="switch"
				disabled={disabled}
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
					"flex items-center rounded-full p-[3px] transition-colors duration-200",
					"bg-text-500 peer-checked:bg-brand",
					"peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
					invalid && "ring-2 ring-danger ring-offset-1",
					s.track,
					s.on,
				)}
			>
				<span className={cn("rounded-full bg-white shadow-sm transition-transform duration-200 motion-reduce:transition-none", s.knob)} />
			</span>
		</span>
	);

	return (
		<label className={cn("inline-flex gap-3", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", className)}>
			{stateLabels ? (
				<span className="inline-flex flex-col items-center gap-1.5">
					{control}
					<span aria-hidden className={cn("text-sm font-medium", on ? "text-brand-fg" : "text-text-500")}>
						{on ? stateLabels.on : stateLabels.off}
					</span>
				</span>
			) : (
				control
			)}
			{(label || description) && (
				<span className="min-w-0 select-none">
					{label && <span className="block text-sm leading-6 text-text-900">{label}</span>}
					{description && (
						<span id={descriptionId} className="block text-sm leading-5 text-text-500">
							{description}
						</span>
					)}
				</span>
			)}
		</label>
	);
}
