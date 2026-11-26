// shared/ui/DatePicker.tsx — form field that opens a Calendar (and optional
// TimePicker) in a popup. Spec: "Date Picker" Figma. Documented at /components/date-picker.
//
//   <Field label="Due date"><DatePicker value={date} onChange={setDate} /></Field>
//   <DatePicker mode="range" value={range} onChange={setRange} />
//   <DatePicker withTime value={dateTime} onChange={setDateTime} />
//
// The popup is a native popover (top layer: never clipped, Escape and click
// outside close it, focus returns to the field).
"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CalendarDays, X } from "lucide-react";
import {
	formatDate,
	formatRange,
	formatTime,
	withTime as combine,
	type DateRange,
	type TimeValue,
} from "@/shared/lib/dates";
import { cn } from "@/shared/lib/cn";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { useFieldControl } from "./Field";
import { controlStyles } from "./Input";
import { TimePicker } from "./TimePicker";

type Common = {
	placeholder?: string;
	min?: Date;
	max?: Date;
	isDisabled?: (date: Date) => boolean;
	/** Show a clear (×) button when there's a value. */
	clearable?: boolean;
	invalid?: boolean;
	disabled?: boolean;
	id?: string;
	"aria-label"?: string;
	className?: string;
};

export type DatePickerProps = Common &
	(
		| { mode?: "single"; withTime?: false; value?: Date; onChange: (date: Date | undefined) => void }
		| { mode?: "single"; withTime: true; minuteStep?: number; value?: Date; onChange: (date: Date | undefined) => void }
		| { mode: "range"; withTime?: false; value?: DateRange; onChange: (range: DateRange | undefined) => void }
	);

const DEFAULT_TIME: TimeValue = { hours: 8, minutes: 0 };

