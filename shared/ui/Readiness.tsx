// shared/ui/Readiness.tsx — labelled completion bar (Ready / Near Ready / …).
// Spec: "Loading" Figma (Ready 100%, Near Ready 75%, In Progress 50%,
// Needs Work 25%, Not Ready 0%). Documented at /components/readiness.
import { cn } from "@/shared/lib/cn";

type Band = { min: number; label: string; text: string; bar: string };

// Bands are inclusive lower bounds, highest first.
const BANDS: Band[] = [
	{ min: 100, label: "Ready", text: "text-green-600", bar: "bg-green-600" },
	{ min: 75, label: "Near Ready", text: "text-blue-600", bar: "bg-blue-600" },
	{ min: 50, label: "In Progress", text: "text-amber-600", bar: "bg-amber-600" },
	{ min: 25, label: "Needs Work", text: "text-orange-600", bar: "bg-orange-600" },
	{ min: 0, label: "Not Ready", text: "text-red-600", bar: "bg-red-600" },
];

/** The band for a percentage: 100 → Ready, 75–99 → Near Ready, 50–74 → In Progress, 25–49 → Needs Work, under 25 → Not Ready. */
export function readinessBand(value: number) {
	return BANDS.find((b) => value >= b.min) ?? BANDS[BANDS.length - 1];
}

export type ReadinessProps = {
	/** 0–100. */
	value: number;
	/** Overrides the band label. */
	label?: string;
	className?: string;
};

export function Readiness({ value, label, className }: ReadinessProps) {
	const pct = Math.round(Math.max(0, Math.min(100, value)));
	const band = readinessBand(pct);
	const text = label ?? band.label;

	return (
		<div className={cn("flex w-44 flex-col gap-1.5", className)}>
			<span className={cn("text-sm font-medium", band.text)}>{text}</span>
			<div className="flex items-center gap-2">
				<div
					role="progressbar"
					aria-label={text}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={pct}
					className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200"
				>
					<div className={cn("h-full rounded-full", band.bar)} style={{ width: `${pct}%` }} />
				</div>
				<span className={cn("w-10 text-right text-sm font-medium tabular-nums", band.text)}>{pct}%</span>
			</div>
		</div>
	);
}
