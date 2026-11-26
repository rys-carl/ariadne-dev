// shared/ui/Tabs.tsx — switch between views.
// Spec: "Tab Navigation" Figma (plain, track, with icons, dark).
// Documented at /components/tabs.
//
// Follows the WAI-ARIA tabs pattern: one Tab stop for the whole list,
// arrow keys / Home / End move between tabs, and each tab is linked to
// its panel. Pass `content` on items to render panels, or leave it out to
// use the tabs as a filter.
"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type TabItem = {
	value: string;
	label: ReactNode;
	/** Icon before the label, e.g. a lucide icon. */
	icon?: ReactNode;
	/** Panel shown when this tab is active. */
	content?: ReactNode;
	disabled?: boolean;
};

export type TabsVariant = "default" | "track" | "dark";

const lists: Record<TabsVariant, string> = {
	default: "gap-1",
	track: "gap-1 rounded-xl bg-slate-100 p-1",
	dark: "gap-1 rounded-xl border-2 border-brand bg-black p-0.5",
};

const inactive: Record<TabsVariant, string> = {
	default: "text-brand-fg hover:bg-brand-subtle",
	track: "text-brand-fg hover:bg-surface/70",
	dark: "text-white hover:bg-white/10",
};

const sizes = {
	sm: "h-8 min-w-20 px-3 text-[13px]",
	md: "h-9 min-w-24 px-4 text-sm",
};

export type TabsProps = {
	items: TabItem[];
	/** Controlled active value. */
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	variant?: TabsVariant;
	size?: keyof typeof sizes;
	/** Stretch the tabs to fill the width. */
	fullWidth?: boolean;
	/** Describes the tab list for screen readers, e.g. "Account sections". */
	"aria-label"?: string;
	className?: string;
	panelClassName?: string;
};

export function Tabs({
	items,
	value: valueProp,
	defaultValue,
	onValueChange,
	variant = "default",
	size = "md",
	fullWidth = false,
	"aria-label": ariaLabel,
	className,
	panelClassName,
}: TabsProps) {
	const [inner, setInner] = useState(defaultValue ?? items.find((i) => !i.disabled)?.value);
	const value = valueProp ?? inner;
	const baseId = useId();
	const refs = useRef<(HTMLButtonElement | null)[]>([]);
	const activeIndex = Math.max(0, items.findIndex((i) => i.value === value));
	const hasPanels = items.some((i) => i.content !== undefined);

	function select(index: number) {
		const item = items[index];
		if (!item || item.disabled) return;
		if (valueProp === undefined) setInner(item.value);
		onValueChange?.(item.value);
		refs.current[index]?.focus();
	}

	function onKeyDown(e: KeyboardEvent) {
		const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
		const pos = enabled.indexOf(activeIndex);
		const target =
			e.key === "ArrowRight" ? enabled[(pos + 1) % enabled.length]
			: e.key === "ArrowLeft" ? enabled[(pos - 1 + enabled.length) % enabled.length]
			: e.key === "Home" ? enabled[0]
			: e.key === "End" ? enabled[enabled.length - 1]
			: undefined;
		if (target === undefined) return;
		e.preventDefault();
		select(target);
	}

	const active = items[activeIndex];

	return (
		<div className={cn("flex min-w-0 max-w-full flex-col gap-4", className)}>
			<div
				role="tablist"
				aria-label={ariaLabel}
				onKeyDown={onKeyDown}
				className={cn(fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full overflow-x-auto", lists[variant])}
			>
				{items.map((item, i) => {
					const selected = i === activeIndex;
					return (
						<button
							key={item.value}
							ref={(node) => {
								refs.current[i] = node;
							}}
							type="button"
							role="tab"
							id={`${baseId}-tab-${i}`}
							aria-selected={selected}
							aria-controls={hasPanels ? `${baseId}-panel-${i}` : undefined}
							tabIndex={selected ? 0 : -1}
							disabled={item.disabled}
							onClick={() => select(i)}
							className={cn(
								"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors",
								"outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4",
								sizes[size],
								fullWidth && "flex-1",
								selected ? "bg-brand text-white" : inactive[variant],
							)}
						>
							{item.icon}
							{item.label}
						</button>
					);
				})}
			</div>
			{hasPanels && active && (
				<div
					role="tabpanel"
					id={`${baseId}-panel-${activeIndex}`}
					aria-labelledby={`${baseId}-tab-${activeIndex}`}
					tabIndex={0}
					className={cn("rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand", panelClassName)}
				>
					{active.content}
				</div>
			)}
		</div>
	);
}
