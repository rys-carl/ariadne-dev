// shared/ui/ApprovalStage.tsx — where a record is in an approval chain.
// Spec: "Approval Stage" Figma (AO → UM → AM → RD, "Current: UM" / "Done").
// Documented at /components/approval-stage.
import { Fragment } from "react";
import { cn } from "@/shared/lib/cn";

export type ApprovalStageProps = {
	/** Approver codes in order, e.g. ["AO", "UM", "AM", "RD"]. */
	stages: string[];
	/** Index of the stage awaiting approval (0-based); stages.length = done. */
	current: number;
	className?: string;
};

export function ApprovalStage({ stages, current, className }: ApprovalStageProps) {
	const done = current >= stages.length;
	const label = done ? "Done" : `Current: ${stages[current]}`;

	return (
		<div className={cn("text-sm leading-6", className)}>
			<p>
				<span className="sr-only">{`Approval chain ${stages.join(", ")}. ${label}.`}</span>
				<span aria-hidden>
					{stages.map((stage, i) => (
						<Fragment key={stage}>
							{i > 0 && <span className="mx-1 text-text-500">→</span>}
							<span className={cn("font-semibold", i <= current ? "text-brand-fg" : "text-text-500")}>{stage}</span>
						</Fragment>
					))}
				</span>
			</p>
			<p aria-hidden className="text-slate-500">
				{label}
			</p>
		</div>
	);
}
