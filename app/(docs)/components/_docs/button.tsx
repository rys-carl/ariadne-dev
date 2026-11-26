import { Plus } from "lucide-react";
import { Button, type ButtonSize, type ButtonVariant } from "@/shared/ui/Button";
import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "variants", title: "Variants" },
	{ id: "destructive", title: "Destructive" },
	{ id: "sizes", title: "Sizes" },
	{ id: "icons", title: "Icons" },
	{ id: "disabled", title: "Disabled" },
	{ id: "as-link", title: "As a link" },
	{ id: "matrix", title: "Spec matrix" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Button } from "@/shared/ui/Button";

<Button variant="primary" size="md" leftIcon={<Plus />}>
  New record
</Button>`;

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "neutral", "ghost", "link"];
const SIZES: ButtonSize[] = ["md", "sm", "xs"];

// Mirrors the Figma frame (rows: tone × variant, columns: size × state) so
// design QA can compare the implementation side by side. Hover is interactive.
function SpecMatrix() {
	const rows = [
		...VARIANTS.map((variant) => ({ variant, tone: "default" as const })),
		...VARIANTS.filter((v) => v !== "neutral").map((variant) => ({
			variant,
			tone: "destructive" as const,
		})),
	];

	return (
		<div className="overflow-x-auto rounded-xl border border-text-200">
			<table className="w-full min-w-[720px] text-sm">
				<thead className="bg-text-50 text-xs text-text-500">
					<tr>
						<th className="px-4 py-3 text-left font-medium">Tone / Variant</th>
						{SIZES.map((size) => (
							<th key={size} colSpan={2} className="px-4 py-3 text-left font-medium">
								{size} <span className="text-text-400">· default / disabled</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-text-100">
					{rows.map(({ variant, tone }) => (
						<tr key={`${tone}-${variant}`}>
							<td className="whitespace-nowrap px-4 py-3 text-xs text-text-500">
								{tone === "destructive" ? "Destructive" : "Default"} : {variant}
							</td>
							{SIZES.flatMap((size) =>
								[false, true].map((disabled) => {
									const props =
										variant === "neutral"
											? ({ variant } as const)
											: ({ variant, tone } as const);
									return (
										<td key={`${size}-${disabled}`} className="px-3 py-3">
											<Button {...props} size={size} disabled={disabled} leftIcon={<Plus />} rightIcon={<Plus />}>
												Button
											</Button>
										</td>
									);
								}),
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function ButtonDoc() {
	return (
		<>
			<ComponentPreview name="button-demo" />

			<DocSection id="usage" title="Usage">
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection
				id="variants"
				title="Variants"
				description="Use one primary button per view for the main action. Secondary and neutral support it; ghost and link are for low-emphasis actions."
			>
				<ComponentPreview name="button-variants" />
			</DocSection>

			<DocSection
				id="destructive"
				title="Destructive"
				description={
					<>
						Set <code className="font-mono text-sm">tone=&quot;destructive&quot;</code>{" "}for actions that delete
						or can&apos;t be undone. Available for primary, secondary, ghost and link. Neutral has no destructive
						tone, and TypeScript rejects that combination.
					</>
				}
			>
				<ComponentPreview name="button-destructive" />
			</DocSection>

			<DocSection
				id="sizes"
				title="Sizes"
				description="md (36px) is the default. Use sm (32px) in dense forms and table toolbars, and xs (24px) inside table rows and chips."
			>
				<ComponentPreview name="button-sizes" />
			</DocSection>

			<DocSection
				id="icons"
				title="Icons"
				description={
					<>
						Pass any <code className="font-mono text-sm">lucide-react</code>{" "}icon to{" "}
						<code className="font-mono text-sm">leftIcon</code>{" "}or{" "}
						<code className="font-mono text-sm">rightIcon</code>. It&apos;s sized automatically for the button
						size.
					</>
				}
			>
				<ComponentPreview name="button-icons" />
			</DocSection>

			<DocSection
				id="disabled"
				title="Disabled"
				description="Disabled buttons render at 50% opacity and ignore hover, as in the spec."
			>
				<ComponentPreview name="button-disabled" />
			</DocSection>

			<DocSection
				id="as-link"
				title="As a link"
				description={
					<>
						For navigation, use a Next.js <code className="font-mono text-sm">&lt;Link&gt;</code>{" "}with{" "}
						<code className="font-mono text-sm">buttonStyles()</code>{" "}instead of wrapping a button in a link.
					</>
				}
			>
				<ComponentPreview name="button-as-link" />
			</DocSection>

			<DocSection
				id="matrix"
				title="Spec matrix"
				description="Every variant, tone and size, laid out like the Figma frame for design QA. Hover over a cell to check its hover state."
			>
				<SpecMatrix />
			</DocSection>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{
							name: "variant",
							type: '"primary" | "secondary" | "neutral" | "ghost" | "link"',
							default: '"primary"',
							description: "Visual emphasis of the button.",
						},
						{
							name: "tone",
							type: '"default" | "destructive"',
							default: '"default"',
							description: "Destructive turns the button red. Not allowed with neutral.",
						},
						{
							name: "size",
							type: '"md" | "sm" | "xs"',
							default: '"md"',
							description: "Height 36 / 32 / 24px.",
						},
						{ name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label." },
						{ name: "rightIcon", type: "ReactNode", description: "Icon rendered after the label." },
						{
							name: "type",
							type: '"button" | "submit" | "reset"',
							default: '"button"',
							description: 'Defaults to "button", so it won\'t submit a form unless you ask it to.',
						},
						{
							name: "className",
							type: "string",
							description: "For layout only (margin, width). Don't override colors or sizing.",
						},
						{
							name: "...props",
							type: 'ComponentProps<"button">',
							description: "Every native button attribute (onClick, disabled, ref, aria-*, …).",
						},
					]}
				/>
			</DocSection>

			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Use a single primary button per view or dialog.",
						"Write labels as verbs that describe the result: “Save changes”, “Export CSV”.",
						"Use the destructive tone for irreversible actions, and confirm them in a dialog.",
						"Use a link with buttonStyles() when the action navigates to another page.",
					]}
					donts={[
						"Don't place two primary buttons side by side.",
						"Don't override colors with className. Ask the UI/UX team for a new variant instead.",
						"Don't use the link variant for page navigation inside text. Use a regular link.",
						"Don't rely on the disabled state alone to explain why an action is unavailable.",
					]}
				/>
			</DocSection>
		</>
	);
}
