import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { CheckIndicator } from "@/shared/ui/CheckIndicator";

<CheckIndicator variant="solid" label="Completed" />`;

export default function CheckIndicatorDoc() {
	return (
		<>
			<ComponentPreview name="check-indicator-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Marks completed items in lists, steppers and checklists. {code("solid")}{" "}is the strongest (used by
						Stepper); {code("muted")}{" "}is for items done earlier or by someone else. Pass {code("label")}{" "}when no
						nearby text says the item is complete.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "variant", type: '"subtle" | "success" | "muted" | "solid" | "outline"', default: '"solid"', description: "Style, left to right as in the spec." },
						{ name: "size", type: '"sm" | "md"', default: '"md"', description: "16px or 20px." },
						{ name: "label", type: "string", description: "Accessible name. Hidden from screen readers without it." },
					]}
				/>
			</DocSection>
		</>
	);
}
