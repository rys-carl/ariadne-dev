"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const TABS = ["Preview", "Code"] as const;

// Client half of ComponentPreview: the server renders both the live demo and
// the code block, this only switches which one is visible.
export default function PreviewTabs({ preview, code }: { preview: ReactNode; code: ReactNode }) {
	const [tab, setTab] = useState<(typeof TABS)[number]>("Preview");

	return (
		<div className="space-y-3">
			<div role="tablist" className="flex gap-4 border-b border-text-200">
				{TABS.map((t) => (
					<button
						key={t}
						type="button"
						role="tab"
						aria-selected={tab === t}
						onClick={() => setTab(t)}
						className={cn(
							"-mb-px cursor-pointer border-b-2 pb-2 text-sm font-medium transition-colors",
							tab === t
								? "border-brand text-text-900"
								: "border-transparent text-text-500 hover:text-text-800",
						)}
					>
						{t}
					</button>
				))}
			</div>
			<div role="tabpanel">
				{tab === "Preview" ? (
					<div className="flex min-h-48 items-center justify-center overflow-x-auto rounded-xl border border-text-200 bg-surface p-8 [background-image:radial-gradient(var(--color-text-200)_1px,transparent_1px)] [background-size:16px_16px]">
						{preview}
					</div>
				) : (
					code
				)}
			</div>
		</div>
	);
}
