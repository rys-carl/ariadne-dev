import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import IconBrowser from "../_components/IconBrowserLazy";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "general", title: "General set" },
	{ id: "sizes", title: "Sizes" },
	{ id: "tones", title: "Colors" },
	{ id: "buttons", title: "In buttons" },
	{ id: "accessibility", title: "Accessibility" },
	{ id: "browse", title: "Browse all icons" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Mail } from "lucide-react";
import { Icon } from "@/shared/ui/Icon";

<Icon icon={Mail} size="md" tone="muted" />`;

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export default function IconsDoc() {
	return (
		<>
			<ComponentPreview name="icon-demo" />

			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Icons come from {code("lucide-react")}, the enterprise standard. Import the icon you need and render
						it through {code("Icon")}{" "}so sizes and colors stay consistent. Only the icons you import end up in
						the bundle.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection
				id="general"
				title="General set"
				description="The general-purpose icons from the design system Figma, mapped to their Lucide names."
			>
				<ComponentPreview name="icon-general" />
			</DocSection>

			<DocSection
				id="sizes"
				title="Sizes"
				description={
					<>
						12 / 14 / 16 / 20 / 24px. {code("md")}{" "}(16px) is the default and pairs with 14–16px text. Use{" "}
						{code("lg")}{" "}or {code("xl")}{" "}for empty states and feature highlights.
					</>
				}
			>
				<ComponentPreview name="icon-sizes" />
			</DocSection>

			<DocSection
				id="tones"
				title="Colors"
				description={
					<>
						By default an icon takes the color of the surrounding text ({code('tone="inherit"')}). Set a tone
						only when the icon needs its own color.
					</>
				}
			>
				<ComponentPreview name="icon-tones" />
			</DocSection>

			<DocSection
				id="buttons"
				title="In buttons"
				description={
					<>
						Pass a bare Lucide icon to {code("Button")}{" "}and {code("IconButton")}, not {code("<Icon>")}. The
						button sets the icon size from its own size.
					</>
				}
			>
				<ComponentPreview name="icon-in-button" />
			</DocSection>

			<DocSection
				id="accessibility"
				title="Accessibility"
				description={
					<>
						Icons next to text are decorative and hidden from screen readers automatically. When the icon is the
						only thing that carries meaning (a status indicator, for example), give it a {code("label")}. For an
						icon-only button, put the label on the button ({code("aria-label")}), not on the icon.
					</>
				}
			/>

			<DocSection
				id="browse"
				title="Browse all icons"
				description="Search the full Lucide set. Click an icon to copy its import."
			>
				<IconBrowser />
			</DocSection>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "icon", type: "LucideIcon", description: "The icon component, e.g. icon={Mail}. Required." },
						{
							name: "size",
							type: '"xs" | "sm" | "md" | "lg" | "xl"',
							default: '"md"',
							description: "12 / 14 / 16 / 20 / 24px.",
						},
						{
							name: "tone",
							type: '"inherit" | "default" | "muted" | "brand" | "danger" | "inverse"',
							default: '"inherit"',
							description: "Icon color. inherit uses the surrounding text color.",
						},
						{
							name: "label",
							type: "string",
							description: "Accessible name. Leave it out for decorative icons.",
						},
						{
							name: "strokeWidth",
							type: "number",
							default: "2",
							description: "Keep the default unless the UI/UX team specifies otherwise.",
						},
						{ name: "className", type: "string", description: "For layout only (margin, alignment)." },
					]}
				/>
			</DocSection>

			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Use Lucide for every icon, so stroke width and style match across apps.",
						"Use the same icon for the same action everywhere (e.g. Trash2 for delete).",
						"Pair icons with a text label unless the meaning is universal.",
					]}
					donts={[
						"Don't install another icon library (Hugeicons, Tabler, Phosphor, Remix…).",
						"Don't paste raw SVGs into components. If Lucide lacks an icon, ask the UI/UX team.",
						"Don't scale icons with arbitrary classes like size-[18px]. Use the size prop.",
						"Don't rely on color alone to convey status. Pair it with an icon shape or text.",
					]}
				/>
			</DocSection>
		</>
	);
}
