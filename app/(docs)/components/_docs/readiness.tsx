import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Readiness } from "@/shared/ui/Readiness";

<Readiness value={75} />               // Near Ready, blue
<Readiness value={40} label="Docs missing" />`;

export default function ReadinessDoc() {
	return (
		<>
			<ComponentPreview name="readiness-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A labelled completion bar. The label and color come from the value: 100 is Ready, 75–99 Near Ready,
						50–74 In Progress, 25–49 Needs Work, and under 25 Not Ready. The spec shows only the five example values;
						the ranges between them are my interpretation, so confirm them with the UI/UX team. Pass{" "}
						{code("label")}{" "}to override the text.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "value", type: "number", description: "0–100." },
						{ name: "label", type: "string", description: "Overrides the band label." },
						{ name: "className", type: "string", description: "Width defaults to 176px." },
					]}
				/>
			</DocSection>
		</>
	);
}
