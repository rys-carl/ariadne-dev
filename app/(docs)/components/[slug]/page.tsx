import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, FileCode2 } from "lucide-react";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { buttonStyles } from "@/shared/ui/Button";
import { docs } from "../_docs";
import { categorySlug, getEntry, getNeighbours, registry } from "../_lib/registry";

// Only slugs in the registry exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
	return registry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const entry = getEntry(slug);
	return entry ? { title: `${entry.title} · Bakawan UI`, description: entry.description } : {};
}

export default async function ComponentDocPage({ params }: PageProps<"/components/[slug]">) {
	const { slug } = await params;
	const entry = getEntry(slug);
	const doc = docs[slug];
	if (!entry || !doc) notFound();

	const { Doc, toc } = doc;
	const { prev, next } = getNeighbours(slug);

	return (
		<div className="flex gap-8">
			<article className="min-w-0 max-w-7xl flex-1 space-y-12">
				<header className="space-y-3">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<Breadcrumb
							title={entry.title}
							titleClassName="text-4xl"
							className="[&_nav]:text-base"
							homeLabel="Home"
							items={[
								{ label: "Components", href: "/components" },
								{ label: entry.category, href: `/components#${categorySlug(entry.category)}` },
								{ label: entry.title },
							]}
						/>
						<div className="flex gap-2">
							{prev && (
								<Link
									href={`/components/${prev.slug}`}
									aria-label={`Previous: ${prev.title}`}
									className={buttonStyles({ variant: "neutral", size: "sm", iconOnly: true })}
								>
									<ChevronLeft />
								</Link>
							)}
							{next && (
								<Link
									href={`/components/${next.slug}`}
									aria-label={`Next: ${next.title}`}
									className={buttonStyles({ variant: "neutral", size: "sm", iconOnly: true })}
								>
									<ChevronRight />
								</Link>
							)}
						</div>
					</div>
					<p className="text-lg leading-relaxed text-text-500">{entry.description}</p>
					<p className="flex items-center gap-1.5 font-mono text-xs text-text-400">
						<FileCode2 className="size-3.5" /> {entry.source}
					</p>
				</header>

				<Doc />

				<nav className="flex justify-between gap-4 border-t border-text-100 pt-8">
					{prev ? (
						<Link href={`/components/${prev.slug}`} className={buttonStyles({ variant: "neutral", size: "sm" })}>
							<ChevronLeft /> {prev.title}
						</Link>
					) : (
						<span />
					)}
					{next && (
						<Link href={`/components/${next.slug}`} className={buttonStyles({ variant: "neutral", size: "sm" })}>
							{next.title} <ChevronRight />
						</Link>
					)}
				</nav>
			</article>

			<aside className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
				<p className="mb-3 text-xs font-medium text-text-400">On This Page</p>
				<ul className="space-y-2 text-sm">
					{toc.map((item) => (
						<li key={item.id}>
							<a href={`#${item.id}`} className="text-text-500 transition-colors hover:text-text-900">
								{item.title}
							</a>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);
}
