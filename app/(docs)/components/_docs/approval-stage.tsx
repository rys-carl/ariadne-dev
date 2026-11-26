import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { ApprovalStage } from "@/shared/ui/ApprovalStage";

<ApprovalStage stages={["AO", "UM", "AM", "RD"]} current={1} />   // Current: UM
<ApprovalStage stages={["AO", "UM", "AM", "RD"]} current={4} />   // Done`;

export default function ApprovalStageDoc() {
	return (
		<>
			<ComponentPreview name="approval-stage-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Shows how far a record has moved through an approval chain. Stages up to the current one are green, the
						rest gray. Set {code("current")}{" "}to {code("stages.length")}{" "}once every stage has approved. Screen readers
						hear the whole chain and the current stage in one sentence.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "stages", type: "string[]", description: "Approver codes in order." },
						{ name: "current", type: "number", description: "Stage awaiting approval (0-based); stages.length = done." },
					]}
				/>
			</DocSection>
		</>
	);
}
