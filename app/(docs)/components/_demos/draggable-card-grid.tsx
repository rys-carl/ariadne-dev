"use client";

import { useState } from "react";
import { DraggableCard, SortableList } from "@/shared/ui/DraggableCard";

const CARDS = [
	{ id: "a", title: "Document check", role: "Account Officer", tags: ["Verify", "Return"] },
	{ id: "b", title: "Credit review", role: "Unit Manager", tags: ["Endorse", "Return"] },
	{ id: "c", title: "Approval", role: "Area Manager", tags: ["Approve", "Reject"] },
	{ id: "d", title: "Release", role: "Regional Director", tags: ["Release"] },
	{ id: "e", title: "Notification", role: "System", tags: ["SMS", "Email"] },
];

// layout="grid" sorts in two dimensions.
export default function DraggableCardGrid() {
	const [cards, setCards] = useState(CARDS);
	return (
		<SortableList
			layout="grid"
			aria-label="Workflow stages"
			className="w-full text-left"
			items={cards}
			getId={(c) => c.id}
			getLabel={(c) => c.title}
			onReorder={setCards}
			renderItem={(c, ctx) => <DraggableCard {...ctx} title={c.title} meta={{ label: "Owner", value: c.role }} tags={c.tags} />}
		/>
	);
}
