"use client";

import { useState } from "react";
import {
	AlertTriangle,
	BookmarkCheck,
	ClipboardPaste,
	FileUp,
	Info,
	Link2,
	ListChecks,
	ListOrdered,
	RotateCcw,
} from "lucide-react";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Callout } from "@/shared/ui/Callout";
import { Icon } from "@/shared/ui/Icon";
import { Textarea } from "@/shared/ui/Textarea";
import { Typography } from "@/shared/ui/Typography";

const PLANNED_IMPORTS = [
	{
		id: "url",
		label: "Import from URL",
		icon: Link2,
	},
	{
		id: "file",
		label: "Upload PDF or DOCX",
		icon: FileUp,
	},
] as const;

const OUTCOMES = [
	{
		icon: ListOrdered,
		title: "Clear, sequential instructions",
		description: "Lengthy walkthroughs turned into focused, step-by-step actions.",
	},
	{
		icon: AlertTriangle,
		title: "Warnings & prerequisites preserved",
		description: "Missable items, point-of-no-return alerts, and prep notes kept intact.",
	},
	{
		icon: BookmarkCheck,
		title: "Progress tracking & resume",
		description: "Check off completed steps as you play and pick up where you left off.",
	},
] as const;

export function GuideWorkspace() {
	const [guideText, setGuideText] = useState("");
	const charCount = guideText.length;

	return (
		<main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
			{/* Intro */}
			<section className="space-y-3">
				<p className="text-sm font-medium text-brand-fg">Your guide through every quest.</p>
				<Typography variant="h2" as="h1" className="text-3xl font-bold tracking-tight sm:text-4xl">
					Your guide. Your progress. Your game.
				</Typography>
				<Typography variant="p" className="max-w-2xl text-base text-text-500 sm:text-lg">
					Turn lengthy game guides into clear, actionable steps. Spend less time searching and more time playing.
				</Typography>
			</section>

			{/* Primary Guide Input Panel */}
			<section
				aria-labelledby="guide-input-heading"
				className="mt-8 rounded-xl border border-text-200 bg-surface p-4 shadow-sm sm:p-6"
			>
				<div className="flex flex-wrap items-center justify-between gap-2">
					<Typography id="guide-input-heading" variant="h5" as="h2">
						Add your game guide
					</Typography>
					<Badge tone="success" shape="tag">
						Step 1 of 3
					</Badge>
				</div>

				{/* Import options */}
				<div
					role="group"
					aria-label="Import method"
					className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
				>
					<div className="flex items-center justify-between gap-2 rounded-lg border border-brand/40 bg-brand-subtle px-3 py-2.5 text-sm font-medium text-brand-fg">
						<span className="flex min-w-0 items-center gap-2">
							<Icon icon={ClipboardPaste} size="md" />
							<span className="truncate">Paste text</span>
						</span>
						<Badge tone="success" size="sm">
							Available
						</Badge>
					</div>

					{PLANNED_IMPORTS.map(({ id, label, icon }) => (
						<div
							key={id}
							aria-disabled="true"
							className="flex items-center justify-between gap-2 rounded-lg border border-text-200 bg-canvas px-3 py-2.5 text-sm text-text-500 opacity-75"
						>
							<span className="flex min-w-0 items-center gap-2">
								<Icon icon={icon} size="md" tone="muted" />
								<span className="truncate">{label}</span>
							</span>
							<Badge tone="neutral" size="sm">
								Coming later
							</Badge>
						</div>
					))}
				</div>

				{/* Guide textarea */}
				<div className="mt-4">
					<label htmlFor="guide-text-input" className="sr-only">
						Game guide content
					</label>
					<Textarea
						id="guide-text-input"
						rows={11}
						value={guideText}
						onChange={(e) => setGuideText(e.target.value)}
						placeholder="Paste a walkthrough, boss strategy, quest guide, or build notes here..."
						className="min-h-[220px] font-normal sm:min-h-[260px]"
					/>
				</div>

				{/* Character count & primary action */}
				<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3 text-xs text-text-500">
						<span>{charCount.toLocaleString()} characters</span>
						{charCount > 0 && (
							<Button
								variant="ghost"
								size="xs"
								leftIcon={<RotateCcw />}
								onClick={() => setGuideText("")}
								className="text-text-600 hover:bg-text-100"
							>
								Clear
							</Button>
						)}
					</div>

					<Button
						disabled
						leftIcon={<ListChecks />}
						className="w-full sm:w-auto"
					>
						Turn guide into steps
					</Button>
				</div>

				<Callout tone="info" className="mt-4 flex items-start gap-2.5">
					<Icon icon={Info} size="md" className="mt-0.5 shrink-0" />
					<span>
						Guide processing is coming next. You can paste and review your guide text here now—AI step extraction will be enabled in the next phase.
					</span>
				</Callout>
			</section>

			{/* Compact guidance on what the companion produces */}
			<section aria-label="What you will get" className="mt-8">
				<div className="grid gap-3 sm:grid-cols-3">
					{OUTCOMES.map(({ icon, title, description }) => (
						<div
							key={title}
							className="rounded-lg border border-text-200 bg-surface/70 p-4"
						>
							<div className="flex items-center gap-2 text-sm font-medium text-text-900">
								<Icon icon={icon} size="md" tone="brand" />
								<span>{title}</span>
							</div>
							<p className="mt-1.5 text-xs leading-5 text-text-500">{description}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
