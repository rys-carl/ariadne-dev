// shared/ui/Breadcrumb.tsx — page title over a trail: Home › Parent › Current.
// Spec: "Breadcrumb" Figma (title above the trail). Documented at /components/breadcrumb.
//
//   <Breadcrumb
//     title="UI Components"
//     homeLabel="Home"
//     items={[{ label: "UI Components" }]}
//   />
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, House } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type BreadcrumbItem = {
	label: string;
	/** Leave out for a section that isn't a page of its own (rendered as text). */
	href?: string;
};

export type BreadcrumbProps = {
	/** Trail after Home, ending with the current page. */
	items: BreadcrumbItem[];
	/** Page title shown above the trail. */
	title?: ReactNode;
	/** Heading level for the title. Use h1 when it's the page's main heading. */
	titleAs?: "h1" | "h2" | "p";
	/** Show "Home" (or this text) instead of the house icon. */
	homeLabel?: string;
	/** Where the first crumb links. */
	homeHref?: string;
	className?: string;
	titleClassName?: string;
};

const linkClass =
	"rounded text-slate-500 transition-colors hover:text-text-900 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand";

export function Breadcrumb({
	items,
	title,
	titleAs: Title = "h1",
	homeLabel,
	homeHref = "/",
	className,
	titleClassName,
}: BreadcrumbProps) {
	const trail = (
		<nav aria-label="Breadcrumb" className={cn("text-sm", !title && className)}>
			<ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
				<li className="flex items-center">
					{homeLabel ? (
						<Link href={homeHref} className={linkClass}>
							{homeLabel}
						</Link>
					) : (
						<Link href={homeHref} aria-label="Home" className={cn(linkClass, "text-text-500")}>
							<House className="size-4" />
						</Link>
					)}
				</li>
				{items.map((item, i) => {
					const last = i === items.length - 1;
					return (
						<li key={`${item.label}-${i}`} className="flex items-center gap-2">
							<ChevronRight aria-hidden className="size-[1em] text-text-300" />
							{last ? (
								<span aria-current="page" className="font-medium text-brand-fg">
									{item.label}
								</span>
							) : item.href ? (
								<Link href={item.href} className={linkClass}>
									{item.label}
								</Link>
							) : (
								<span className="text-slate-500">{item.label}</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);

	if (!title) return trail;

	return (
		<div className={cn("space-y-2", className)}>
			<Title className={cn("text-3xl font-bold tracking-tight text-text-900", titleClassName)}>{title}</Title>
			{trail}
		</div>
	);
}
