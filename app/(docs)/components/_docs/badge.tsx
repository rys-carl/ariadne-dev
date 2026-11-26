import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Badge } from "@/shared/ui/Badge";

<Badge tone="success">Done</Badge>`;

export default function BadgeDoc() {
	return (
		<>
			<ComponentPreview name="badge-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A short status label. Use {code("neutral")}{" "}for states that need no attention (Notified, Upcoming), and
						color only for states the user should notice. Badges aren&apos;t interactive. For named business statuses (Paid, Overdue…) use StatusBadge, which picks the color for you.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "tone", type: '"neutral" | "success" | "warning" | "danger" | "info"', default: '"neutral"', description: "Color." },
						{ name: "size", type: '"sm" | "md"', default: '"sm"', description: "12px or 14px text." },
						{ name: "children", type: "ReactNode", description: "One or two words." },
					]}
				/>
			</DocSection>
		</>
	);
}
