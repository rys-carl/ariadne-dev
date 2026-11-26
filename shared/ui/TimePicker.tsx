// shared/ui/TimePicker.tsx — hour / minute columns with AM / PM.
// Spec: "Date Picker" Figma (Select Time card). Documented at /components/time-picker.
//
//   <TimePicker value={{ hours: 8, minutes: 30 }} onChange={setTime} />
//
// Each column is a spin button: click a nearby value or the arrows, scroll
// with the mouse wheel, or use ↑ / ↓ / PageUp / PageDown / Home / End.
"use client";

import { type KeyboardEvent, type WheelEvent } from "react";
import { ChevronDown, ChevronUp, Timer } from "lucide-react";
import { formatTime, type TimeValue } from "@/shared/lib/dates";
import { cn } from "@/shared/lib/cn";

export type TimePickerProps = {
	value: TimeValue;
	onChange: (value: TimeValue) => void;
	/** Minute increments, e.g. 5 or 15. Defaults to 1. */
	minuteStep?: number;
	/** Show the "Select Time" title row. */
	title?: string | false;
	/** Show the large "08:30 AM" readout above the columns. */
	showSummary?: boolean;
	className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const mod = (n: number, m: number) => ((n % m) + m) % m;

function Column({
	label,
	values,
	index,
	onIndexChange,
	format = pad,
}: {
	label: string;
	values: number[];
	index: number;
	onIndexChange: (i: number) => void;
	format?: (n: number) => string;
}) {
	const n = values.length;
	const step = (by: number) => onIndexChange(mod(index + by, n));

	function onKeyDown(e: KeyboardEvent) {
		const map: Record<string, () => void> = {
			ArrowUp: () => step(-1),
			ArrowDown: () => step(1),
			PageUp: () => step(-5),
			PageDown: () => step(5),
			Home: () => onIndexChange(0),
			End: () => onIndexChange(n - 1),
		};
		if (map[e.key]) {
			e.preventDefault();
			map[e.key]();
		}
	}

	function onWheel(e: WheelEvent) {
		if (Math.abs(e.deltaY) < 4) return;
		step(e.deltaY > 0 ? 1 : -1);
	}

	const arrow =
		"flex h-7 w-11 cursor-pointer items-center justify-center rounded-md text-text-400 transition-colors hover:bg-text-100 hover:text-text-700";

	return (
		<div className="flex flex-col items-center">
			<button type="button" tabIndex={-1} aria-hidden className={arrow} onClick={() => step(-1)}>
				<ChevronUp className="size-4" />
			</button>
			<div
				role="spinbutton"
				tabIndex={0}
				aria-label={label}
				aria-valuenow={values[index]}
				aria-valuetext={format(values[index])}
				aria-valuemin={values[0]}
				aria-valuemax={values[n - 1]}
				onKeyDown={onKeyDown}
				onWheel={onWheel}
				className="flex flex-col items-center gap-1 rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-brand"
			>
				{[-2, -1, 0, 1, 2].map((offset) => {
					const i = mod(index + offset, n);
					const current = offset === 0;
					return (
						<button
							key={offset}
							type="button"
							tabIndex={-1}
							aria-hidden={!current}
							onClick={() => onIndexChange(i)}
							className={cn(
								"flex h-8 w-11 cursor-pointer items-center justify-center rounded-md text-sm tabular-nums transition-colors",
								current ? "bg-brand font-semibold text-white" : "hover:bg-text-100",
								Math.abs(offset) === 2 ? "text-text-400" : !current && "text-text-700",
							)}
						>
							{format(values[i])}
						</button>
					);
				})}
			</div>
			<button type="button" tabIndex={-1} aria-hidden className={arrow} onClick={() => step(1)}>
				<ChevronDown className="size-4" />
			</button>
			<span aria-hidden className="mt-1 text-[11px] text-text-400">
				{label}
			</span>
		</div>
	);
}

export function TimePicker({ value, onChange, minuteStep = 1, title = "Select Time", showSummary = false, className }: TimePickerProps) {
	const hours12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1–12
	const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);
	const pm = value.hours >= 12;
	const h12 = value.hours % 12 === 0 ? 12 : value.hours % 12;
	const minuteIndex = Math.max(0, minutes.findIndex((m) => m >= value.minutes));

	const setHour12 = (h: number) => onChange({ ...value, hours: (h % 12) + (pm ? 12 : 0) });
	const setPeriod = (toPm: boolean) => toPm !== pm && onChange({ ...value, hours: (value.hours + 12) % 24 });

	return (
		<div className={cn("w-fit", className)}>
			{title && (
				<p className="mb-3 flex items-center gap-2 text-sm text-text-700">
					<Timer className="size-4" aria-hidden />
					{title}
				</p>
			)}
			{showSummary && (
				<p aria-live="polite" className="mb-3 rounded-lg bg-brand-subtle px-4 py-2 text-center text-2xl font-semibold tabular-nums text-brand-fg">
					{formatTime(value).replace(/ (AM|PM)$/, "")}
					<span className="ml-1 align-top text-xs font-medium">{pm ? "PM" : "AM"}</span>
				</p>
			)}
			<div role="group" aria-label="Time" className="flex items-start gap-2">
				<Column label="Hour" values={hours12} index={hours12.indexOf(h12)} onIndexChange={(i) => setHour12(hours12[i])} />
				<Column label="Min" values={minutes} index={minuteIndex} onIndexChange={(i) => onChange({ ...value, minutes: minutes[i] })} />
				<div role="radiogroup" aria-label="AM or PM" className="ml-1 flex flex-col gap-2 pt-[4.75rem]">
					{(["AM", "PM"] as const).map((p) => {
						const checked = (p === "PM") === pm;
						return (
							<button
								key={p}
								type="button"
								role="radio"
								aria-checked={checked}
								onClick={() => setPeriod(p === "PM")}
								className={cn(
									"h-8 w-11 cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand",
									checked ? "bg-brand text-white" : "bg-text-100 text-text-600 hover:bg-text-200",
								)}
							>
								{p}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
