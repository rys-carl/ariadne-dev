import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "form", title: "In a form" },
	{ id: "keyboard", title: "Keyboard" },
	{ id: "security", title: "Saving and showing HTML" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Field } from "@/shared/ui/Field";
import { RichTextEditor } from "@/shared/ui/RichTextEditor";

const [html, setHtml] = useState("");

<Field label="Remarks">
  <RichTextEditor value={html} onChange={setHtml} maxLength={500} />
</Field>`;

export default function RichTextEditorDoc() {
	return (
		<>
			<ComponentPreview name="rich-text-editor-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Formatted text with the spec&apos;s toolbar: font, size, bold, italic, underline, strikethrough, bulleted
						and numbered lists, and alignment. It&apos;s built on Tiptap (ProseMirror), so undo / redo, paste and
						selection behave like a word processor. The value is an HTML string; an empty editor gives{" "}
						{code('""')}. The fonts list is the app&apos;s three fonts (Inter, Poppins, Geist) plus common system
						fonts; pass {code("fonts")} to change it.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="form"
				title="In a form"
				description={
					<>
						Works inside {code("Field")}: the label focuses the editor, and the helper text and error are linked for
						screen readers. {code("maxLength")} adds a character counter and stops typing at the limit.
					</>
				}
			>
				<ComponentPreview name="rich-text-editor-form" />
			</DocSection>
			<DocSection
				id="keyboard"
				title="Keyboard"
				description="Ctrl / ⌘ + B, I and U for bold, italic and underline; Ctrl / ⌘ + Shift + S for strikethrough; Ctrl / ⌘ + Shift + 7 / 8 for numbered / bulleted lists; Ctrl / ⌘ + Z to undo. Typing “- ” or “1. ” at the start of a line starts a list. Toolbar buttons report their on / off state to screen readers."
			/>
			<DocSection
				id="security"
				title="Saving and showing HTML"
				description={
					<>
						The editor only produces the formatting its toolbar allows, but the value is still user input. Sanitize
						it on the server before storing it, and before rendering it with {code("dangerouslySetInnerHTML")}{" "}
						anywhere else, to prevent script injection.
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "value / defaultValue", type: "string (HTML)", description: "Controlled or initial content." },
						{ name: "onChange", type: "(html) => void", description: "Called on every edit. Empty editor → \"\"." },
						{ name: "placeholder", type: "string", description: "Shown while empty." },
						{ name: "maxLength", type: "number", description: "Character limit; also shows the counter." },
						{ name: "showCount", type: "boolean", default: "!!maxLength", description: "Show the character counter." },
						{ name: "minHeight", type: "string", default: '"12rem"', description: "Height of the editing area." },
						{ name: "fonts", type: "{ label, value }[]", default: "EDITOR_FONTS", description: "Font dropdown options." },
						{ name: "disabled / invalid / id", type: "—", description: "Inherited from Field when left out." },
						{ name: "aria-label", type: "string", description: "Accessible name when there's no Field label." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Use it for long-form text that needs formatting: remarks, notes, announcements.", "Set a maxLength that matches what the backend accepts."]}
					donts={["Don't use it for short or plain fields like names. Use Input or Textarea.", "Don't render saved HTML without sanitizing it."]}
				/>
			</DocSection>
		</>
	);
}
