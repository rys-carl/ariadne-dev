import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "grid", title: "Grid" },
	{ id: "keyboard", title: "Keyboard and screen readers" },
	{ id: "props", title: "Props" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `import { DraggableCard, SortableList } from "@/shared/ui/DraggableCard";

const [steps, setSteps] = useState(initialSteps);

<SortableList
  aria-label="Approval steps"
  items={steps}
  getId={(s) => s.id}
  getLabel={(s) => s.title}
  onReorder={(next, { from, to }) => setSteps(next)}   // then save the new order
  renderItem={(step, ctx) => (
    <DraggableCard
      {...ctx}                                         // handle, index, overlay state
      title={step.title}
      description={step.description}
      meta={{ label: "Required Role", value: step.role }}
      tags={step.actions}
      actions={[{ label: "Edit", onClick: () => edit(step) }]}
    />
  )}
/>`;

export default function DraggableCardDoc() {
	return (
		<>
			<ComponentPreview name="draggable-card-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						{code("SortableList")} handles the dragging; {code("DraggableCard")} is the card from the spec (step
						number, title, description, required role, action tags and a ⋯ menu). Spread {code("ctx")} onto the
						card so it gets the drag handle, its position and the overlay state. The step number follows the
						position, so it updates as cards move. Built on dnd-kit.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="states"
				title="States"
				description="Default, hover (raised), dragging (brand border, follows the pointer) and the “Drop here” slot that marks where the card will land."
			>
				<ComponentPreview name="draggable-card-states" />
			</DocSection>
			<DocSection id="grid" title="Grid" description={<>{code('layout="grid"')} sorts cards in rows and columns.</>}>
				<ComponentPreview name="draggable-card-grid" />
			</DocSection>
			<DocSection
				id="keyboard"
				title="Keyboard and screen readers"
				description="Only the ⠿ handle starts a drag, so text and buttons in the card stay clickable. With the keyboard: Tab to the handle, Space or Enter to pick up, arrow keys to move, Space or Enter to drop, Escape to cancel. Each move is announced (“Approval moved to position 1 of 3”). On touch screens, press and hold the handle briefly so scrolling still works. The ⋯ menu’s Move up / Move down give a no-drag alternative."
			/>
			<DocSection id="props" title="Props">
				<p className="text-sm font-semibold text-text-900">SortableList</p>
				<PropsTable
					rows={[
						{ name: "items", type: "T[]", description: "Items in their current order." },
						{ name: "getId / getLabel", type: "(item) => id / string", description: "Stable id, and the name read to screen readers." },
						{ name: "onReorder", type: "(items, { from, to }) => void", description: "Called with the new order after a drop." },
						{ name: "renderItem", type: "(item, ctx) => ReactNode", description: "Render a card; spread ctx onto DraggableCard." },
						{ name: "layout", type: '"list" | "grid"', default: '"list"', description: "Vertical list or wrapping grid." },
						{ name: "aria-label", type: "string", description: "Names the list." },
					]}
				/>
				<p className="pt-2 text-sm font-semibold text-text-900">DraggableCard</p>
				<PropsTable
					rows={[
						{ name: "title / description", type: "ReactNode", description: "Heading and subtitle." },
						{ name: "meta", type: "{ label, value }", description: "Labelled value, e.g. Required Role." },
						{ name: "tags", type: "string[]", description: "Small pills, e.g. the step's actions." },
						{ name: "actions", type: "{ label, icon?, onClick, tone?, disabled? }[]", description: "Items in the ⋯ menu." },
						{ name: "step", type: "number | false", default: "index + 1", description: "Number in the badge; false hides it." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Save the new order as soon as it changes (or show a Save button for big edits).", "Keep cards short so several fit on screen while dragging."]}
					donts={["Don't make the whole card the drag handle when it has buttons or links.", "Don't rely on dragging alone. Keep Move up / Move down in the menu."]}
				/>
			</DocSection>
		</>
	);
}
