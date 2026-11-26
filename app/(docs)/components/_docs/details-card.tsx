import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "review-field", title: "Review field" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { DetailsCard, ReviewField } from "@/shared/ui/DetailsCard";

<DetailsCard title="Payment Details">
  <ReviewField label="Interest Amount" value="PHP 736.00" />
  <ReviewField label="Outstanding Balance" value="PHP 236.00" tone="danger" />
</DetailsCard>`;

export default function DetailsCardDoc() {
	return (
		<>
			<ComponentPreview name="details-card-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description="Read-only details grouped under a heading. Two columns from tablet width up, one column on phones. Fields flow left to right, top to bottom."
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="review-field"
				title="Review field"
				description={
					<>
						A label above a value. Use {code('tone="danger"')}{" "}for values that need attention, like an overdue
						balance. Each field is a {code("<dt>/<dd>")}{" "}pair, so outside a card wrap them in {code("ReviewFields")}.
					</>
				}
			>
				<ComponentPreview name="review-field-demo" />
			</DocSection>
			<DocSection id="props" title="Props">
				<p className="text-sm font-semibold text-text-900">DetailsCard / ReviewFields</p>
				<PropsTable
					rows={[
						{ name: "title", type: "ReactNode", description: "Card heading (DetailsCard only)." },
						{ name: "action", type: "ReactNode", description: "Element on the right of the header, e.g. an Edit button (DetailsCard only)." },
						{ name: "columns", type: "1 | 2 | 3", default: "2", description: "Columns from the sm breakpoint up." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">ReviewField</p>
				<PropsTable
					rows={[
						{ name: "label", type: "ReactNode", description: "Field name." },
						{ name: "value", type: "ReactNode", description: "Field value." },
						{ name: "tone", type: '"default" | "danger"', default: '"default"', description: "Red value for things that need attention." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Format values for reading: “PHP 736.00”, not 736.", "Show “—” for empty values rather than leaving a gap."]}
					donts={["Don't use the danger tone for emphasis. Reserve it for values that need action.", "Don't put form inputs in a details card. Use Field and Input."]}
				/>
			</DocSection>
		</>
	);
}
