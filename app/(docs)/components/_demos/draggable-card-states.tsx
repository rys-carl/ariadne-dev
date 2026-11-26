"use client";

import { DraggableCard, DropZone } from "@/shared/ui/DraggableCard";

const card = { title: "Review", description: "Checks the submitted documents", meta: { label: "Required Role", value: "Branch Manager" }, tags: ["Endorse", "Return"] };
const handle = { setHandle: () => {}, attributes: {} as never, listeners: undefined };

// The spec's states, side by side: default, hover, dragging, and the drop target.
export default function DraggableCardStates() {
	return (
		<div className="grid w-full gap-4 text-left sm:grid-cols-2 xl:grid-cols-4">
			<DraggableCard {...card} handleProps={handle} />
			<DraggableCard {...card} handleProps={handle} className="shadow-md" />
			<DraggableCard {...card} handleProps={handle} isOverlay className="cursor-default" />
			<DropZone />
		</div>
	);
}