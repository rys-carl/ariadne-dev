// shared/ui/DraggableCard.tsx — reorderable cards (dnd-kit).
// Spec: "Draggable Card" Figma (default, hover, dragging, "Drop here") and
// "Approval steps (draggable list)". Documented at /components/draggable-card.
//
//   <SortableList
//     items={steps}
//     getId={(s) => s.id}
//     getLabel={(s) => s.title}
//     onReorder={setSteps}
//     renderItem={(step, ctx) => (
//       <DraggableCard {...ctx} title={step.title} description={step.description}
//         meta={{ label: "Required Role", value: step.role }} tags={step.actions} />
//     )}
//   />
//
// Drag with the ⠿ handle (mouse or touch), or with the keyboard: focus the
// handle, Space to pick up, arrow keys to move, Space to drop, Escape to cancel.
"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import {
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
	type DraggableAttributes,
	type DraggableSyntheticListeners,
	type UniqueIdentifier,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ellipsis, GripVertical, Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

// ── Card ─────────────────────────────────────────────────────────────────────

export type CardAction = { label: string; icon?: LucideIcon; onClick: () => void; tone?: "default" | "danger"; disabled?: boolean };

/** What SortableList passes to each rendered card. */
export type DragContext = {
	index: number;
	/** Spread onto the drag handle (done for you by DraggableCard). */
	handleProps?: {
		/** dnd-kit's activator callback; attach to the handle element. */
		setHandle: (el: HTMLElement | null) => void;
		attributes: DraggableAttributes;
		listeners: DraggableSyntheticListeners;
	};
	/** The floating copy that follows the pointer while dragging. */
	isOverlay?: boolean;
};

export type DraggableCardProps = Partial<DragContext> & {
	title: ReactNode;
	description?: ReactNode;
	/** Number in the green badge. Defaults to index + 1. */
	step?: number | false;
	/** e.g. { label: "Required Role", value: "Branch Manager" }. */
	meta?: { label: ReactNode; value: ReactNode };
	tags?: string[];
	/** Items in the ⋯ menu. */
	actions?: CardAction[];
	/** Accessible name for the handle and menu; defaults to the title when it's a string. */
	label?: string;
	className?: string;
};

function CardMenu({ actions, label }: { actions: CardAction[]; label: string }) {
	const id = useId();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	// Native popover: top layer, light-dismiss and Escape for free; we only position it.
	function place() {
		const b = buttonRef.current?.getBoundingClientRect();
		const m = menuRef.current;
		if (!b || !m) return;
		m.style.top = `${Math.min(b.bottom + 4, window.innerHeight - m.offsetHeight - 8)}px`;
		m.style.left = `${Math.max(8, b.right - m.offsetWidth)}px`;
	}

	return (
		<>
			<button
				ref={buttonRef}
				type="button"
				popoverTarget={id}
				aria-haspopup="menu"
				aria-label={`Actions for ${label}`}
				title="Actions"
				className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-500 transition-colors hover:bg-text-100 hover:text-text-900 focus-visible:outline-2 focus-visible:outline-brand"
			>
				<Ellipsis className="size-4" />
			</button>
			<div
				ref={menuRef}
				id={id}
				popover="auto"
				role="menu"
				aria-label={`Actions for ${label}`}
				onToggle={(e) => {
					if (e.newState !== "open") return;
					place();
					requestAnimationFrame(() => menuRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus());
				}}
				onKeyDown={(e) => {
					if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
					e.preventDefault();
					const items = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])];
					const i = items.indexOf(document.activeElement as HTMLButtonElement);
					items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
				}}
				className="fixed m-0 min-w-40 rounded-lg border border-text-200 bg-surface p-1 shadow-lg [inset:auto]"
			>
				{actions.map(({ label: text, icon: Icon, onClick, tone, disabled }) => (
					<button
						key={text}
						type="button"
						role="menuitem"
						disabled={disabled}
						onClick={() => {
							menuRef.current?.hidePopover();
							onClick();
						}}
						className={cn(
							"flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
							tone === "danger" ? "text-danger hover:bg-danger-subtle focus:bg-danger-subtle" : "text-text-800 hover:bg-text-100 focus:bg-text-100",
						)}
					>
						{Icon && <Icon className="size-4 shrink-0" aria-hidden />}
						{text}
					</button>
				))}
			</div>
		</>
	);
}

