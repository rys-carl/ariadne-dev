import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "async", title: "Async actions" },
	{ id: "remarks", title: "Remarks" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";

<ConfirmDialog
  open={open}
  onCancel={() => setOpen(false)}
  onConfirm={async () => {
    await blockAccount(cid);   // spinner shows while this runs
    setOpen(false);
    toast.success("Account blocked.");
  }}
  tone="danger"
  title="Block Account"
  description="Are you sure you want to block this account?"
  details={[{ label: "CID", value: cid }, { label: "Client", value: name }]}
  notice="Blocked accounts can only be restored by an administrator."
  confirmLabel="Block Account"
/>`;

const REMARKS = `<ConfirmDialog
  remarks                       // required, labelled "Remarks"
  onConfirm={(remarks) => reject(cid, remarks)}
  …
/>

// Optional remarks with custom text:
remarks={{ label: "Note", placeholder: "Optional note", required: false }}`;

export default function ConfirmDialogDoc() {
	return (
		<>
			<ComponentPreview name="confirm-dialog-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description="Asks for confirmation before a consequential action. The demo recreates every example from the spec; Delete Record simulates a failed request."
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="async"
				title="Async actions"
				description={
					<>
						When {code("onConfirm")}{" "}returns a promise, the confirm button shows a spinner and the dialog can&apos;t
						be dismissed until it settles. Close it yourself on success. If the promise rejects, the dialog stays open
						so the user can retry, so report the error yourself, for example with a toast.
					</>
				}
			/>
			<DocSection id="remarks" title="Remarks" description="Adds a remarks box. Required remarks are validated before onConfirm runs.">
				<CodeBlock code={REMARKS} title="Remarks" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "open", type: "boolean", description: "Whether the dialog is shown." },
						{ name: "onCancel", type: "() => void", description: "Cancel button, Escape and backdrop." },
						{ name: "onConfirm", type: "(remarks: string) => void | Promise", description: "Runs the action. See Async actions." },
						{ name: "tone", type: '"warning" | "danger" | "success" | "info"', default: '"warning"', description: "Icon and notice color." },
						{ name: "destructive", type: "boolean", default: 'tone === "danger"', description: "Red confirm button." },
						{ name: "title", type: "ReactNode", description: "The action as a question or name: “Block Account”." },
						{ name: "description", type: "ReactNode", description: "What will happen." },
						{ name: "details", type: "{ label, value }[]", description: "Facts about the affected record." },
						{ name: "notice", type: "ReactNode", description: "Consequence, shown in a callout." },
						{ name: "remarks", type: "boolean | { label?, placeholder?, required? }", description: "Adds a remarks box." },
						{ name: "confirmLabel", type: "string", default: '"Confirm"', description: "Repeat the action: “Block Account”, not “Yes”." },
						{ name: "cancelLabel", type: "string", default: '"Cancel"', description: "Cancel button text." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={[
						"Name the record in details, so the user can check it's the right one.",
						"State consequences plainly in the notice: “This action cannot be undone.”",
						"Use the danger tone for anything that deletes data or removes access.",
					]}
					donts={[
						"Don't confirm routine, easily reversed actions. It trains users to click through.",
						"Don't label the buttons “Yes” and “No”.",
					]}
				/>
			</DocSection>
		</>
	);
}
