// shared/lib/dates.ts — small date helpers for Calendar / DatePicker.
// Dates are local-time Date objects at midnight; no date library needed.

export type DateRange = { from?: Date; to?: Date };
export type TimeValue = { hours: number; minutes: number }; // 24-hour

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** Same day of month, clamped (Jan 31 + 1 month → Feb 28/29). */
export function addMonths(d: Date, n: number) {
	const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
	const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
	return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
}
export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
export const isSameDay = (a?: Date, b?: Date) =>
	!!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
/** Compare by calendar day: negative if a is earlier. */
export const compareDays = (a: Date, b: Date) => startOfDay(a).getTime() - startOfDay(b).getTime();

/** 6 rows × 7 days covering `month`, starting on `weekStartsOn` (0 = Sunday, 1 = Monday). */
export function monthGrid(month: Date, weekStartsOn = 1): Date[] {
	const first = startOfMonth(month);
	const offset = (first.getDay() - weekStartsOn + 7) % 7;
	const start = addDays(first, -offset);
	return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export const MONTHS = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = MONTHS.map((m) => m.slice(0, 3));

/** "Sep 14, 2026" */
export const formatDate = (d: Date) => `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

/** "Feb 8–22, 2026", "Jan 30 – Feb 4, 2026", "Dec 28, 2026 – Jan 3, 2027" */
export function formatRange({ from, to }: DateRange) {
	if (!from) return "";
	if (!to || isSameDay(from, to)) return formatDate(from);
	const m = (d: Date) => SHORT_MONTHS[d.getMonth()];
	if (from.getFullYear() !== to.getFullYear()) return `${formatDate(from)} – ${formatDate(to)}`;
	if (from.getMonth() !== to.getMonth()) return `${m(from)} ${from.getDate()} – ${m(to)} ${to.getDate()}, ${to.getFullYear()}`;
	return `${m(from)} ${from.getDate()}–${to.getDate()}, ${to.getFullYear()}`;
}

/** "08:30 AM" */
export function formatTime({ hours, minutes }: TimeValue) {
	const h12 = hours % 12 === 0 ? 12 : hours % 12;
	return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
}

/** Combine a date and a time into one Date. */
export const withTime = (d: Date, t: TimeValue) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.hours, t.minutes);
