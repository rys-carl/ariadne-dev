import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { EmptyState } from "@/shared/ui/EmptyState";

<EmptyState />   // "No data to display" + default hint

<EmptyState
  title="No matching records"
  description="Try a different date range."
  action={<Button size="sm" variant="neutral" onClick={clear}>Clear filters</Button>}
/>`;

export default function EmptyStateDoc() {
	return (
		<>
			<ComponentPreview name="empty-state-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						For a list, table or page with nothing to show. Say why it&apos;s empty and what to do next. Inside a
						table, pass it as {code("empty")}.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "title", type: "ReactNode", default: '"No data to display"', description: "Main message." },
						{ name: "description", type: "ReactNode", description: "What to do next." },
						{ name: "icon", type: "LucideIcon", default: "FileText", description: "Center icon." },
						{ name: "action", type: "ReactNode", description: "Optional button." },
					]}
				/>
			</DocSection>
		</>
	);
}
