import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "cells", title: "Cells" },
	{ id: "empty", title: "Empty" },
	{ id: "behavior", title: "Behavior" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Table, type TableColumn } from "@/shared/ui/Table";
import { Amount } from "@/shared/ui/TableCells";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { ClientCell } from "@/shared/ui/Avatar";

const columns: TableColumn<Loan>[] = [
  { key: "client", header: "Client", cell: (r) => <ClientCell name={r.name} id={r.cid} /> },
  { key: "amount", header: "Amount", align: "right", cell: (r) => <Amount value={r.amount} signed /> },
  { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
];

<Table caption="Loan applications" columns={columns} rows={rows} getRowKey={(r) => r.id} />
<Pagination … />`;

export default function TableDoc() {
	return (
		<>
			<ComponentPreview name="table-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Define columns once, each with a {code("cell")}{" "}function, and pass the current page of rows. Put{" "}
						{code("Pagination")}{" "}underneath. The demo above combines every cell type with pagination, row selection
						(click a row) and the loading and empty states.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="cells"
				title="Cells"
				description={
					<>
						The cell types from the spec. {code("Amount")}{" "}formats pesos and, with {code("signed")}, shows debits as
						red −₱ and credits as green +₱. {code("NullValue")}{" "}renders &ldquo;—&rdquo; for empty values. Badges,
						approval stages, readiness and client cells have their own pages.
					</>
				}
			>
				<ComponentPreview name="table-cells" />
			</DocSection>
			<DocSection
				id="empty"
				title="Empty"
				description={
					<>
						With no rows the table shows &ldquo;No data to display&rdquo;, as in the spec&apos;s template. Pass{" "}
						{code("empty={<EmptyState />}")}{" "}for the illustrated version, e.g. when filters return nothing. Hide
						{" "}{code("Pagination")}{" "}when there are no records, or the message appears twice. The second table
						shows the brand header ({code('headerTone="brand"')}).
					</>
				}
			>
				<ComponentPreview name="table-template" />
			</DocSection>
			<DocSection
				id="behavior"
				title="Behavior"
				description={
					<>
						With {code("onRowClick")}, rows are focusable and open with Enter or Space as well as a click. Buttons
						inside a row keep working on their own. {code("selectedRowKey")}{" "}tints one row green with a brand edge and
						marks it {code('aria-current')}. The table scrolls sideways on narrow screens instead of squashing columns.
						The {code("caption")}{" "}names the table for screen readers.
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "columns", type: "{ key, header, cell, align?, className? }[]", description: "Column definitions." },
						{ name: "rows", type: "T[]", description: "The rows for the current page." },
						{ name: "getRowKey", type: "(row, index) => string | number", description: "Stable key per row." },
						{ name: "caption", type: "string", description: "Accessible name (visually hidden). Required." },
						{ name: "onRowClick", type: "(row) => void", description: "Makes rows clickable and keyboard-activatable." },
						{ name: "selectedRowKey", type: "string | number", description: "Highlights that row." },
						{ name: "headerTone", type: '"neutral" | "brand"', default: '"neutral"', description: "Gray or brand-green header row." },
						{ name: "loading", type: "boolean", default: "false", description: "Skeleton rows instead of data." },
						{ name: "empty", type: "ReactNode", description: "Shown when rows is empty." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Right-align amounts so the digits line up.",
						"Show “—” for missing values instead of leaving the cell blank.",
						"Keep row actions to one or two buttons; move the rest to a details view.",
					]}
					donts={[
						"Don't load every record at once. Page on the server and pass total to Pagination.",
						"Don't color whole rows by status. Use a StatusBadge in a column.",
					]}
				/>
			</DocSection>
		</>
	);
}