export function DraggableCard({
	title,
	description,
	step,
	meta,
	tags,
	actions,
	label,
	index = 0,
	handleProps,
	isOverlay = false,
	className,
}: DraggableCardProps) {
	const name = label ?? (typeof title === "string" ? title : `Item ${index + 1}`);
	const number = step === false ? null : (step ?? index + 1);
	const hasHandle = !!handleProps;
	const setHandle = handleProps?.setHandle;
	const handleAttributes = handleProps?.attributes;
	const handleListeners = handleProps?.listeners;

	return (
		<div
			className={cn(
				"group/card rounded-xl border bg-surface p-4 transition-shadow",
				isOverlay ? "cursor-grabbing border-brand shadow-xl" : "border-text-200 hover:shadow-md",
				className,
			)}
		>
			<div className="flex items-start gap-2">
				{hasHandle && (
					<button
						ref={setHandle}
						type="button"
						{...handleAttributes}
						{...handleListeners}
						aria-label={`Reorder ${name}`}
						title="Drag to reorder"
						className={cn(
							"-ml-1.5 mt-0.5 flex size-7 shrink-0 touch-none items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-brand",
							isOverlay ? "cursor-grabbing text-brand-fg" : "cursor-grab text-text-400 hover:bg-text-100 hover:text-text-700",
						)}
					>
						<GripVertical className="size-4" />
					</button>
				)}
				{number !== null && (
					<span aria-hidden className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-[11px] font-semibold text-brand-fg">
						{number}
					</span>
				)}
				<div className="min-w-0 flex-1 pt-0.5">
					<p className="truncate text-sm font-semibold text-text-900">
						{number !== null && <span className="sr-only">Step {number}: </span>}
						{title}
					</p>
					{description && <p className="truncate text-xs text-text-500">{description}</p>}
				</div>
				{actions && actions.length > 0 && <CardMenu actions={actions} label={name} />}
			</div>
			{(meta || (tags && tags.length > 0)) && (
				<div className="mt-3 space-y-2.5 border-t border-text-100 pt-3">
					{meta && (
						<dl>
							<dt className="text-xs text-text-500">{meta.label}:</dt>
							<dd className="text-sm font-semibold text-text-900">{meta.value}</dd>
						</dl>
					)}
					{tags && tags.length > 0 && (
						<ul className="flex flex-wrap gap-1.5">
							{tags.map((t) => (
								<li key={t} className="rounded-md bg-text-100 px-2 py-0.5 text-xs text-text-700">
									{t}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}

/** The dashed "Drop here" slot. SortableList shows it where the dragged card will land. */
export function DropZone({ className, label = "Drop here" }: { className?: string; label?: string }) {
	return (
		<div
			aria-hidden
			className={cn(
				"flex h-full min-h-28 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-green-600/60 bg-brand-subtle text-xs font-medium text-brand-fg",
				className,
			)}
		>
			<Plus className="size-4" />
			{label}
		</div>
	);
}

// ── List ─────────────────────────────────────────────────────────────────────

function SortableItem({ id, children }: { id: UniqueIdentifier; children: (ctx: Omit<DragContext, "index">, dragging: boolean) => ReactNode }) {
	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });
	return (
		<li ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }} className="list-none">
			{children({ handleProps: { setHandle: setActivatorNodeRef, attributes, listeners } }, isDragging)}
		</li>
	);
}

export type SortableListProps<T> = {
	items: T[];
	getId: (item: T) => UniqueIdentifier;
	/** Name read to screen readers while dragging, e.g. the step title. */
	getLabel: (item: T) => string;
	onReorder: (items: T[], move: { from: number; to: number }) => void;
	renderItem: (item: T, ctx: DragContext) => ReactNode;
	/** "list" stacks vertically; "grid" wraps cards in columns. */
	layout?: "list" | "grid";
	/** Accessible name for the list. */
	"aria-label"?: string;
	className?: string;
};

export function SortableList<T>({
	items,
	getId,
	getLabel,
	onReorder,
	renderItem,
	layout = "list",
	"aria-label": ariaLabel,
	className,
}: SortableListProps<T>) {
	// A stable id keeps dnd-kit's generated aria ids identical on server and client.
	const dndId = useId();
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	// dnd-kit fires a dragOver right after pickup (over = itself); skip announcing
	// that one so "Picked up …" isn't immediately replaced.
	const movedRef = useRef(false);
	const sensors = useSensors(
		// A small distance so a click on the handle doesn't start a drag.
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
		useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const ids = items.map(getId);
	const position = (id: UniqueIdentifier | undefined) => ids.indexOf(id as UniqueIdentifier) + 1;
	const nameOf = (id: UniqueIdentifier) => {
		const item = items.find((i) => getId(i) === id);
		return item ? getLabel(item) : "item";
	};
	const activeIndex = activeId === null ? -1 : ids.indexOf(activeId);

	return (
		<DndContext
			id={dndId}
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={({ active }) => {
				movedRef.current = false;
				setActiveId(active.id);
			}}
			onDragCancel={() => setActiveId(null)}
			onDragEnd={({ active, over }) => {
				setActiveId(null);
				if (!over || active.id === over.id) return;
				const from = ids.indexOf(active.id);
				const to = ids.indexOf(over.id);
				onReorder(arrayMove(items, from, to), { from, to });
			}}
			accessibility={{
				screenReaderInstructions: {
					draggable: "To reorder, press Space or Enter to pick up. Use the arrow keys to move, Space or Enter to drop, or Escape to cancel.",
				},
				announcements: {
					onDragStart: ({ active }) => `Picked up ${nameOf(active.id)}. Position ${position(active.id)} of ${ids.length}.`,
					onDragOver: ({ active, over }) => {
						if (!movedRef.current && over?.id === active.id) return undefined;
						movedRef.current = true;
						return over ? `${nameOf(active.id)} moved to position ${position(over.id)} of ${ids.length}.` : `${nameOf(active.id)} is outside the list.`;
					},
					onDragEnd: ({ active, over }) =>
						over ? `${nameOf(active.id)} dropped at position ${position(over.id)} of ${ids.length}.` : `${nameOf(active.id)} returned to its place.`,
					onDragCancel: ({ active }) => `Reordering cancelled. ${nameOf(active.id)} returned to position ${position(active.id)}.`,
				},
			}}
		>
			<SortableContext items={ids} strategy={layout === "grid" ? rectSortingStrategy : verticalListSortingStrategy}>
				<ul
					aria-label={ariaLabel}
					className={cn(layout === "grid" ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-3", className)}
				>
					{items.map((item, index) => (
						<SortableItem key={getId(item)} id={getId(item)}>
							{(ctx, dragging) =>
								dragging ? (
									// The original slot becomes the "Drop here" placeholder; the card follows the pointer in the overlay.
									<div className="relative">
										<div className="invisible">{renderItem(item, { index })}</div>
										<DropZone className="absolute inset-0" />
									</div>
								) : (
									renderItem(item, { ...ctx, index })
								)
							}
						</SortableItem>
					))}
				</ul>
			</SortableContext>
			<DragOverlay>
				{activeIndex >= 0 ? renderItem(items[activeIndex], { index: activeIndex, isOverlay: true, handleProps: { setHandle: () => {}, attributes: {} as DraggableAttributes, listeners: undefined } }) : null}
			</DragOverlay>
		</DndContext>
	);
}
