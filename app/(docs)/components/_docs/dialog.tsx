import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "behavior", title: "Behavior" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { Dialog } from "@/shared/ui/Dialog";

const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Loan Details"
  description="View loan account information and payment schedule."
  footer={<Button variant="neutral" onClick={() => setOpen(false)}>Close</Button>}
>
  <DetailsCard title="Payment Details">…</DetailsCard>
</Dialog>`;

export default function DialogDoc() {
	return (
		<>
			<ComponentPreview name="dialog-demo" />
			<DocSection id="usage" title="Usage" description="The modal container: title, description, close button, scrollable body and a right-aligned footer.">
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="behavior"
				title="Behavior"
				description={
					<>
						Built on the native {code("<dialog>")}{" "}element, so the browser traps focus inside it, makes the page
						behind it inert, returns focus to the trigger when it closes, and locks page scroll. Escape, the × button
						and a backdrop click call {code("onClose")}. Leave {code("onClose")}{" "}out to make a dialog that can only be
						closed by its own buttons. Content unmounts when closed, so form state resets each time it opens.
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "open", type: "boolean", description: "Whether the dialog is shown." },
						{ name: "onClose", type: "() => void", description: "Escape, backdrop and ×. Leave out to make it non-dismissable." },
						{ name: "title", type: "ReactNode", description: "Heading; also the dialog's accessible name." },
						{ name: "description", type: "ReactNode", description: "Text under the title." },
						{ name: "footer", type: "ReactNode", description: "Action buttons, right-aligned." },
						{ name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"lg"', description: "Max width: 448 / 512 / 672 / 896px." },
						{ name: "hideCloseButton", type: "boolean", default: "false", description: "Hide the × button." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Use a dialog for a focused task or detail view that doesn't need its own page.", "Label the primary action with a verb: “Save changes”, not “OK”."]}
					donts={["Don't open a dialog from inside another dialog.", "Don't put long, multi-page forms in a dialog. Give them a page."]}
				/>
			</DocSection>
		</>
	);
}
