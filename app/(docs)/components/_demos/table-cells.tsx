import { ApprovalStage } from "@/shared/ui/ApprovalStage";
import { ClientCell } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { Readiness } from "@/shared/ui/Readiness";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { Amount, NullValue } from "@/shared/ui/TableCells";

// Every cell type from the spec, top to bottom.
export default function TableCells() {
	return (
		<div className="flex flex-col items-start gap-3 text-left text-sm">
			<span className="text-base font-medium text-text-900">Client</span>
			<span className="font-semibold text-text-900">ACC-2024-001</span>
			<Amount value={-29000} signed />
			<Amount value={29000} signed />
			<span className="text-text-900">ACC-2024-001</span>
			<span className="text-slate-500">ACC-2024-001</span>
			<NullValue />
			<span className="flex gap-2">
				<Button size="sm">Approved</Button>
				<Button size="sm" tone="destructive">Rejected</Button>
			</span>
			<ApprovalStage stages={["AO", "UM", "AM", "RD"]} current={1} />
			<StatusBadge status="Pending UM Approval" />
			<Readiness value={100} />
			<ClientCell name="Maria Santos" id="CID-2024-0001" />
		</div>
	);
}
