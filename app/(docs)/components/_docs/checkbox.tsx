import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "group", title: "Group and select all" },
	{ id: "states", title: "States and sizes" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Checkbox } from "@/shared/ui/Checkbox";

<Checkbox label="Remember me" checked={remember} onCheckedChange={setRemember} />`;

export default function CheckboxDoc() {
	return (
		<>
			<ComponentPreview name="checkbox-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A native checkbox under a styled box, so clicking the label, Space, form submission and screen readers
						all work as expected. Use {code("checked")} with {code("onCheckedChange")}, or {code("defaultChecked")}{" "}
						for an uncontrolled box.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="group"
				title="Group and select all"
				description={
					<>
						Group related boxes in a {code("<fieldset>")} with a {code("<legend>")}. A &ldquo;select all&rdquo; box
						uses {code("indeterminate")} to show a dash when only some are checked.
					</>
				}
			>
				<ComponentPreview name="checkbox-group" />
			</DocSection>
			<DocSection
				id="states"
				title="States and sizes"
				description={<>Description, disabled, and an error from {code("Field")} (the box and label turn red). Sizes sm, md and lg.</>}
			>
				<ComponentPreview name="checkbox-states" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "checked / defaultChecked", type: "boolean", description: "Controlled or initial state." },
						{ name: "onCheckedChange", type: "(checked) => void", description: "Called with the new state." },
						{ name: "indeterminate", type: "boolean", default: "false", description: "Dash for “some selected”." },
						{ name: "label / description", type: "ReactNode", description: "Text to the right of the box." },
						{ name: "invalid", type: "boolean", description: "Error state. Inherited from Field when left out." },
						{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "16 / 20 / 24px." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Use checkboxes for independent choices, or several picks from a list.", "Use one for consent: “I accept the terms”."]}
					donts={["Don't use checkboxes when only one option can be chosen. Use a radio group.", "Don't make a checkbox trigger an action right away. Use a toggle."]}
				/>
			</DocSection>
		</>
	);
}
