import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Stepper } from "@/shared/ui/Stepper";

<Stepper steps={["Verify Staff", "Account Details", "Set Role"]} current={step} />`;

export default function StepperDoc() {
	return (
		<>
			<ComponentPreview name="stepper-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Shows where the user is in a multi-step flow. Steps before {code("current")}{" "}show as complete. The
						current step is marked {code('aria-current="step"')}{" "}for screen readers. Keep labels short (one or two
						words); for more than five steps, split the flow.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="states" title="States" description="The three rows from the spec.">
				<ComponentPreview name="stepper-states" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "steps", type: "string[]", description: "Step labels, in order." },
						{ name: "current", type: "number", description: "Index of the current step (0-based). Use steps.length when all are done." },
						{ name: "className", type: "string", description: "Layout only." },
					]}
				/>
			</DocSection>
		</>
	);
}
