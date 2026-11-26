"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { DraggableCard, SortableList } from "@/shared/ui/DraggableCard";
import { useAppToast } from "@/shared/ui/ToastContainer";

type Step = { id: string; title: string; description: string; role: string; actions: string[] };

const STEPS: Step[] = [
	{ id: "review", title: "Review", description: "Checks the submitted documents", role: "Branch Manager", actions: ["Endorse", "Return"] },
	{ id: "approval", title: "Approval", description: "Approves or rejects the request", role: "Area Manager", actions: ["Approve", "Reject"] },
	{ id: "resolution", title: "Resolution", description: "Closes the request and notifies the client", role: "Operations Head", actions: ["Resolve", "Escalate"] },
];

// Approval steps: drag the ⠿ handle (or use the keyboard) to reorder.
export default function DraggableCardDemo() {
	const [steps, setSteps] = useState(STEPS);
	const toast = useAppToast();

	const move = (from: number, to: number) =>
		setSteps((list) => {
			const next = [...list];
			const [item] = next.splice(from, 1);
			next.splice(to, 0, item);
			return next;
		});

	return (
		<SortableList
			aria-label="Approval steps"
			className="w-full max-w-sm text-left"
			items={steps}
			getId={(s) => s.id}
			getLabel={(s) => s.title}
			onReorder={(next) => setSteps(next)}
			renderItem={(step, ctx) => (
				<DraggableCard
					{...ctx}
					title={step.title}
					description={step.description}
					meta={{ label: "Required Role", value: step.role }}
					tags={step.actions}
					actions={[
						{ label: "Move up", icon: ArrowUp, disabled: ctx.index === 0, onClick: () => move(ctx.index, ctx.index - 1) },
						{ label: "Move down", icon: ArrowDown, disabled: ctx.index === steps.length - 1, onClick: () => move(ctx.index, ctx.index + 1) },
						{ label: "Edit", icon: Pencil, onClick: () => toast.info(`Edit “${step.title}”`) },
						{ label: "Remove", icon: Trash2, tone: "danger", onClick: () => setSteps((l) => l.filter((s) => s.id !== step.id)) },
					]}
				/>
			)}
		/>
	);
}
