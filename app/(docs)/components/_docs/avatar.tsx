import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Avatar, ClientCell } from "@/shared/ui/Avatar";

<ClientCell name="Maria Santos" id="CID-2024-0001" />
<Avatar name="Juan R. Dela Cruz" size="sm" />   // "JC"`;

export default function AvatarDoc() {
	return (
		<>
			<ComponentPreview name="avatar-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						{code("ClientCell")}{" "}is the spec&apos;s client-with-avatar cell. {code("Avatar")}{" "}shows the first and last
						initials. It&apos;s decorative and hidden from screen readers, since the name is always shown beside it.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "name", type: "string", description: "Full name. Initials come from it." },
						{ name: "id", type: "ReactNode", description: "Second line in ClientCell, e.g. the CID." },
						{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "28 / 36 / 48px." },
					]}
				/>
			</DocSection>
		</>
	);
}
