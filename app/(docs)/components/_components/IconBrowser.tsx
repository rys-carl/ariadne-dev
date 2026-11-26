"use client";

// Searchable grid of every lucide-react icon. Importing the full `icons` map
// is fine here: this client chunk only loads on /components/icons.
import { useDeferredValue, useMemo, useState } from "react";
import { icons, Search, X } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
import CopyButton from "./CopyButton";

const ALL_NAMES = Object.keys(icons) as (keyof typeof icons)[];
const PAGE = 240;

// "ArrowLeftRight" -> "arrow left right", so "arrow-left" and "arrow left" both match.
const searchText = (name: string) =>
	name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Za-z])(\d)/g, "$1 $2").toLowerCase();
const INDEX = ALL_NAMES.map((name) => ({ name, text: searchText(name) }));

export default function IconBrowser() {
	const [query, setQuery] = useState("");
	const [limit, setLimit] = useState(PAGE);
	const [selected, setSelected] = useState<keyof typeof icons | null>(null);
	const deferredQuery = useDeferredValue(query);

	const matches = useMemo(() => {
		const terms = deferredQuery.toLowerCase().replace(/[-_]/g, " ").split(/\s+/).filter(Boolean);
		if (terms.length === 0) return ALL_NAMES;
		return INDEX.filter(({ text }) => terms.every((t) => text.includes(t))).map(({ name }) => name);
	}, [deferredQuery]);

	const Selected = selected ? icons[selected] : null;

	return (
		<div className="space-y-4">
			<div className="relative">
				<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-400" />
				<input
					type="search"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setLimit(PAGE);
					}}
					placeholder={`Search ${ALL_NAMES.length.toLocaleString()} icons…`}
					aria-label="Search icons"
					className="h-10 w-full rounded-lg border border-text-300 bg-surface pl-9 pr-3 text-sm text-text-900 outline-none placeholder:text-text-400 focus:border-brand focus:ring-2 focus:ring-brand/15"
				/>
			</div>

			{Selected && selected && (
				<div className="flex flex-wrap items-center gap-6 rounded-xl border border-brand/30 bg-brand-subtle p-4">
					<div className="flex items-end gap-4 text-text-900">
						{[16, 20, 24, 32].map((size) => (
							<Selected key={size} size={size} />
						))}
					</div>
					<div className="min-w-0 flex-1 space-y-2">
						<p className="font-mono text-sm font-semibold text-text-900">{selected}</p>
						<div className="flex flex-wrap gap-2">
							<CopySnippet label="Import" value={`import { ${selected} } from "lucide-react";`} />
							<CopySnippet label="Icon" value={`<Icon icon={${selected}} />`} />
						</div>
					</div>
					<button
						type="button"
						onClick={() => setSelected(null)}
						aria-label="Close"
						className="cursor-pointer self-start rounded-md p-1 text-text-500 hover:bg-surface hover:text-text-900"
					>
						<X className="size-4" />
					</button>
				</div>
			)}

			<p className="text-xs text-text-500" aria-live="polite">
				{matches.length.toLocaleString()} {matches.length === 1 ? "icon" : "icons"}
				{deferredQuery && <> matching &ldquo;{deferredQuery}&rdquo;</>}
			</p>

			{matches.length === 0 ? (
				<p className="rounded-xl border border-dashed border-text-200 p-10 text-center text-sm text-text-500">
					No icons found. Try a broader word, like &ldquo;arrow&rdquo; or &ldquo;file&rdquo;.
				</p>
			) : (
				<ul className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
					{matches.slice(0, limit).map((name) => {
						const IconComponent = icons[name];
						return (
							<li key={name}>
								<button
									type="button"
									onClick={() => setSelected(name)}
									title={name}
									aria-pressed={selected === name}
									className={cn(
										"flex h-20 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border px-1 text-text-700 transition-colors",
										selected === name
											? "border-brand bg-brand-subtle text-brand-fg"
											: "border-text-100 hover:border-text-300 hover:bg-text-50",
									)}
								>
									<IconComponent className="size-5" />
									<span className="w-full truncate text-center text-[10px] text-text-500">{name}</span>
								</button>
							</li>
						);
					})}
				</ul>
			)}

			{matches.length > limit && (
				<div className="flex justify-center">
					<Button variant="neutral" size="sm" onClick={() => setLimit((l) => l + PAGE)}>
						Show more ({(matches.length - limit).toLocaleString()} left)
					</Button>
				</div>
			)}
		</div>
	);
}

function CopySnippet({ label, value }: { label: string; value: string }) {
	return (
		<span className="inline-flex max-w-full items-center gap-1 rounded-md border border-text-200 bg-surface py-0.5 pl-2 pr-0.5">
			<span className="text-[11px] font-medium text-text-400">{label}</span>
			<code className="truncate font-mono text-xs text-text-800">{value}</code>
			<CopyButton value={value} />
		</span>
	);
}
