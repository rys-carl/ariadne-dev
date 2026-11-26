import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Badge } from "@/shared/ui/Badge";
import { MetaBar } from "@/shared/ui/MetaBar";

<MetaBar
  items={[
    { label: "S", labelFull: "Start date", value: "March 25, 2026" },
    { value: "10:30 AM" },
    { label: "C", labelFull: "Close date", value: "July 30, 2026" },
    { value: <Badge tone="danger" shape="tag" size="md">Status: Closed</Badge> },
  ]}
/>`;

export default function MetaBarDoc() {
	return (
		<>
			<ComponentPreview name="meta-bar-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A row of short facts about a record, separated by dividers; it wraps on narrow screens. The spec
						abbreviates labels (&ldquo;S&rdquo;, &ldquo;C&rdquo;); pass {code("labelFull")}{" "}so screen readers and
						hover show what they mean. I assumed Start / Close for the demo, so confirm the real meaning with the
						UI/UX team. The status uses Badge&apos;s {code('shape="tag"')}.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "items", type: "{ label?, labelFull?, value }[]", description: "The facts, in order." },
					]}
				/>
			</DocSection>
		</>
	);
}
