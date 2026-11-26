import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "sides", title: "Sides" },
	{ id: "sizes", title: "Sizes" },
	{ id: "non-dismissable", title: "Non-dismissable" },
	{ id: "props", title: "Props" },
	{ id: "accessibility", title: "Accessibility" },
	{ id: "drawer-vs-dialog", title: "Drawer or dialog?" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { SlideDrawer } from "@/shared/ui/SlideDrawer";

const [open, setOpen] = useState(false);

<SlideDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Loan Details"
  description="View loan account information and payment schedule."
  header={<MetaBar … />}            // pinned, doesn't scroll
  footer={<Button variant="neutral" onClick={() => setOpen(false)}>Close</Button>}
>
  <DetailsCard title="Payment Details">…</DetailsCard>
</SlideDrawer>`;

const NON_DISMISSABLE = `const [saving, setSaving] = useState(false);

<SlideDrawer
  open={open}
  // No onClose while saving: Escape, backdrop and × do nothing.
  onClose={saving ? undefined : () => setOpen(false)}
  title="Edit Loan"
  footer={
    <>
      <Button variant="neutral" disabled={saving} onClick={() => setOpen(false)}>Cancel</Button>
      <Button type="submit" form="edit-loan" loading={saving}>Save changes</Button>
    </>
  }
>
  <form id="edit-loan" onSubmit={save}>…</form>
</SlideDrawer>`;

export default function SlideDrawerDoc() {
	return (
		<>
			<ComponentPreview name="slide-drawer-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						A full-height panel with a title, description and × button, an optional {code("header")} that stays
						pinned, a scrolling body and a sticky, right-aligned {code("footer")}. Use it to show a record&apos;s
						details next to the list it came from.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="sides"
				title="Sides"
				description={
					<>
						Slides in from the right by default. Use {code('side="left"')} for navigation-style panels.
					</>
				}
			>
				<ComponentPreview name="slide-drawer-sides" />
			</DocSection>
			<DocSection
				id="sizes"
				title="Sizes"
				description={
					<>
						{code("size")} sets the max width on screens 640px and up: sm 448px, md 576px, lg 768px (default), xl
						1024px, full. On smaller screens the drawer always fills the width.
					</>
				}
			>
				<ComponentPreview name="slide-drawer-sizes" />
			</DocSection>
			<DocSection
				id="non-dismissable"
				title="Non-dismissable"
				description={
					<>
						Leave {code("onClose")} out (for example while a save is running) and Escape, the backdrop and the ×
						button stop closing the drawer. To keep the dismiss gestures but drop the × button, use{" "}
						{code("hideCloseButton")}. For a form, give the {code("<form>")}{" "}an {code("id")} and point the
						footer&apos;s submit button at it with {code("form")}.
					</>
				}
			>
				<CodeBlock code={NON_DISMISSABLE} title="While saving" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "open", type: "boolean", description: "Whether the drawer is shown." },
						{ name: "onClose", type: "() => void", description: "Escape, backdrop and ×. Leave out to make it non-dismissable." },
						{ name: "title", type: "ReactNode", description: "Heading; also the drawer's accessible name." },
						{ name: "description", type: "ReactNode", description: "Text under the title; the accessible description." },
						{ name: "header", type: "ReactNode", description: "Pinned under the title, doesn't scroll (record summary, tabs)." },
						{ name: "children", type: "ReactNode", description: "The scrolling body." },
						{ name: "footer", type: "ReactNode", description: "Action buttons, right-aligned and pinned to the bottom." },
						{ name: "side", type: '"right" | "left"', default: '"right"', description: "Edge it slides in from." },
						{ name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"lg"', description: "Max width ≥ 640px: 448 / 576 / 768 / 1024px / none." },
						{ name: "hideCloseButton", type: "boolean", default: "false", description: "Hide the × button (Escape and backdrop still close)." },
						{ name: "bodyClassName", type: "string", description: "Extra classes for the scrolling body." },
						{ name: "className", type: "string", description: "Extra classes for the panel." },
						{ name: "aria-labelledby / aria-describedby", type: "string", description: "Override the ids taken from title and description." },
					]}
				/>
			</DocSection>
			<DocSection
				id="accessibility"
				title="Accessibility"
				description={
					<>
						Built on the native {code("<dialog>")}{" "}element opened with {code("showModal()")}, the same foundation as
						Dialog. The browser traps focus inside the drawer and returns it to the trigger on close, and makes the page
						behind it inert. Escape, a backdrop click and the × button call {code("onClose")}. Page scroll is locked
						while it&apos;s open, and the body scrolls on its own without scrolling the page. The slide animation is
						turned off for people who prefer reduced motion. Content unmounts when closed, so form state resets each time
						it opens.
					</>
				}
			/>
			<DocSection
				id="drawer-vs-dialog"
				title="Drawer or dialog?"
				description={
					<>
						Use a drawer for long or detailed content the user reads alongside the page: a record&apos;s details, an
						edit form, an activity log. Use a {code("Dialog")} for a short, focused task or a decision that needs the
						user&apos;s full attention, and a {code("ConfirmDialog")} to confirm a single action.
					</>
				}
			/>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Put summary facts or tabs in header so they stay visible while the body scrolls.", "Label the primary action with a verb: “Save changes”, not “OK”."]}
					donts={["Don't stack a drawer on top of another drawer.", "Don't use a drawer for a quick yes / no question. Use a confirm dialog."]}
				/>
			</DocSection>
		</>
	);
}
