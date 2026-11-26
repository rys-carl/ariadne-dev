// shared/ui/Stepper.tsx — progress through a multi-step flow.
// Spec: "Stepper" Figma (done = solid check, current = numbered ring,
// upcoming = gray number). Documented at /components/stepper.
import { Fragment } from "react";
import { cn } from "@/shared/lib/cn";
import { CheckIndicator } from "./CheckIndicator";

export type StepperProps = {
	/** Step labels, in order. */
	steps: string[];
	/** Index of the current step (0-based). Steps before it are complete. */
	current: number;
	className?: string;
};

export function Stepper({ steps, current, className }: StepperProps) {
	return (
		<ol className={cn("flex w-full items-start", className)}>
			{steps.map((label, i) => {
				const state = i < current ? "done" : i === current ? "current" : "upcoming";
				return (
					<Fragment key={label}>
						{i > 0 && (
							<li
								aria-hidden
								className={cn("mx-2 mt-2.5 h-0.5 min-w-6 flex-1 rounded-full", i <= current ? "bg-brand" : "bg-text-200")}
							/>
						)}
						<li aria-current={state === "current" ? "step" : undefined} className="flex shrink-0 flex-col items-center gap-1.5">
							{state === "done" ? (
								<CheckIndicator variant="solid" />
							) : (
								<span
									className={cn(
										"flex size-5 items-center justify-center rounded-full text-[11px] font-medium",
										state === "current" ? "border-[1.5px] border-brand text-brand-fg" : "bg-text-200 text-text-400",
									)}
								>
									{i + 1}
								</span>
							)}
							<span
								className={cn(
									"whitespace-nowrap text-xs",
									state === "upcoming" ? "text-text-400" : "font-semibold text-text-900",
								)}
							>
								{label}
								{state === "done" && <span className="sr-only"> (completed)</span>}
							</span>
						</li>
					</Fragment>
				);
			})}
		</ol>
	);
}
