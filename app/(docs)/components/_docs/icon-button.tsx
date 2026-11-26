import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "variants", title: "Variants" },
	{ id: "destructive", title: "Destructive" },
	{ id: "sizes", title: "Sizes" },
	{ id: "accessibility", title: "Accessibility" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { IconButton } from "@/shared/ui/Button";

<IconButton icon={<Plus />} aria-label="Add record" />`;

export default function IconButtonDoc() {
	return (
		<>
			<ComponentPreview name="icon-button-demo" />

			<DocSection id="usage" title="Usage">
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection
				id="variants"
				title="Variants"
				description="Same variants as Button, except link: an icon on its own can't read as a text link."
			>
				<ComponentPreview name="icon-button-variants" />
			</DocSection>

			<DocSection
				id="destructive"
				title="Destructive"
				description="Available for primary, secondary and ghost."
			>
				<ComponentPreview name="icon-button-destructive" />
			</DocSection>

			<DocSection
				id="sizes"
				title="Sizes"
				description="Square, matching Button heights (36 / 32 / 24px), so they line up in the same toolbar. The last one is disabled."
			>
				<ComponentPreview name="icon-button-sizes" />
			</DocSection>

			<DocSection
				id="accessibility"
				title="Accessibility"
				description={
					<>
						Screen readers have no visible text to announce, so{" "}
						<code className="font-mono text-sm">aria-label</code>{" "}is a required prop and the build fails
						without it. Describe the action, not the icon: &ldquo;Delete record&rdquo;, not &ldquo;Trash
						icon&rdquo;. Add <code className="font-mono text-sm">title</code>{" "}too if sighted users need a
						tooltip.
					</>
				}
			/>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "icon", type: "ReactNode", description: "The icon to render. Required." },
						{ name: "aria-label", type: "string", description: "Accessible name. Required." },
						{
							name: "variant",
							type: '"primary" | "secondary" | "neutral" | "ghost"',
							default: '"primary"',
							description: "Visual emphasis.",
						},
						{
							name: "tone",
							type: '"default" | "destructive"',
							default: '"default"',
							description: "Not allowed with neutral.",
						},
						{ name: "size", type: '"md" | "sm" | "xs"', default: '"md"', description: "36 / 32 / 24px square." },
						{
							name: "...props",
							type: 'ComponentProps<"button">',
							description: "Every native button attribute.",
						},
					]}
				/>
			</DocSection>

			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Use only icons whose meaning is universal: add, edit, delete, close, more.",
						"Prefer ghost or neutral in dense toolbars and table rows.",
					]}
					donts={[
						"Don't use an icon button for the primary action of a page. Use a labelled Button.",
						"Don't put several primary icon buttons next to each other.",
					]}
				/>
			</DocSection>
		</>
	);
}
