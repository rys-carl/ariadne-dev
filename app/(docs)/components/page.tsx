import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, ArrowUpRight, Code2, Palette, type LucideIcon } from "lucide-react";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { categorySlug, registry, registryByCategory, type RegistryEntry } from "./_lib/registry";

const HIGHLIGHTS: { icon: LucideIcon; title: string; body: string }[] = [
	{
		icon: Palette,
		title: "Matches the design system",
		body: "Colors, sizes and states come straight from the UI/UX team's Figma files, as shared design tokens.",
	},
	{
		icon: Accessibility,
		title: "Accessible by default",
		body: "Keyboard support, screen-reader labels and WCAG AA text contrast are built in, not left to each team.",
	},
	{
		icon: Code2,
		title: "Ready to copy",
		body: "Every page has live previews, the real source of each example, a props table and do/don't guidelines.",
	},
];

export const metadata: Metadata = {
	title: "Components · Bakawan UI",
	description: "The unified component library used across Bakawan enterprise apps.",
};

function ComponentCard({ entry }: { entry: RegistryEntry }) {
	return (
		<Link
			href={`/components/${entry.slug}`}
			className="group flex flex-col gap-2 rounded-xl border border-text-200 p-5 transition-colors hover:border-brand/40 hover:bg-brand-subtle"
		>
			<span className="flex items-center gap-2 font-medium text-text-900">
				{entry.title}
				<ArrowUpRight className="ml-auto size-4 text-text-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-fg" />
			</span>
			<span className="text-sm leading-relaxed text-text-500">{entry.description}</span>
		</Link>
	);
}

export default function ComponentsIndexPage() {
	return (
		<div className="max-w-7xl space-y-12">
			<header className="space-y-8">
				<div className="space-y-4">
					<Breadcrumb
						title="Components"
						titleClassName="text-4xl"
						className="[&_nav]:text-base"
						homeLabel="Home"
						items={[{ label: "Components" }]}
					/>
					<p className="max-w-2xl text-lg leading-relaxed text-text-600">
						One shared set of building blocks for every Bakawan enterprise app. Each component is built from the
						UI/UX team&apos;s Figma specs, so screens look and behave the same no matter which team ships them.
					</p>
				</div>

				<ul className="grid gap-4 sm:grid-cols-3">
					{HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
						<li key={title} className="rounded-xl border border-text-200 p-4">
							<span className="mb-3 flex size-9 items-center justify-center rounded-lg bg-brand-subtle text-brand-fg">
								<Icon className="size-4.5" aria-hidden />
							</span>
							<p className="text-sm font-semibold text-text-900">{title}</p>
							<p className="mt-1 text-sm leading-relaxed text-text-500">{body}</p>
						</li>
					))}
				</ul>

				<p className="text-sm leading-relaxed text-text-600">
				
					Browse by category below, or press{" "}
					<kbd className="rounded border border-text-200 bg-text-50 px-1.5 font-mono text-xs">/</kbd>{" "}to search.
					Import each one from its own file, e.g.{" "}
					<code className="whitespace-nowrap rounded bg-text-100 px-1.5 py-0.5 font-mono text-[13px] text-text-800">
						{'import { Button } from "@/shared/ui/Button"'}
					</code>
					.
				</p>
			</header>

			{registryByCategory.map(({ category, entries }) => (
				<section
					key={category}
					id={categorySlug(category)}
					aria-labelledby={`${categorySlug(category)}-heading`}
					className="scroll-mt-20 space-y-4"
				>
					<h2 id={`${categorySlug(category)}-heading`} className="text-xl font-semibold text-text-900">
						{category}
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{entries.map((entry) => (
							<ComponentCard key={entry.slug} entry={entry} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}
