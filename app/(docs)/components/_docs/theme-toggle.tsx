import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "how-it-works", title: "How dark mode works" },
	{ id: "writing", title: "Writing theme-safe UI" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { useTheme } from "@/shared/lib/theme";

<ThemeToggle />                  // icon button (headers)
<ThemeToggle variant="label" />  // "Light theme" / "Dark theme"

const { theme, setTheme, toggle } = useTheme();`;

const SAFE = `// Use tokens: they switch automatically
<div className="bg-surface text-text-900 border-text-200">…</div>
<p className="text-brand-fg">Green text</p>
<button className="bg-brand text-white">Primary</button>

// Avoid: these stay the same in both themes
<div className="bg-white text-black border-[#e5e7eb]">…</div>`;

export default function ThemeToggleDoc() {
	return (
		<>
			<ComponentPreview name="theme-toggle-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description="Switches the whole app between light and dark. The choice is remembered on this device and synced across open tabs. It's in the app header, the site header and on the profile settings page."
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="how-it-works"
				title="How dark mode works"
				description={
					<>
						The theme is a {code(".dark")}{" "}class on {code("<html>")}. Instead of adding {code("dark:")}{" "}classes to
						every component, {code("globals.css")}{" "}redefines the color tokens under {code(".dark")}: grays flip,
						status tints become translucent, and text shades get lighter. A small script in {code("app/layout.tsx")}{" "}
						applies the saved theme before the page paints, so there&apos;s no flash of the wrong theme.
					</>
				}
			/>
			<DocSection
				id="writing"
				title="Writing theme-safe UI"
				description={
					<>
						Use {code("bg-surface")}{" "}for cards and {code("bg-canvas")}{" "}for page backgrounds instead of white, and{" "}
						{code("text-brand-fg")}{" "}for green text ({code("bg-brand")}{" "}stays dark enough for white text in both
						themes). For the rare one-off, the {code("dark:")}{" "}variant also works.
					</>
				}
			>
				<CodeBlock code={SAFE} title="Do / don't" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "variant", type: '"icon" | "label"', default: '"icon"', description: "Icon button or labelled button." },
						{ name: "className", type: "string", description: "Layout and color overrides." },
					]}
				/>
			</DocSection>
		</>
	);
}
