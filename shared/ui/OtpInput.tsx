// shared/ui/OtpInput.tsx — one-time password / PIN boxes.
// Spec: "OTP" Figma (Default / Focus / Filled / Disabled × Default / Destructive).
// Documented at /components/input-otp.
//
// Typing advances, Backspace goes back, arrows move, and pasting a code
// fills every box. autoComplete="one-time-code" lets phones autofill SMS codes.
"use client";

import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";
import { controlStyles } from "./Input";

export type OtpInputProps = {
	/** Number of boxes. */
	length?: number;
	/** Controlled value (no separators). */
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	/** Called once every box is filled. */
	onComplete?: (value: string) => void;
	/** "numeric" accepts 0–9; "alphanumeric" also accepts letters (uppercased). */
	pattern?: "numeric" | "alphanumeric";
	invalid?: boolean;
	disabled?: boolean;
	id?: string;
	/** Accessible name when not inside a <Field label>. */
	"aria-label"?: string;
	className?: string;
};

export function OtpInput({
	length = 6,
	value: valueProp,
	defaultValue = "",
	onChange,
	onComplete,
	pattern = "numeric",
	invalid: invalidProp,
	disabled: disabledProp,
	id: idProp,
	"aria-label": ariaLabel,
	className,
}: OtpInputProps) {
	const { id, invalid, disabled, describedBy } = useFieldControl({
		id: idProp,
		invalid: invalidProp,
		disabled: disabledProp,
	});
	const [inner, setInner] = useState(defaultValue);
	const value = (valueProp ?? inner).slice(0, length);
	const refs = useRef<(HTMLInputElement | null)[]>([]);

	const allowed = pattern === "numeric" ? /[0-9]/ : /[0-9a-zA-Z]/;
	const clean = (text: string) =>
		text
			.split("")
			.filter((ch) => allowed.test(ch))
			.join("")
			.toUpperCase();

	function commit(next: string) {
		const v = next.slice(0, length);
		if (valueProp === undefined) setInner(v);
		onChange?.(v);
		if (v.length === length) onComplete?.(v);
	}

	const focusBox = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

	function handleInput(i: number, raw: string) {
		const chars = clean(raw);
		if (!chars) return;
		// Typing over a filled box replaces it; extra characters flow into the next boxes.
		const next = (value.slice(0, i) + chars + value.slice(i + chars.length)).slice(0, length);
		commit(next);
		focusBox(i + chars.length);
	}

	function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Backspace") {
			e.preventDefault();
			if (value[i]) commit(value.slice(0, i) + value.slice(i + 1));
			else if (i > 0) {
				commit(value.slice(0, i - 1) + value.slice(i));
				focusBox(i - 1);
			}
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			focusBox(i - 1);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			focusBox(i + 1);
		}
	}

	function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
		e.preventDefault();
		const chars = clean(e.clipboardData.getData("text")).slice(0, length);
		if (!chars) return;
		commit(chars);
		focusBox(chars.length);
	}

	return (
		<div
			role="group"
			aria-label={ariaLabel}
			aria-describedby={describedBy}
			className={cn("flex items-center gap-2", className)}
		>
			{Array.from({ length }, (_, i) => (
				<div key={i} className={controlStyles({ invalid, className: "size-11 shrink-0 justify-center" })}>
					<input
						ref={(node) => {
							refs.current[i] = node;
						}}
						// The Field label points at the first box.
						id={i === 0 ? id : undefined}
						aria-label={`Character ${i + 1} of ${length}`}
						aria-invalid={invalid || undefined}
						inputMode={pattern === "numeric" ? "numeric" : "text"}
						autoComplete={i === 0 ? "one-time-code" : "off"}
						maxLength={length}
						disabled={disabled}
						value={value[i] ?? ""}
						onChange={(e) => handleInput(i, e.target.value.replace(value[i] ?? "", "") || e.target.value)}
						onKeyDown={(e) => handleKeyDown(i, e)}
						onPaste={handlePaste}
						onFocus={(e) => e.target.select()}
						className="size-full bg-transparent text-center text-base caret-current outline-none disabled:cursor-not-allowed"
					/>
				</div>
			))}
		</div>
	);
}
