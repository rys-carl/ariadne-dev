import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "dismissal", title: "Dismissal" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { AlertDialog } from "@/shared/ui/AlertDialog";

<AlertDialog
  open={timedOut}
  tone="warning"
  icon={Timer}
  title="Session timed out"
  description="You were signed out because of inactivity. Please sign in again to continue."
  actions={<Button size="sm" onClick={signIn}>Sign In</Button>}
/>`;

export default function AlertDialogDoc() {
	return (
		<>
			<ComponentPreview name="alert-dialog-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Interrupts the user with something they must respond to: a timeout, a failure, or work in progress. It
						uses {code('role="alertdialog"')}, so screen readers announce it immediately. To ask &ldquo;are you
						sure?&rdquo; before an action, use ConfirmDialog.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="dismissal"
				title="Dismissal"
				description={
					<>
						Without {code("onClose")}, Escape and backdrop clicks do nothing, and the user has to pick one of the
						actions. Use that when the choice matters (Session timed out, Syncing data). Pass {code("onClose")}{" "}when
						closing is harmless (Service timeout).
					</>
				}
			/>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "open", type: "boolean", description: "Whether the dialog is shown." },
						{ name: "onClose", type: "() => void", description: "Escape / backdrop. Leave out to force a choice." },
						{ name: "tone", type: '"warning" | "danger" | "success" | "info"', default: '"info"', description: "Icon tile color." },
						{ name: "icon", type: "LucideIcon", description: "Replaces the tone's default icon." },
						{ name: "loading", type: "boolean", description: "Spinner icon for work in progress." },
						{ name: "title", type: "ReactNode", description: "What happened, in a few words." },
						{ name: "description", type: "ReactNode", description: "What it means and what to do next." },
						{ name: "actions", type: "ReactNode", description: "Buttons. They share the full width equally." },
						{ name: "children", type: "ReactNode", description: "Extra content above the actions." },
					]}
				/>
			</DocSection>
		</>
	);
}
