import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "icons", title: "Icons" },
	{ id: "validation", title: "Validation" },
	{ id: "file", title: "File" },
	{ id: "textarea", title: "Textarea" },
	{ id: "accessibility", title: "Accessibility" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Field } from "@/shared/ui/Field";
import { Input } from "@/shared/ui/Input";

<Field label="Email" helper="We'll send the payslip here." error={errors.email}>
  <Input type="email" placeholder="name@bakawan.com" />
</Field>`;

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export default function InputDoc() {
	return (
		<>
			<ComponentPreview name="input-demo" />

			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Wrap a control in {code("Field")}{" "}to get the label, helper text and error message from the spec.{" "}
						{code("Field")}{" "}works with every control on these pages: Input, PhoneInput, OtpInput and SearchInput.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection
				id="states"
				title="States"
				description="Default, filled and disabled, in the default and destructive tones, as in the spec. Click a field to see its focus ring. A disabled field fades everything except the label."
			>
				<ComponentPreview name="input-states" />
			</DocSection>

			<DocSection id="icons" title="Icons" description={<>Pass lucide icons to {code("leftIcon")}{" "}and {code("rightIcon")}.</>}>
				<ComponentPreview name="input-icons" />
			</DocSection>

			<DocSection
				id="validation"
				title="Validation"
				description={
					<>
						Passing a message to {code("error")}{" "}turns the field red and links the message to the input for
						screen readers. Show errors after submit or blur, not on every keystroke.
					</>
				}
			>
				<ComponentPreview name="input-validation" />
			</DocSection>

			<DocSection
				id="file"
				title="File"
				description={
					<>
						{code('type="file"')}{" "}renders the spec&apos;s &ldquo;Choose File · No file chosen&rdquo; style. The
						&ldquo;No file chosen&rdquo; text comes from the browser, so its wording varies slightly between
						browsers.
					</>
				}
			>
				<ComponentPreview name="input-file" />
			</DocSection>

			<DocSection
				id="textarea"
				title="Textarea"
				description={
					<>
						{code("Textarea")}{" "}(from {code("@/shared/ui/Textarea")}) is the multi-line version, with the same
						states. It works inside {code("Field")}{" "}like Input.
					</>
				}
			>
				<ComponentPreview name="input-textarea" />
			</DocSection>

			<DocSection
				id="accessibility"
				title="Accessibility"
				description={
					<>
						Inside a {code("Field")}, the label is linked to the input, and the helper and error text are read
						after the label ({code("aria-describedby")}). Errors set {code("aria-invalid")}. Without a Field,
						give the input an {code("aria-label")}.
					</>
				}
			/>

			<DocSection id="props" title="Props">
				<p className="text-sm font-semibold text-text-900">Field</p>
				<PropsTable
					rows={[
						{ name: "label", type: "ReactNode", description: "Label above the control." },
						{ name: "helper", type: "ReactNode", description: "Helper text under the control." },
						{
							name: "error",
							type: "ReactNode | boolean",
							description: "Error message. Any truthy value marks the field invalid; true shows no message.",
						},
						{ name: "required", type: "boolean", default: "false", description: "Adds a red asterisk and sets required." },
						{ name: "disabled", type: "boolean", default: "false", description: "Disables the control and fades it." },
						{ name: "id", type: "string", description: "id for the control. Generated if left out." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">Input</p>
				<PropsTable
					rows={[
						{ name: "leftIcon", type: "ReactNode", description: "Icon before the text." },
						{ name: "rightIcon", type: "ReactNode", description: "Icon after the text." },
						{ name: "invalid", type: "boolean", description: "Error state. Inherited from Field when left out." },
						{ name: "className", type: "string", description: "Applies to the outer box. Layout only." },
						{ name: "...props", type: 'ComponentProps<"input">', description: "Every native input attribute." },
					]}
				/>
			</DocSection>

			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Always give a field a visible label. Placeholders disappear when the user types.",
						"Write error messages that say how to fix the problem: “Use the format CID-001.”",
						"Use the right type and inputMode (email, tel, numeric) for mobile keyboards.",
					]}
					donts={[
						"Don't use the placeholder as the label.",
						"Don't show errors before the user has had a chance to finish typing.",
						"Don't disable a field without explaining why in the helper text.",
					]}
				/>
			</DocSection>
		</>
	);
}
