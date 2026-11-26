import { typographySpec, type TypographyVariant } from "@/shared/ui/Typography";
import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import TypeScale from "../_components/TypeScale";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "font", title: "Font family" },
	{ id: "headings", title: "Headings" },
	{ id: "text", title: "Paragraph & body" },
	{ id: "blockquote", title: "Blockquote" },
	{ id: "list", title: "List" },
	{ id: "inline-code", title: "Inline code" },
	{ id: "table", title: "Table" },
	{ id: "as", title: "Changing the element" },
	{ id: "styles", title: "Style reference" },
	{ id: "scale", title: "Type scale" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Typography } from "@/shared/ui/Typography";

<Typography variant="h1">Page title</Typography>
<Typography variant="lead">A short introduction.</Typography>
<Typography>Body copy uses the "p" variant by default.</Typography>`;

const STYLES_USAGE = `import { typographyStyles } from "@/shared/ui/Typography";

<label className={typographyStyles("small")}>Email address</label>`;

const FONT_SWITCH = `// shared/fonts.ts
export const appFont = inter; // or poppins, or geist`;

// Rendered from typographySpec itself, so the reference can't go stale.
function StyleReference() {
	const variants = Object.keys(typographySpec) as TypographyVariant[];
	return (
		<div className="overflow-x-auto rounded-xl border border-text-200">
			<table className="w-full min-w-160 text-left text-sm">
				<thead className="bg-text-50 text-xs uppercase tracking-wide text-text-500">
					<tr>
						<th className="px-4 py-3 font-medium">Variant</th>
						<th className="px-4 py-3 font-medium">Element</th>
						<th className="px-4 py-3 font-medium">Spec</th>
						<th className="px-4 py-3 font-medium">Classes</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-text-200">
					{variants.map((variant) => {
						const { element, spec, className } = typographySpec[variant];
						return (
							<tr key={variant} className="align-top">
								<td className="px-4 py-3 font-mono text-[13px] font-medium text-brand-fg">{variant}</td>
								<td className="px-4 py-3 font-mono text-[13px] text-text-700">&lt;{String(element)}&gt;</td>
								<td className="px-4 py-3 whitespace-nowrap text-text-600">{spec}</td>
								<td className="px-4 py-3 font-mono text-xs leading-5 text-text-500">{className}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export default function TypographyDoc() {
	return (
		<>
			<ComponentPreview name="typography-demo" />

			<DocSection id="usage" title="Usage">
				<CodeBlock code={USAGE} title="Usage" />
				<p className="text-[15px] leading-relaxed text-text-600">
					When you render the element yourself (a {code("<label>")}, a table cell, a third-party component), use{" "}
					{code("typographyStyles()")}{" "}to get the same classes:
				</p>
				<CodeBlock code={STYLES_USAGE} title="typographyStyles" />
			</DocSection>

			<DocSection
				id="font"
				title="Font family"
				description={
					<>
						The spec allows Inter, Poppins or Geist. The app uses Inter by default and self-hosts it at build time
						with {code("next/font")}. To switch the entire app, change one line:
					</>
				}
			>
				<CodeBlock code={FONT_SWITCH} title="shared/fonts.ts" />
				<ComponentPreview name="typography-fonts" />
			</DocSection>

			<DocSection
				id="headings"
				title="Headings"
				description={
					<>
						{code("h1")}–{code("h6")}{" "}render their matching element. {code("section")}{" "}is a large section
						title (renders {code("<h2>")}) for prominent sections and feature introductions below the page title.
					</>
				}
			>
				<ComponentPreview name="typography-headings" />
			</DocSection>

			<DocSection
				id="text"
				title="Paragraph & body"
				description={
					<>
						{code("p")}{" "}(16px) is the default for reading content. {code("body")}{" "}and {code("body-medium")}{" "}
						(14px) are for interface text such as cards, forms and tables. {code("lead")}{" "}introduces a page,{" "}
						{code("muted")}{" "}is for helper text.
					</>
				}
			>
				<ComponentPreview name="typography-text" />
			</DocSection>

			<DocSection id="blockquote" title="Blockquote">
				<ComponentPreview name="typography-blockquote" />
			</DocSection>

			<DocSection id="list" title="List" description="8px between items.">
				<ComponentPreview name="typography-list" />
			</DocSection>

			<DocSection id="inline-code" title="Inline code">
				<ComponentPreview name="typography-inline-code" />
			</DocSection>

			<DocSection
				id="table"
				title="Table"
				description={
					<>
						Text styles for simple tables inside content: semibold header on a gray row, regular cells, striped
						rows. For data grids with sorting or pagination, use the {code("Table")} component.
					</>
				}
			>
				<ComponentPreview name="typography-table" />
			</DocSection>

			<DocSection
				id="as"
				title="Changing the element"
				description={
					<>
						Pick the style with {code("variant")}{" "}and the element with {code("as")}. Heading levels should follow
						the page outline for screen readers, even when the design calls for a different size.
					</>
				}
			>
				<ComponentPreview name="typography-as" />
			</DocSection>

			<DocSection
				id="styles"
				title="Style reference"
				description="Every variant with its spec from the Figma and the classes it applies."
			>
				<StyleReference />
			</DocSection>

			<DocSection
				id="scale"
				title="Type scale"
				description={
					<>
						The full Tailwind scale from the Figma, for text that doesn&apos;t fit a variant. Sizes from{" "}
						{code("text-xl")}{" "}up use {code("tracking-tight")}{" "}(-2.5%). Pick a weight to preview it.
					</>
				}
			>
				<TypeScale />
			</DocSection>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{
							name: "variant",
							type: "TypographyVariant",
							default: '"p"',
							description:
								"h1–h6, section, lead, large, p, body, body-medium, small, muted, blockquote, list, code.",
						},
						{
							name: "as",
							type: "ElementType",
							description: "Element to render instead of the variant's default.",
						},
						{
							name: "className",
							type: "string",
							description: "For layout only (margin, width, alignment). Don't override size or weight.",
						},
						{
							name: "...props",
							type: "HTMLAttributes<HTMLElement>",
							description: "Any HTML attribute (id, ref, aria-*, …).",
						},
					]}
				/>
			</DocSection>

			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Use one h1 per page.",
						"Follow the heading hierarchy (h2 after h1, h3 after h2) and use as to change the look.",
						"Use body (14px) for dense interface text and p (16px) for reading content.",
						"Space text blocks with the parent's gap or space-y. The styles have no built-in margins.",
					]}
					donts={[
						"Don't pick a heading level for its size. Use variant and as instead.",
						"Don't set font sizes or weights by hand when a variant fits.",
						"Don't use muted text for information the user must read.",
						"Don't load other fonts. Change appFont in shared/fonts.ts instead.",
					]}
				/>
			</DocSection>
		</>
	);
}
