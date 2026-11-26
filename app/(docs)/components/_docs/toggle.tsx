import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "settings", title: "In a settings list" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Toggle } from "@/shared/ui/Toggle";

<Toggle label="Email notifications" checked={on} onCheckedChange={setOn} />

// As in the spec: state text under the switch
<Toggle aria-label="Account status" stateLabels={{ on: "Active", off: "Inactive" }} … />`;

export default function ToggleDoc() {
	return (
		<>
			<ComponentPreview name="toggle-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						An on / off switch for a setting that takes effect right away. It&apos;s a native checkbox with{" "}
						{code('role="switch"')}, so Space toggles it and screen readers say &ldquo;on&rdquo; or
						&ldquo;off&rdquo;. Give it a {code("label")}, or an {code("aria-label")} when it has no visible text.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="settings" title="In a settings list" description="With a label and description. Also available: sizes sm, md (default) and lg, and disabled.">
				<ComponentPreview name="toggle-settings" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "checked / defaultChecked", type: "boolean", description: "Controlled or initial state." },
						{ name: "onCheckedChange", type: "(checked) => void", description: "Called with the new state." },
						{ name: "label / description", type: "ReactNode", description: "Text to the right of the switch." },
						{ name: "stateLabels", type: "{ on, off }", description: "Text under the switch that follows its state." },
						{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "36 / 44 / 60px wide." },
						{ name: "...props", type: 'ComponentProps<"input">', description: "Native attributes (name, disabled, …)." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Use a toggle when the change applies immediately.", "Label the setting, not the state: “Email notifications”, not “On”."]}
					donts={["Don't use a toggle in a form that needs a Save button. Use a checkbox.", "Don't use a toggle to pick between two different options. Use a radio group."]}
				/>
			</DocSection>
		</>
	);
}
