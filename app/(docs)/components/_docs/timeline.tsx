import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Badge } from "@/shared/ui/Badge";
import { Timeline, TimelineFields, TimelineItem, TimelineNotice } from "@/shared/ui/Timeline";

<Timeline>
  <TimelineItem date="September 15, 2026" status="current">
    <TimelineFields fields={[
      { label: "Day:", value: "Day 1" },
      { label: "Action:", value: "First Escalation" },
    ]} />
    <TimelineNotice>Notification sent to Juan R. Dela Cruz (Unit Manager)</TimelineNotice>
    <TimelineFields fields={[{ label: "Status:", value: <Badge>Notified</Badge> }]} />
  </TimelineItem>
</Timeline>`;

export default function TimelineDoc() {
	return (
		<>
			<ComponentPreview name="timeline-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A dated sequence of events, like an escalation schedule. {code("done")}{" "}items are plain,{" "}
						{code("current")}{" "}is highlighted in green, and {code("upcoming")}{" "}items sit on gray. On phones the date
						moves above the content. Item content is free-form; {code("TimelineFields")}{" "}and{" "}
						{code("TimelineNotice")}{" "}cover the spec&apos;s layout.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "TimelineItem date", type: "ReactNode", description: "Shown beside the marker." },
						{ name: "TimelineItem status", type: '"done" | "current" | "upcoming"', description: "Marker and card style." },
						{ name: "TimelineFields fields", type: "{ label, value }[]", description: "Bold label / value rows." },
						{ name: "TimelineNotice children", type: "ReactNode", description: "Green banner text." },
					]}
				/>
			</DocSection>
		</>
	);
}
