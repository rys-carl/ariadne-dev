import { Table } from "@/shared/ui/Table";

// The spec's "Table Template Normal" (gray header, no rows), and the
// brand-green header row variant from the "Table row" frame.
export default function TableTemplate() {
	return (
		<div className="flex w-full flex-col gap-6">
			<TemplateTable headerTone="neutral" />
			<TemplateTable headerTone="brand" />
		</div>
	);
}

function TemplateTable({ headerTone }: { headerTone: "neutral" | "brand" }) {
	return (
		<Table
			headerTone={headerTone}
			caption="Transactions"
			className="text-left"
			rows={[] as { id: string }[]}
			getRowKey={(r) => r.id}
			columns={[
				{ key: "date", header: "Date", cell: () => null },
				{ key: "account", header: "Account", cell: () => null },
				{ key: "amount", header: "Amount", align: "right", cell: () => null },
				{ key: "status", header: "Status", cell: () => null },
			]}
		/>
	);
}
