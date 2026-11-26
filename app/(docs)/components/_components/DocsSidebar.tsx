"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { registryByCategory } from "../_lib/registry";

function NavLink({ href, label }: { href: string; label: string }) {
	const pathname = usePathname();
	const active = pathname === href;
	return (
		<Link
			href={href}
			aria-current={active ? "page" : undefined}
			className={cn(
				"block rounded-md px-3 py-1.5 text-sm transition-colors",
				active ? "bg-text-100 font-medium text-text-900" : "text-text-600 hover:bg-text-50 hover:text-text-900",
			)}
		>
			{label}
		</Link>
	);
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div>
			<p className="px-3 pb-2 text-xs font-medium text-text-400">{title}</p>
			{children}
		</div>
	);
}

export default function DocsSidebar() {
	return (
		<nav aria-label="Components" className="space-y-6">
			<Group title="Sections">
				<NavLink href="/components" label="Overview" />
			</Group>
			{registryByCategory.map(({ category, entries }) => (
				<Group key={category} title={category}>
					{entries.map((c) => (
						<NavLink key={c.slug} href={`/components/${c.slug}`} label={c.title} />
					))}
				</Group>
			))}
		</nav>
	);
}
