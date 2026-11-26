import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "form", title: "In a form" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { RadioGroup } from "@/shared/ui/RadioGroup";

<RadioGroup
  label="Loan term"
  value={term}
  onValueChange={setTerm}
  options={[
    { value: "25", label: "25 weeks" },
    { value: "50", label: "50 weeks", description: "Smaller weekly payments" },
  ]}
/>`;

export default function RadioGroupDoc() {
	return (
		<>
			<ComponentPreview name="radio-group-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Pick exactly one option. It renders a {code("<fieldset>")} with the label as its {code("<legend>")} and
						native radios that share a name, so Tab enters the group, the arrow keys move and select, and screen
						readers announce the position (&ldquo;2 of 3&rdquo;).
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="form"
				title="In a form"
				description="Descriptions, a disabled option, horizontal layout, required with an error message."
			>
				<ComponentPreview name="radio-group-form" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "options", type: "{ value, label, description?, disabled? }[]", description: "The choices." },
						{ name: "value / defaultValue", type: "string", description: "Controlled or initial value." },
						{ name: "onValueChange", type: "(value) => void", description: "Called when the choice changes." },
						{ name: "label / helper / error", type: "ReactNode", description: "Legend, helper text and error message." },
						{ name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout." },
						{ name: "name / required / disabled", type: "—", description: "Native form attributes." },
						{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "16 / 20 / 24px." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Use for 2–6 options that should all be visible.", "Preselect a sensible default when there is one."]}
					donts={["Don't use for long lists. Use a select.", "Don't use a single radio button. Use a checkbox."]}
				/>
			</DocSection>
		</>
	);
}
