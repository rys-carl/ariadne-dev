import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Breadcrumb } from "@/shared/ui/Breadcrumb";

// Page heading: title above the trail, "Home" as text
<Breadcrumb
  title="UI Components"
  homeLabel="Home"
  items={[{ label: "UI Components" }]}
/>

// Trail only, house icon for Home
<Breadcrumb
  items={[
    { label: "Loans", href: "/loans" },
    { label: "Applications" },          // no page of its own: plain text
    { label: "ACC-2024-001" },           // current page
  ]}
/>`;

export default function BreadcrumbDoc() {
	return (
		<>
			<ComponentPreview name="breadcrumb-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Shows where the page sits. Pass {code("title")} to put the page heading above the trail (rendered as{" "}
						{code("<h1>")}; change it with {code("titleAs")}). Home is a house icon, or text with{" "}
						{code("homeLabel")}. Items with {code("href")} are links, items without are plain text, and the last
						item is the current page, in brand green and marked {code('aria-current="page"')}. AppHeader and
						these docs pages both use it.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "items", type: "{ label, href? }[]", description: "Trail after Home, ending with the current page." },
						{ name: "title", type: "ReactNode", description: "Page heading above the trail." },
						{ name: "titleAs", type: '"h1" | "h2" | "p"', default: '"h1"', description: "Heading level for the title." },
						{ name: "homeLabel", type: "string", description: "Text instead of the house icon, e.g. \"Home\"." },
						{ name: "homeHref", type: "string", default: '"/"', description: "Where the house icon links." },
					]}
				/>
			</DocSection>
		</>
	);
}
