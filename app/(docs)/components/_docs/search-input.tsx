import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "behavior", title: "Behavior" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { SearchInput } from "@/shared/ui/SearchInput";

<SearchInput
  value={query}
  onValueChange={setQuery}
  placeholder="Search document id"
  aria-label="Search document id"
/>`;

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export default function SearchInputDoc() {
	return (
		<>
			<ComponentPreview name="search-input-demo" />

			<DocSection id="usage" title="Usage">
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection
				id="behavior"
				title="Behavior"
				description={
					<>
						A clear button appears once there&apos;s text; Escape clears too. The focus border is blue, as drawn
						in the spec. Search usually has no visible label, so always pass {code("aria-label")}.
					</>
				}
			/>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "value", type: "string", description: "Controlled value." },
						{ name: "defaultValue", type: "string", description: "Initial value when uncontrolled." },
						{ name: "onValueChange", type: "(value) => void", description: "Called on every change." },
						{ name: "onClear", type: "() => void", description: "Called when the field is cleared." },
						{ name: "placeholder", type: "string", default: '"Search"', description: "Placeholder text." },
						{ name: "...props", type: 'ComponentProps<"input">', description: "Native input attributes." },
					]}
				/>
			</DocSection>
		</>
	);
}
