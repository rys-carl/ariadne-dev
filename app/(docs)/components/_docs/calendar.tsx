import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "range", title: "Range" },
	{ id: "keyboard", title: "Keyboard" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Calendar } from "@/shared/ui/Calendar";

const [date, setDate] = useState<Date>();
<Calendar value={date} onChange={setDate} />

// Date range
const [range, setRange] = useState<DateRange>();
<Calendar mode="range" value={range} onChange={setRange} />`;

export default function CalendarDoc() {
	return (
		<>
			<ComponentPreview name="calendar-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A month grid, Monday first as in the spec, with month and year pickers. Use it inline (a scheduling
						page, a filter panel). For a form field, use Date Picker, which opens this in a popup. Today is marked
						with a dot. {code("min")}, {code("max")}{" "}and {code("isDisabled")}{" "}block days you can&apos;t pick.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="range"
				title="Range"
				description="The first click sets the start, the second the end (picking an earlier day swaps them), and a third starts over. While picking the end, hovering previews the range. The demo recreates the spec's range card with a time picker."
			>
				<ComponentPreview name="calendar-range-demo" />
			</DocSection>
			<DocSection
				id="keyboard"
				title="Keyboard"
				description="The grid is a single Tab stop. Arrows move by day and week, PageUp / PageDown by month (Shift for a year), Home / End to the start or end of the week, and Enter or Space selects."
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "mode", type: '"single" | "range"', default: '"single"', description: "One day or a from–to range." },
						{ name: "value / onChange", type: "Date | DateRange", description: "Controlled value." },
						{ name: "min / max", type: "Date", description: "Earliest and latest selectable days." },
						{ name: "isDisabled", type: "(date) => boolean", description: "Block specific days, e.g. weekends." },
						{ name: "defaultMonth", type: "Date", description: "Month shown first. Defaults to the value or today." },
						{ name: "weekStartsOn", type: "0 | 1", default: "1", description: "1 = Monday, 0 = Sunday." },
						{ name: "title", type: "string | false", default: '"Select Date"', description: "Title row; false hides it." },
					]}
				/>
			</DocSection>
		</>
	);
}
