import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;


export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "mapping", title: "Status mapping" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { StatusBadge } from "@/shared/ui/StatusBadge";

<StatusBadge status={loan.status} />          // "Overdue" → red
<StatusBadge status="Pending UM Approval" />  // starts with "Pending" → amber
<StatusBadge status="Escalated" tone="warning" />  // not in the spec: set the tone`;

export default function StatusBadgeDoc() {
	return (
		<>
			<ComponentPreview name="status-badge-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description="Pass the status text from your API; the badge picks the color, so the same status looks the same in every app."
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="mapping"
				title="Status mapping"
				description={
					<>
						The spec&apos;s 21 statuses in 5 categories are in {code("STATUS_TONES")}. Matching ignores case. A status
						that starts with a known one (&ldquo;Pending UM Approval&rdquo;) takes its color. Unknown statuses are
						neutral; pass {code("tone")}{" "}for those, and ask the UI/UX team to add recurring ones to the map.
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "status", type: "string", description: "Status text. Also the label." },
						{ name: "tone", type: '"success" | "warning" | "danger" | "info" | "neutral"', description: "Overrides the mapped color." },
						{ name: "size", type: '"sm" | "md"', default: '"md"', description: "12px or 14px text." },
					]}
				/>
			</DocSection>
		</>
	);
}
