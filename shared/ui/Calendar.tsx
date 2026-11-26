// shared/ui/Calendar.tsx — month grid for picking a date or a date range.
// Spec: "Date Picker" Figma (Select Date card). Documented at /components/calendar.
//
//   <Calendar value={date} onChange={setDate} />
//   <Calendar mode="range" value={range} onChange={setRange} />
//
// Keyboard (WAI-ARIA grid): arrows move by day / week, PageUp / PageDown by
// month, Home / End to the start / end of the week, Enter or Space selects.
"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
	MONTHS,
	addDays,
	addMonths,
	compareDays,
	isSameDay,
	isSameMonth,
	monthGrid,
	startOfDay,
	startOfMonth,
	type DateRange,
} from "@/shared/lib/dates";
import { cn } from "@/shared/lib/cn";

type Common = {
	/** Earliest selectable day. */
	min?: Date;
	/** Latest selectable day. */
	max?: Date;
	/** Disable specific days, e.g. weekends or holidays. */
	isDisabled?: (date: Date) => boolean;
	/** Month shown first (defaults to the selected date, or today). */
	defaultMonth?: Date;
	/** 1 = Monday (default, as in the spec), 0 = Sunday. */
	weekStartsOn?: 0 | 1;
	/** Show the "Select Date" title row. */
	title?: string | false;
	className?: string;
};

