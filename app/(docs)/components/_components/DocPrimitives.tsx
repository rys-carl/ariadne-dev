// Small building blocks for writing doc pages in ../_docs.
import type { ReactNode } from "react";
import { Check, X } from "lucide-react";

export type TocItem = { id: string; title: string };

export function DocSection({
	id,
	title,
	description,
	children,
}: {
	id: string;
	title: string;
	description?: ReactNode;
	children?: ReactNode;
}) {
	return (
		<section id={id} className="scroll-mt-20 space-y-4">
			<div className="space-y-1.5">
				<h2 className="text-xl font-semibold tracking-tight text-text-900">
					<a href={`#${id}`} className="hover:underline underline-offset-4">
						{title}
					</a>
				</h2>
				{description && <p className="text-[15px] leading-relaxed text-text-600">{description}</p>}
			</div>
			{children}
		</section>
	);
}

export type PropRow = { name: string; type: string; default?: string; description: string };

export function PropsTable({ rows }: { rows: PropRow[] }) {
	return (
		<div className="overflow-x-auto rounded-xl border border-text-200">
			<table className="w-full min-w-[640px] text-left text-sm">
				<thead className="bg-text-50 text-xs uppercase tracking-wide text-text-500">
					<tr>
						<th className="px-4 py-3 font-medium">Prop</th>
						<th className="px-4 py-3 font-medium">Type</th>
						<th className="px-4 py-3 font-medium">Default</th>
						<th className="px-4 py-3 font-medium">Description</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-text-200">
					{rows.map((row) => (
						<tr key={row.name} className="align-top">
							<td className="px-4 py-3 font-mono text-[13px] font-medium text-brand-fg">{row.name}</td>
							<td className="px-4 py-3 font-mono text-[13px] text-text-700">{row.type}</td>
							<td className="px-4 py-3 font-mono text-[13px] text-text-500">{row.default ?? "—"}</td>
							<td className="px-4 py-3 text-text-600">{row.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function Guidelines({ dos, donts }: { dos: string[]; donts: string[] }) {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div className="rounded-xl border border-text-200 p-5">
				<p className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-fg">
					<Check className="size-4" /> Do
				</p>
				<ul className="space-y-2 text-sm text-text-600">
					{dos.map((item) => (
						<li key={item} className="leading-relaxed">{item}</li>
					))}
				</ul>
			</div>
			<div className="rounded-xl border border-text-200 p-5">
				<p className="mb-3 flex items-center gap-2 text-sm font-semibold text-danger">
					<X className="size-4" /> Don&apos;t
				</p>
				<ul className="space-y-2 text-sm text-text-600">
					{donts.map((item) => (
						<li key={item} className="leading-relaxed">{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
