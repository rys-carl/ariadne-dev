"use client";

// The Tailwind type scale from the "Tailwind CSS Typography" Figma frame:
// every text size with its line-height and tracking, previewable in each weight.
import { useState } from "react";
import { cn } from "@/shared/lib/cn";

const WEIGHTS = [
	{ label: "Regular", className: "font-normal" },
	{ label: "Medium", className: "font-medium" },
	{ label: "Semibold", className: "font-semibold" },
	{ label: "Bold", className: "font-bold" },
	{ label: "Black", className: "font-black" },
] as const;

// tracking-tight = -2.5%, which the spec applies from text-xl upward.
const SCALE = [
	{ size: "text-9xl", spec: "128px / 100% / -2.5%", classes: "text-9xl leading-none tracking-tight", sample: "Maaax size" },
	{ size: "text-8xl", spec: "96px / 100% / -2.5%", classes: "text-8xl leading-none tracking-tight", sample: "Standout titles" },
	{ size: "text-7xl", spec: "72px / 100% / -2.5%", classes: "text-7xl leading-none tracking-tight", sample: "For bold titles" },
	{ size: "text-6xl", spec: "60px / 100% / -2.5%", classes: "text-6xl leading-none tracking-tight", sample: "Great for very large titles" },
	{ size: "text-5xl", spec: "48px / 100% / -2.5%", classes: "text-5xl leading-none tracking-tight", sample: "Suitable for large headings" },
	{ size: "text-4xl", spec: "36px / 40px / -2.5%", classes: "text-4xl leading-10 tracking-tight", sample: "Perfect for major section headers" },
	{ size: "text-3xl", spec: "30px / 36px / -0.75px", classes: "text-3xl leading-9 tracking-tight", sample: "Used for significant titles and headers" },
	{ size: "text-2xl", spec: "24px / 32px / -0.6px", classes: "text-2xl leading-8 tracking-tight", sample: "Ideal for prominent headings and subheadings" },
	{ size: "text-xl", spec: "20px / 28px / -0.5px", classes: "text-xl leading-7 tracking-tight", sample: "Extra large size, for main headings or important elements" },
	{ size: "text-lg", spec: "18px / 28px / 0", classes: "text-lg leading-7", sample: "Large text, for subheadings or slightly emphasized text and calls to action." },
	{ size: "text-base", spec: "16px / 24px / 0", classes: "text-base leading-6", sample: "Base size, the standard for body text in most documents and interfaces." },
	{ size: "text-sm", spec: "14px / 20px / 0", classes: "text-sm leading-5", sample: "Slightly small text, for captions or secondary information such as metadata or annotations." },
	{ size: "text-xs", spec: "12px / 16px / 0", classes: "text-xs leading-4", sample: "Extra small text, for fine print, disclaimers and legal text where space is limited." },
];

export default function TypeScale() {
	const [weight, setWeight] = useState<(typeof WEIGHTS)[number]>(WEIGHTS[0]);

	return (
		<div className="space-y-4">
			<div role="radiogroup" aria-label="Font weight" className="flex w-fit flex-wrap gap-1 rounded-lg bg-text-100 p-1">
				{WEIGHTS.map((w) => (
					<button
						key={w.label}
						type="button"
						role="radio"
						aria-checked={weight.label === w.label}
						onClick={() => setWeight(w)}
						className={cn(
							"cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
							weight.label === w.label ? "bg-surface text-text-900 shadow-sm" : "text-text-500 hover:text-text-800",
						)}
					>
						{w.label}
					</button>
				))}
			</div>

			<div className="divide-y divide-text-100 rounded-xl border border-text-200">
				{SCALE.map((row) => (
					<div key={row.size} className="grid gap-3 p-5 md:grid-cols-[11rem_1fr] md:gap-6">
						<div className="space-y-1">
							<p className="font-mono text-sm font-medium text-brand-fg">{row.size}</p>
							<p className="text-xs text-text-500">{row.spec}</p>
							<p className="font-mono text-[11px] leading-4 text-text-400">
								{row.classes} {weight.className}
							</p>
						</div>
						<p className={cn("min-w-0 truncate text-text-900", row.classes, weight.className)} title={row.sample}>
							{row.sample}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
