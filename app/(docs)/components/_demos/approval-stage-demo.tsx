import { ApprovalStage } from "@/shared/ui/ApprovalStage";

const STAGES = ["AO", "UM", "AM", "RD"];

export default function ApprovalStageDemo() {
	return (
		<div className="grid gap-5 text-left sm:grid-cols-3">
			{[0, 1, 2, 3, 4].map((current) => (
				<ApprovalStage key={current} stages={STAGES} current={current} />
			))}
		</div>
	);
}
