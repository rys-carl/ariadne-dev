import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Pagination } from "@/shared/ui/Pagination";

const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

<Pagination
  page={page}
  pageSize={pageSize}
  total={data.totalRecords}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}   // also resets to page 1
/>`;

export default function PaginationDoc() {
	return (
		<>
			<ComponentPreview name="pagination-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Controlled: you own {code("page")}{" "}and {code("pageSize")}{" "}and fetch that slice. The page list always
						shows the first and last page, the current page with one neighbor on each side, and an ellipsis for gaps
						(set {code("siblings")}{" "}for more neighbors). First / previous / next / last are disabled at the ends rather
						than hidden, so the buttons don&apos;t shift.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="states"
				title="States"
				description="First page, last page, a single page, many pages without the size picker, and no records."
			>
				<ComponentPreview name="pagination-states" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "page", type: "number", description: "Current page, 1-based." },
						{ name: "pageSize", type: "number", description: "Records per page." },
						{ name: "total", type: "number", description: "Total records. 0 shows “No data to display”." },
						{ name: "onPageChange", type: "(page) => void", description: "Called with the new page." },
						{ name: "onPageSizeChange", type: "(size) => void", description: "Shows the Items picker. Also calls onPageChange(1)." },
						{ name: "pageSizeOptions", type: "number[]", default: "[10, 20, 50, 100]", description: "Picker options." },
						{ name: "siblings", type: "number", default: "1", description: "Pages shown on each side of the current one." },
					]}
				/>
			</DocSection>
		</>
	);
}
