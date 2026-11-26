// shared/ui/AppHeader.tsx — page header: title + breadcrumb on the left,
// actions (notifications, user menu) on the right.
// Spec: "Header" Figma. Documented at /components/header.
//
//   <AppHeader
//     title="Tab 1"
//     breadcrumb={[{ label: "Parent", href: "/parent" }, { label: "Section" }, { label: "Tab 1" }]}
//     actions={<><NotificationBell unread={3} /><UserMenu … /></>}
//   />
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

export type AppHeaderProps = {
	/** Page title. Rendered as the page's <h1>. */
	title: ReactNode;
	breadcrumb?: BreadcrumbItem[];
	homeHref?: string;
	/** Right side: NotificationBell, UserMenu, buttons. */
	actions?: ReactNode;
	/** Before the title, e.g. a menu button that opens the sidebar on phones. */
	leading?: ReactNode;
	/** Stick to the top of the scroll container. */
	sticky?: boolean;
	className?: string;
};

export function AppHeader({ title, breadcrumb, homeHref, actions, leading, sticky = false, className }: AppHeaderProps) {
	return (
		<header
			className={cn(
				"flex min-h-24 flex-wrap items-center justify-between gap-4 bg-canvas px-6 py-4",
				sticky && "sticky top-0 z-40",
				className,
			)}
		>
			<div className="flex min-w-0 items-center gap-3">
				{leading}
				<div className="min-w-0 space-y-0.5">
					<h1 className="truncate text-xl text-text-900">{title}</h1>
					{breadcrumb && breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} homeHref={homeHref} />}
				</div>
			</div>
			{actions && <div className="ml-auto flex items-center gap-4">{actions}</div>}
		</header>
	);
}
