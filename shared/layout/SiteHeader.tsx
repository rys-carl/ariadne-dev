// shared/layout/SiteHeader.tsx — top bar for public pages (workspace, docs).
// `search` is a slot: only the /components layout fills it, so the component
// search appears on component pages and nowhere else.
//
// `overlay`: the header floats over the page and is transparent at the top,
// turning into a frosted surface once scrolled.
"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Gamepad2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export type SiteHeaderProps = {
	search?: ReactNode;
	/** Links or buttons on the right, before the theme toggle. */
	actions?: ReactNode;
	/** Transparent over the page until scrolled. */
	overlay?: boolean;
};

export default function SiteHeader({ search, actions, overlay = false }: SiteHeaderProps) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (!overlay) return;
		const update = () => setScrolled(window.scrollY > 8);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, [overlay]);

	const solid = !overlay || scrolled;

	return (
		<header
			className={cn(
				"top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-200",
				overlay ? "fixed inset-x-0" : "sticky",
				solid ? "border-text-200/70 bg-surface/85 backdrop-blur-md" : "border-transparent bg-transparent",
			)}
		>
			{/* With search: one 56px row from md up; on phones search drops to a second row. */}
			<div className="mx-auto flex min-h-14 max-w-[1800px] flex-wrap items-center gap-x-4 gap-y-2.5 px-4 py-2 sm:px-6 md:h-14 md:flex-nowrap md:py-0">
				<Link
					href="/"
					className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
				>
					<span className="flex size-8 items-center justify-center rounded-lg bg-brand-subtle text-brand-fg ring-1 ring-inset ring-brand/20">
						<Gamepad2 className="size-4.5" aria-hidden />
					</span>
					<span className={cn("text-sm font-semibold tracking-tight text-text-900", search ? "hidden sm:inline" : "inline")}>
						Ariadne
					</span>
				</Link>

				{search && <div className="order-last w-full md:order-none md:ml-auto md:w-56 lg:w-64">{search}</div>}
				<div className={cn("flex items-center gap-1.5", search ? "ml-auto md:ml-0" : "ml-auto")}>
					{actions}
					<ThemeToggle className="text-text-700" />
				</div>
			</div>
		</header>
	);
}
