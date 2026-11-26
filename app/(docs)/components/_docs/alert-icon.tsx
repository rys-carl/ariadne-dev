import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { AlertIcon } from "@/shared/ui/AlertIcon";

<AlertIcon tone="danger" />
<AlertIcon tone="warning" icon={Timer} />
<AlertIcon tone="warning" loading />`;

export default function AlertIconDoc() {
	return (
		<>
			<ComponentPreview name="alert-icon-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						The tile at the top of AlertDialog and ConfirmDialog. Pick the tone by meaning: {code("warning")}{" "}for
						reversible but significant actions, {code("danger")}{" "}for destructive or failed ones, {code("success")}{" "}
						and {code("info")}{" "}for outcomes and neutral confirmations. It&apos;s decorative, so the dialog title
						must say what happened.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "tone", type: '"warning" | "danger" | "success" | "info"', default: '"info"', description: "Color and default icon." },
						{ name: "icon", type: "LucideIcon", description: "Replaces the default icon." },
						{ name: "loading", type: "boolean", default: "false", description: "Spinner instead of an icon." },
						{ name: "size", type: '"md" | "lg"', default: '"lg"', description: "36px or 48px tile." },
					]}
				/>
			</DocSection>
		</>
	);
}
