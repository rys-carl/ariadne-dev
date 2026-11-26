import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";


export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Callout } from "@/shared/ui/Callout";

<Callout tone="danger">This action cannot be undone.</Callout>`;

export default function CalloutDoc() {
	return (
		<>
			<ComponentPreview name="callout-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A tinted notice for consequences and context, as used inside ConfirmDialog. Text uses the 700 shade of
						each color: the spec&apos;s 600 shade is below WCAG AA contrast on these backgrounds. For messages
						about something that just happened, use a toast instead.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "tone", type: '"warning" | "danger" | "success" | "info"', default: '"info"', description: "Color." },
						{ name: "children", type: "ReactNode", description: "The message. Keep it to one or two sentences." },
					]}
				/>
			</DocSection>
		</>
	);
}
