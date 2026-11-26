import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "keyboard", title: "Keyboard & paste" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Field } from "@/shared/ui/Field";
import { OtpInput } from "@/shared/ui/OtpInput";

<Field label="One-time password" error={error}>
  <OtpInput value={code} onChange={setCode} onComplete={verify} />
</Field>`;

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export default function InputOtpDoc() {
	return (
		<>
			<ComponentPreview name="input-otp-demo" />

			<DocSection id="usage" title="Usage">
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection id="states" title="States" description="Empty, partly filled, error and disabled. Click a box to see its focus ring.">
				<ComponentPreview name="input-otp-states" />
			</DocSection>

			<DocSection
				id="keyboard"
				title="Keyboard & paste"
				description={
					<>
						Typing moves to the next box, Backspace goes back, and the arrow keys move between boxes. Pasting a
						code fills every box. The first box has {code('autoComplete="one-time-code"')}, so phones offer the
						code from the SMS.
					</>
				}
			/>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "length", type: "number", default: "6", description: "Number of boxes." },
						{ name: "value", type: "string", description: "Controlled value." },
						{ name: "defaultValue", type: "string", description: "Initial value when uncontrolled." },
						{ name: "onChange", type: "(value) => void", description: "Called on every change." },
						{ name: "onComplete", type: "(value) => void", description: "Called once every box is filled." },
						{
							name: "pattern",
							type: '"numeric" | "alphanumeric"',
							default: '"numeric"',
							description: "Allowed characters. Letters are uppercased.",
						},
						{ name: "invalid", type: "boolean", description: "Error state. Inherited from Field when left out." },
						{ name: "aria-label", type: "string", description: "Accessible name when not inside a labelled Field." },
					]}
				/>
			</DocSection>
		</>
	);
}
