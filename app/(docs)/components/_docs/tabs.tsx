import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "variants", title: "Variants" },
	{ id: "keyboard", title: "Keyboard" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Tabs } from "@/shared/ui/Tabs";

<Tabs
  variant="track"
  aria-label="Loan sections"
  items={[
    { value: "overview", label: "Overview", content: <Overview /> },
    { value: "payments", label: "Payments", content: <Payments /> },
  ]}
/>

// As a filter (no panels), controlled:
<Tabs value={status} onValueChange={setStatus} items={[…]} aria-label="Status" />`;

export default function TabsDoc() {
	return (
		<>
			<ComponentPreview name="tabs-demo" />
			<DocSection id="usage" title="Usage" description={<>Give items {code("content")}{" "}to render panels, or leave it out and use the tabs as a filter for content you render yourself.</>}>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="variants" title="Variants" description={<>{code("default")}, {code("track")}{" "}(with or without icons) and {code("dark")}, as in the spec.</>}>
				<ComponentPreview name="tabs-variants" />
			</DocSection>
			<DocSection
				id="keyboard"
				title="Keyboard"
				description="The tab list is a single Tab stop. Arrow Left / Right move between tabs and select them, and Home / End jump to the first or last. Disabled tabs are skipped. Tab then moves into the panel."
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "items", type: "{ value, label, icon?, content?, disabled? }[]", description: "The tabs." },
						{ name: "value / defaultValue", type: "string", description: "Active tab, controlled or initial." },
						{ name: "onValueChange", type: "(value) => void", description: "Called when the active tab changes." },
						{ name: "variant", type: '"default" | "track" | "dark"', default: '"default"', description: "Style." },
						{ name: "size", type: '"sm" | "md"', default: '"md"', description: "32 or 36px tall." },
						{ name: "fullWidth", type: "boolean", default: "false", description: "Stretch tabs to fill the row." },
						{ name: "aria-label", type: "string", description: "Names the tab list for screen readers." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Use tabs to switch between views of the same thing.", "Keep labels to one or two words."]}
					donts={["Don't use tabs for steps in a sequence. Use a Stepper.", "Don't use tabs to navigate to other pages. Use links."]}
				/>
			</DocSection>
		</>
	);
}
