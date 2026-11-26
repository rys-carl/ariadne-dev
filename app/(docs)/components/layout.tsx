// Component docs shell: site header + left nav. Each page renders its own
// content column and (on doc pages) the "On this page" column.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/shared/layout/SiteHeader";
import { buttonStyles } from "@/shared/ui/Button";
import ComponentSearch from "./_components/ComponentSearch";
import DocsSidebar from "./_components/DocsSidebar";

export default function ComponentsLayout({ children }: LayoutProps<"/components">) {
	return (
		<div className="min-h-screen bg-surface">
			<SiteHeader
				search={<ComponentSearch />}
				actions={
					<Link href="/" className={buttonStyles({ size: "sm" })}>
						<ArrowLeft />
						<span className="hidden sm:inline">Back to Companion</span>
					</Link>
				}
			/>
			<div className="mx-auto flex max-w-[1800px] gap-8 px-4 sm:px-6">
				<aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-r border-text-100 py-6 pr-3 md:block">
					<DocsSidebar />
				</aside>
				<div className="min-w-0 flex-1 py-6">{children}</div>
			</div>
		</div>
	);
}
