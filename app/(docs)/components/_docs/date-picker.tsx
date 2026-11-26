import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "Limits and states" },
	{ id: "behavior", title: "Behavior" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { DatePicker } from "@/shared/ui/DatePicker";
import { Field } from "@/shared/ui/Field";

<Field label="Due date">
  <DatePicker value={due} onChange={setDue} />
</Field>

<DatePicker mode="range" value={period} onChange={setPeriod} />        // DateRange
<DatePicker withTime minuteStep={15} value={visit} onChange={setVisit} /> // Date with time`;

export default function DatePickerDoc() {
	return (
		<>
			<ComponentPreview name="date-picker-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A form field that opens the Calendar in a popup: a single date, a range, or a date with a time. It works
						inside {code("Field")}{" "}like Input, so the label, helper text and error message wire up automatically.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="states"
				title="Limits and states"
				description={
					<>
						Block days with {code("min")}, {code("max")}{" "}and {code("isDisabled")}. They&apos;re struck through and
						can&apos;t be picked. Errors and the disabled state come from {code("Field")}.
					</>
				}
			>
				<ComponentPreview name="date-picker-states" />
			</DocSection>
			<DocSection
				id="behavior"
				title="Behavior"
				description="A single date commits on click and closes. A range commits once both ends are picked. With a time, pick the date and time, then press Done. Escape or a click outside closes without saving, and focus returns to the field. The popup opens on the selected (or current) month with that day focused, and flips above the field when there isn't room below. The × clears the value."
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "mode", type: '"single" | "range"', default: '"single"', description: "One day or a from–to range." },
						{ name: "withTime", type: "boolean", default: "false", description: "Add a time picker (single mode)." },
						{ name: "value / onChange", type: "Date | DateRange | undefined", description: "Controlled; undefined when cleared." },
						{ name: "min / max / isDisabled", type: "Date / Date / (date) => boolean", description: "Selectable days." },
						{ name: "minuteStep", type: "number", default: "1", description: "With withTime." },
						{ name: "placeholder", type: "string", description: "Shown when empty." },
						{ name: "clearable", type: "boolean", default: "true", description: "Show the × button." },
						{ name: "invalid / disabled / id", type: "—", description: "Inherited from Field when left out." },
					]}
				/>
			</DocSection>
		</>
	);
}
