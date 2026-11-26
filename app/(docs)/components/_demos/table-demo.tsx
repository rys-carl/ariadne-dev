"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { ApprovalStage } from "@/shared/ui/ApprovalStage";
import { ClientCell } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Pagination } from "@/shared/ui/Pagination";
import { Readiness } from "@/shared/ui/Readiness";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { Table, type TableColumn } from "@/shared/ui/Table";
import { Amount } from "@/shared/ui/TableCells";

type Loan = { id: string; client: string; cid: string; amount: number; stage: number; status: string; readiness: number };

const NAMES = ["Maria Santos", "Juan Dela Cruz", "Ana Reyes", "Carlos Garcia", "Liza Mendoza", "Paolo Cruz", "Grace Lim"];
const STATUSES = ["Pending UM Approval", "Approved", "For Review", "Rejected", "Submitted", "Draft"];
const LOANS: Loan[] = Array.from({ length: 23 }, (_, i) => ({
	id: `ACC-2024-${String(i + 1).padStart(3, "0")}`,
	client: NAMES[i % NAMES.length],
	cid: `CID-2024-${String(1000 + i * 7).padStart(4, "0")}`,
	amount: (i % 3 === 0 ? -1 : 1) * (5000 + ((i * 3797) % 40000)),
	stage: i % 5,
	status: STATUSES[i % STATUSES.length],
	readiness: [100, 75, 50, 25, 0][i % 5],
}));

const columns: TableColumn<Loan>[] = [
	{ key: "client", header: "Client", cell: (r) => <ClientCell name={r.client} id={r.cid} /> },
	{ key: "account", header: "Account", cell: (r) => <span className="font-semibold">{r.id}</span> },
	{ key: "amount", header: "Amount", align: "right", cell: (r) => <Amount value={r.amount} signed /> },
	{ key: "stage", header: "Approval", cell: (r) => <ApprovalStage stages={["AO", "UM", "AM", "RD"]} current={r.stage} /> },
	{ key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
	{ key: "readiness", header: "Readiness", cell: (r) => <Readiness value={r.readiness} className="w-36" /> },
	{
		key: "actions",
		header: <span className="sr-only">Actions</span>,
		cell: (r) => (
			<span className="flex gap-2" onClick={(e) => e.stopPropagation()}>
				<Button size="sm" leftIcon={<Check />} aria-label={`Approve ${r.id}`}>Approve</Button>
				<Button size="sm" tone="destructive" leftIcon={<X />} aria-label={`Reject ${r.id}`}>Reject</Button>
			</span>
		),
	},
];

export default function TableDemo() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [selected, setSelected] = useState<string>();
	const [mode, setMode] = useState<"data" | "loading" | "empty">("data");

	const rows = mode === "empty" ? [] : LOANS.slice((page - 1) * pageSize, page * pageSize);

	return (
		<div className="flex w-full flex-col gap-4 text-left">
			<div className="flex gap-2">
				{(["data", "loading", "empty"] as const).map((m) => (
					<Button key={m} size="xs" variant={mode === m ? "primary" : "neutral"} onClick={() => setMode(m)}>
						{m === "data" ? "Data" : m === "loading" ? "Loading" : "Empty"}
					</Button>
				))}
			</div>
			<Table
				caption="Loan applications"
				columns={columns}
				rows={rows}
				getRowKey={(r) => r.id}
				loading={mode === "loading"}
				onRowClick={(r) => setSelected((s) => (s === r.id ? undefined : r.id))}
				selectedRowKey={selected}
				empty={<EmptyState />}
			/>
			{/* Hide pagination when there are no records; the table already says so. */}
			{mode !== "empty" && (
				<Pagination
					page={page}
					pageSize={pageSize}
					total={LOANS.length}
					onPageChange={setPage}
					onPageSizeChange={setPageSize}
					pageSizeOptions={[5, 10, 20]}
				/>
			)}
		</div>
	);
}
