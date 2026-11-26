// shared/ui/UserMenu.tsx — the header's user button ("JC John Dela Cruz /
// System Admin ⌄") and the ProfileCard it opens.
// Spec: "User Profile" and "Profile Settings" Figma. Documented at /components/header.
//
// Disclosure pattern: the button toggles the card (aria-expanded). The card
// is a native popover, so Escape or a click outside closes it and focus
// returns to the button.
"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "./Avatar";
import { ProfileCard, type ProfileCardProps } from "./ProfileCard";

export type UserProfileProps = Omit<ComponentProps<"button">, "children"> & {
	name: string;
	role?: string;
	avatarSrc?: string;
	/** Rotates the chevron. */
	open?: boolean;
};

/** The trigger on its own: avatar, name, role and chevron. */
export function UserProfile({ name, role, avatarSrc, open = false, className, type = "button", ...props }: UserProfileProps) {
	return (
		<button
			type={type}
			className={cn(
				"flex cursor-pointer items-center gap-3 rounded-xl py-1 pl-1 pr-2 text-left transition-colors hover:bg-text-100 focus-visible:outline-2 focus-visible:outline-brand",
				className,
			)}
			{...props}
		>
			<Avatar name={name} src={avatarSrc} />
			<span className="hidden min-w-0 leading-tight sm:block">
				<span className="block truncate text-base text-neutral-800">{name}</span>
				{role && <span className="block truncate text-sm text-slate-500">{role}</span>}
			</span>
			<ChevronDown aria-hidden className={cn("size-5 text-neutral-700 transition-transform", open && "rotate-180")} />
		</button>
	);
}

export type UserMenuProps = Omit<ProfileCardProps, "className"> & {
	role?: string;
	/** Which edge of the button the card lines up with. */
	align?: "start" | "end";
	className?: string;
};

export function UserMenu({ name, role, align = "end", className, ...card }: UserMenuProps) {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const panelId = useId();

	// The card is a native popover: it renders in the top layer, so no
	// overflow-hidden or scrolling ancestor can clip it, and the browser
	// handles click-outside, Escape and focus return. We only position it.
	const place = () => {
		const button = buttonRef.current;
		const panel = panelRef.current;
		if (!button || !panel) return;
		const r = button.getBoundingClientRect();
		panel.style.top = `${r.bottom + 8}px`;
		if (align === "end") {
			panel.style.right = `${document.documentElement.clientWidth - r.right}px`;
			panel.style.left = "auto";
		} else {
			panel.style.left = `${r.left}px`;
			panel.style.right = "auto";
		}
	};

	useEffect(() => {
		if (!open) return;
		const reposition = () => place();
		window.addEventListener("resize", reposition);
		window.addEventListener("scroll", reposition, true);
		return () => {
			window.removeEventListener("resize", reposition);
			window.removeEventListener("scroll", reposition, true);
		};
	});

	// Close after choosing an action, then run it.
	const actions = card.actions?.map((a) => ({
		...a,
		onClick: () => {
			panelRef.current?.hidePopover();
			a.onClick?.();
		},
	}));

	return (
		<div className={className}>
			<UserProfile
				ref={buttonRef}
				name={name}
				role={role}
				avatarSrc={card.avatarSrc}
				open={open}
				popoverTarget={panelId}
				aria-expanded={open}
				aria-controls={panelId}
				aria-label={`Account: ${name}${role ? `, ${role}` : ""}`}
			/>
			<div
				ref={panelRef}
				id={panelId}
				popover="auto"
				onBeforeToggle={(e) => {
					if (e.newState === "open") place();
				}}
				onToggle={(e) => setOpen(e.newState === "open")}
				className="fixed m-0 overflow-visible border-0 bg-transparent p-0 [inset:auto] transition-[opacity,translate] duration-150 ease-out starting:open:-translate-y-1 starting:open:opacity-0"
			>
				<ProfileCard name={name} {...card} actions={actions} />
			</div>
		</div>
	);
}
