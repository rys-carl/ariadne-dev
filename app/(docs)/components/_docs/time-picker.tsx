import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "keyboard", title: "Keyboard" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { TimePicker } from "@/shared/ui/TimePicker";
import type { TimeValue } from "@/shared/lib/dates";

const [time, setTime] = useState<TimeValue>({ hours: 8, minutes: 30 }); // 24-hour
<TimePicker value={time} onChange={setTime} minuteStep={15} showSummary />`;

export default function TimePickerDoc() {
	return (
		<>
			<ComponentPreview name="time-picker-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Hour and minute columns with AM / PM, as in the spec. The value is 24-hour ({code("{ hours: 14, minutes: 15 }")}
						{" "}is 2:15 PM), so it&apos;s easy to send to an API; the display is 12-hour. Columns wrap around (12 → 1,
						59 → 00). {code("formatTime()")}{" "}gives the &ldquo;08:30 AM&rdquo; text.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="keyboard"
				title="Keyboard"
				description="Each column is a spin button: ↑ / ↓ step by one, PageUp / PageDown by five, Home / End jump to the first or last value, and the mouse wheel scrolls. Screen readers hear the current value, e.g. “Hour, 08”."
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "value / onChange", type: "{ hours, minutes }", description: "24-hour time. Controlled." },
						{ name: "minuteStep", type: "number", default: "1", description: "Minute increments, e.g. 5 or 15." },
						{ name: "showSummary", type: "boolean", default: "false", description: "Large “08:30 AM” readout." },
						{ name: "title", type: "string | false", default: '"Select Time"', description: "Title row; false hides it." },
					]}
				/>
			</DocSection>
		</>
	);
}