export type CalendarProps = Common &
	(
		| { mode?: "single"; value?: Date; onChange?: (date: Date) => void }
		| { mode: "range"; value?: DateRange; onChange?: (range: DateRange) => void }
	);

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MonthYearSelect({
	value,
	options,
	label,
	onChange,
}: {
	value: number;
	options: { value: number; label: string }[];
	label: string;
	onChange: (v: number) => void;
}) {
	return (
		<span className="relative">
			<select
				aria-label={label}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="h-8 cursor-pointer appearance-none rounded-md border border-text-200 bg-surface pl-2.5 pr-7 text-sm font-medium text-text-900 outline-none focus-visible:ring-2 focus-visible:ring-brand"
			>
				{options.map((o) => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>
			<ChevronDown aria-hidden className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-text-600" />
		</span>
	);
}

export function Calendar(props: CalendarProps) {
	const { min, max, isDisabled, defaultMonth, weekStartsOn = 1, title = "Select Date", className } = props;
	const today = startOfDay(new Date());
	const anchor = props.mode === "range" ? props.value?.from : props.value;
	const [month, setMonth] = useState(() => startOfMonth(defaultMonth ?? anchor ?? today));
	const [focused, setFocused] = useState<Date>(() => anchor ?? today);
	const [hovered, setHovered] = useState<Date>();
	const moveFocusRef = useRef(false);
	const gridRef = useRef<HTMLDivElement>(null);

	// After keyboard navigation, move DOM focus to the newly focused day.
	useEffect(() => {
		if (!moveFocusRef.current) return;
		moveFocusRef.current = false;
		gridRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
	}, [focused, month]);

	const disabled = (d: Date) =>
		(min && compareDays(d, min) < 0) || (max && compareDays(d, max) > 0) || !!isDisabled?.(d);

	function select(d: Date) {
		if (disabled(d)) return;
		if (props.mode === "range") {
			const { from, to } = props.value ?? {};
			// Start a new range unless we're completing one.
			if (!from || to) props.onChange?.({ from: d, to: undefined });
			else if (compareDays(d, from) < 0) props.onChange?.({ from: d, to: from });
			else props.onChange?.({ from, to: d });
		} else props.onChange?.(d);
		setFocused(d);
		if (!isSameMonth(d, month)) setMonth(startOfMonth(d));
	}

	function onKeyDown(e: KeyboardEvent) {
		const dow = (focused.getDay() - weekStartsOn + 7) % 7;
		const next =
			e.key === "ArrowLeft" ? addDays(focused, -1)
			: e.key === "ArrowRight" ? addDays(focused, 1)
			: e.key === "ArrowUp" ? addDays(focused, -7)
			: e.key === "ArrowDown" ? addDays(focused, 7)
			: e.key === "PageUp" ? addMonths(focused, e.shiftKey ? -12 : -1)
			: e.key === "PageDown" ? addMonths(focused, e.shiftKey ? 12 : 1)
			: e.key === "Home" ? addDays(focused, -dow)
			: e.key === "End" ? addDays(focused, 6 - dow)
			: undefined;
		if (next) {
			e.preventDefault();
			moveFocusRef.current = true;
			setFocused(next);
			if (!isSameMonth(next, month)) setMonth(startOfMonth(next));
		}
	}

	// Range shown: the committed range, or a hover preview while picking the end.
	const range: DateRange | undefined =
		props.mode === "range"
			? props.value?.from && !props.value.to && hovered
				? compareDays(hovered, props.value.from) < 0
					? { from: hovered, to: props.value.from }
					: { from: props.value.from, to: hovered }
				: props.value
			: undefined;

	const days = monthGrid(month, weekStartsOn);
	const weekdays = Array.from({ length: 7 }, (_, i) => WEEKDAYS[(i + weekStartsOn) % 7]);
	const thisYear = today.getFullYear();
	const minYear = min?.getFullYear() ?? thisYear - 100;
	const maxYear = max?.getFullYear() ?? thisYear + 20;
	const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
	const canPrev = !min || compareDays(startOfMonth(month), startOfMonth(min)) > 0;
	const canNext = !max || compareDays(startOfMonth(month), startOfMonth(max)) < 0;
	const arrow =
		"flex size-8 cursor-pointer items-center justify-center rounded-md text-text-700 transition-colors hover:bg-text-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-brand";

	return (
		<div className={cn("w-full min-w-72 max-w-sm", className)}>
			{title && (
				<p className="mb-3 flex items-center gap-2 text-sm text-text-700">
					<CalendarDays className="size-4" aria-hidden />
					{title}
				</p>
			)}
			<div className="mb-3 flex items-center justify-between gap-2">
				<button type="button" className={arrow} disabled={!canPrev} onClick={() => setMonth(addMonths(month, -1))} aria-label="Previous month">
					<ChevronLeft className="size-4" />
				</button>
				<div className="flex gap-2">
					<MonthYearSelect
						label="Month"
						value={month.getMonth()}
						options={MONTHS.map((m, i) => ({ value: i, label: m }))}
						onChange={(m) => setMonth(new Date(month.getFullYear(), m, 1))}
					/>
					<MonthYearSelect
						label="Year"
						value={month.getFullYear()}
						options={years.map((y) => ({ value: y, label: String(y) }))}
						onChange={(y) => setMonth(new Date(y, month.getMonth(), 1))}
					/>
				</div>
				<button type="button" className={arrow} disabled={!canNext} onClick={() => setMonth(addMonths(month, 1))} aria-label="Next month">
					<ChevronRight className="size-4" />
				</button>
			</div>

			<div
				ref={gridRef}
				role="grid"
				aria-label={`${MONTHS[month.getMonth()]} ${month.getFullYear()}`}
				onKeyDown={onKeyDown}
				onMouseLeave={() => setHovered(undefined)}
				className="grid grid-cols-7 gap-y-1 text-sm"
			>
				<div role="row" className="contents">
					{weekdays.map((d) => (
						<span key={d} role="columnheader" aria-label={d} className="flex h-8 items-center justify-center text-xs text-text-500">
							{d}
						</span>
					))}
				</div>
				{Array.from({ length: 6 }, (_, w) => (
					<div key={w} role="row" className="contents">
						{days.slice(w * 7, w * 7 + 7).map((d) => {
							const outside = !isSameMonth(d, month);
							const off = disabled(d);
							const single = props.mode !== "range" && isSameDay(d, props.value);
							const isFrom = !!range?.from && isSameDay(d, range.from);
							const isTo = !!range?.to && isSameDay(d, range.to);
							const between =
								!!range?.from && !!range?.to && compareDays(d, range.from) > 0 && compareDays(d, range.to) < 0;
							const selected = single || isFrom || isTo;
							const isFocusTarget = isSameDay(d, focused) && isSameMonth(focused, month);
							// Roving tabindex: the focused day, or the 1st when focus is on another month.
							const tabbable = isFocusTarget || (!isSameMonth(focused, month) && d.getDate() === 1 && !outside);
							return (
								<div key={d.toISOString()} role="gridcell" aria-selected={selected || between} className="flex justify-center">
									<button
										type="button"
										tabIndex={tabbable ? 0 : -1}
										disabled={off}
										aria-label={d.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
										aria-current={isSameDay(d, today) ? "date" : undefined}
										onClick={() => select(d)}
										onMouseEnter={() => props.mode === "range" && setHovered(d)}
										onFocus={() => !isSameDay(d, focused) && setFocused(d)}
										className={cn(
											"relative flex size-9 cursor-pointer items-center justify-center rounded-md tabular-nums transition-colors",
											"focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
											"disabled:cursor-not-allowed disabled:text-text-300 disabled:line-through",
											selected
												? "bg-brand font-semibold text-white"
												: between
													? "bg-brand-subtle text-brand-fg"
													: outside
														? "text-text-400 hover:bg-text-100"
														: "text-text-900 hover:bg-text-100",
										)}
									>
										{d.getDate()}
										{isSameDay(d, today) && !selected && (
											<span aria-hidden className="absolute bottom-1 size-1 rounded-full bg-brand" />
										)}
									</button>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}