export function DatePicker(props: DatePickerProps) {
	const { placeholder, min, max, isDisabled, clearable = true, className } = props;
	const { id, invalid, disabled, describedBy } = useFieldControl({
		id: props.id,
		invalid: props.invalid,
		disabled: props.disabled,
	});
	const panelId = useId();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

	// Draft state while the popup is open; committed on pick / Done.
	const [draftRange, setDraftRange] = useState<DateRange | undefined>();
	const [draftDate, setDraftDate] = useState<Date | undefined>();
	const [draftTime, setDraftTime] = useState<TimeValue>(DEFAULT_TIME);
	// Bumped on every open so the calendar remounts on the selected month.
	const [openCount, setOpenCount] = useState(0);

	const isRange = props.mode === "range";
	const hasTime = !isRange && props.withTime === true;

	const text = isRange
		? props.value?.from
			? formatRange(props.value)
			: ""
		: props.value
			? hasTime
				? `${formatDate(props.value)}, ${formatTime({ hours: props.value.getHours(), minutes: props.value.getMinutes() })}`
				: formatDate(props.value)
			: "";
	const hasValue = !!text;

	function place() {
		const b = buttonRef.current?.getBoundingClientRect();
		const p = panelRef.current;
		if (!b || !p) return;
		const vw = document.documentElement.clientWidth;
		const vh = window.innerHeight;
		const ph = p.offsetHeight;
		// Below the field if it fits, else above if that fits, else clamp into view.
		const top = b.bottom + 6 + ph <= vh - 8 ? b.bottom + 6 : b.top - 6 - ph >= 8 ? b.top - 6 - ph : vh - ph - 8;
		p.style.top = `${Math.max(8, top)}px`;
		p.style.left = `${Math.max(8, Math.min(b.left, vw - p.offsetWidth - 8))}px`;
	}

	useEffect(() => {
		if (!open) return;
		const r = () => place();
		window.addEventListener("resize", r);
		window.addEventListener("scroll", r, true);
		return () => {
			window.removeEventListener("resize", r);
			window.removeEventListener("scroll", r, true);
		};
	});

	const close = () => panelRef.current?.hidePopover();

	function onOpen() {
		setOpenCount((n) => n + 1);
		if (isRange) setDraftRange(props.value);
		else {
			setDraftDate(props.value);
			setDraftTime(props.value ? { hours: props.value.getHours(), minutes: props.value.getMinutes() } : DEFAULT_TIME);
		}
	}

	function clear() {
		props.onChange(undefined);
		buttonRef.current?.focus();
	}

	let body: ReactNode;
	let summary: string | undefined;
	if (isRange) {
		summary = draftRange?.from ? formatRange(draftRange) : "Pick a start date";
		body = (
			<Calendar
				mode="range"
				title={false}
				min={min}
				max={max}
				isDisabled={isDisabled}
				value={draftRange}
				onChange={(r) => {
					setDraftRange(r);
					// Commit once both ends are picked.
					if (r.from && r.to) {
						props.onChange(r);
						close();
					}
				}}
			/>
		);
	} else if (hasTime) {
		summary = draftDate ? formatDate(draftDate) : "Pick a date";
		body = (
			<div className="flex flex-col gap-6 sm:flex-row">
				<Calendar title={false} min={min} max={max} isDisabled={isDisabled} value={draftDate} onChange={setDraftDate} />
				<div className="border-text-100 sm:border-l sm:pl-6">
					<TimePicker
						value={draftTime}
						onChange={setDraftTime}
						minuteStep={"minuteStep" in props ? props.minuteStep : undefined}
						showSummary
					/>
				</div>
			</div>
		);
	} else {
		body = (
			<Calendar
				title={false}
				min={min}
				max={max}
				isDisabled={isDisabled}
				value={draftDate}
				onChange={(d) => {
					props.onChange(d);
					close();
				}}
			/>
		);
	}

	return (
		<div className={cn("relative w-full", className)}>
			<button
				ref={buttonRef}
				id={id}
				type="button"
				disabled={disabled}
				popoverTarget={panelId}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={panelId}
				// Invalid state is announced through the Field error message (aria-describedby).
				aria-describedby={describedBy}
				aria-label={props["aria-label"]}
				className={controlStyles({
					invalid,
					className: cn(
						"h-10 w-full cursor-pointer gap-2 px-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
						invalid ? "focus-visible:ring-danger" : "focus-visible:ring-brand",
						disabled && "cursor-not-allowed opacity-50",
						clearable && hasValue && "pr-9",
					),
				})}
			>
				<CalendarDays aria-hidden />
				<span className={cn("min-w-0 flex-1 truncate", !hasValue && (invalid ? "text-danger" : "text-text-500"))}>
					{text || placeholder || (isRange ? "Select date range" : hasTime ? "Select date and time" : "Select date")}
				</span>
			</button>
			{clearable && hasValue && !disabled && (
				<button
					type="button"
					onClick={clear}
					aria-label="Clear date"
					className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-text-500 hover:bg-text-100 hover:text-text-900"
				>
					<X className="size-4" />
				</button>
			)}

			<div
				ref={panelRef}
				id={panelId}
				popover="auto"
				role="dialog"
				aria-label={isRange ? "Choose date range" : hasTime ? "Choose date and time" : "Choose date"}
				onBeforeToggle={(e) => {
					if (e.newState === "open") onOpen();
				}}
				onToggle={(e) => {
					const nowOpen = e.newState === "open";
					setOpen(nowOpen);
					if (nowOpen) {
						place();
						// Focus the selected (or today's) day for keyboard users.
						requestAnimationFrame(() => panelRef.current?.querySelector<HTMLButtonElement>('[role=grid] button[tabindex="0"]')?.focus());
					}
				}}
				className="fixed m-0 max-h-[calc(100dvh-1rem)] overflow-auto rounded-xl border border-text-200 bg-surface p-4 text-text-900 shadow-xl [inset:auto]"
			>
				{summary && (
					<p aria-live="polite" className="mb-4 rounded-lg bg-brand-subtle px-4 py-2.5 text-center text-lg font-semibold text-brand-fg">
						{summary}
					</p>
				)}
				<div key={openCount}>{body}</div>
				{hasTime && (
					<div className="mt-4 flex justify-end gap-2 border-t border-text-100 pt-3">
						<Button variant="neutral" size="sm" onClick={close}>
							Cancel
						</Button>
						<Button
							size="sm"
							disabled={!draftDate}
							onClick={() => {
								if (draftDate) props.onChange(combine(draftDate, draftTime));
								close();
							}}
						>
							Done
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
