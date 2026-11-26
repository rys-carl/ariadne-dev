"use client";

// Header search for the component docs. Rendered only by the /components
// layout (through SiteHeader's `search` slot), so it never appears elsewhere.
//
// WAI-ARIA combobox: type to filter, ↑/↓ to move, Enter to open, Escape to
// clear. "/" or ⌘K / Ctrl+K focuses it from anywhere on the page.
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { registry, type RegistryEntry } from "../_lib/registry";

const MAX_RESULTS = 8;

/** Lower is better; null = no match. Title beats category/keywords beats description. */
function scoreTerm(term: string, e: RegistryEntry): number | null {
	const title = e.title.toLowerCase();
	if (title === term) return 0;
	if (title.startsWith(term)) return 1;
	if (title.split(/\s+/).some((w) => w.startsWith(term))) return 2;
	if (title.includes(term) || e.slug.includes(term)) return 3;
	if (e.category.toLowerCase().includes(term)) return 4;
	if (e.keywords?.some((k) => k.toLowerCase().includes(term))) return 4;
	if (e.description.toLowerCase().includes(term)) return 5;
	return null;
}

function search(query: string) {
	const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
	if (terms.length === 0) return [];
	return registry
		.map((entry) => {
			let total = 0;
			for (const t of terms) {
				const s = scoreTerm(t, entry);
				if (s === null) return null;
				total += s;
			}
			return { entry, total };
		})
		.filter((r): r is { entry: RegistryEntry; total: number } => r !== null)
		.sort((a, b) => a.total - b.total || a.entry.title.localeCompare(b.entry.title))
		.slice(0, MAX_RESULTS)
		.map((r) => r.entry);
}

export default function ComponentSearch() {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const listId = useId();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);

	const results = useMemo(() => search(query), [query]);
	const showList = open && query.trim().length > 0;
	const activeIndex = Math.min(active, Math.max(0, results.length - 1));

	// "/" or ⌘K / Ctrl+K focuses the search, unless the user is typing elsewhere.
	useEffect(() => {
		const onKeyDown = (e: globalThis.KeyboardEvent) => {
			const target = e.target as HTMLElement;
			const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
				e.preventDefault();
				inputRef.current?.focus();
				inputRef.current?.select();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	function go(entry: RegistryEntry) {
		router.push(`/components/${entry.slug}`);
		setQuery("");
		setOpen(false);
		inputRef.current?.blur();
	}

	function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			if (!results.length) return;
			e.preventDefault();
			setOpen(true);
			const step = e.key === "ArrowDown" ? 1 : -1;
			setActive((activeIndex + step + results.length) % results.length);
		} else if (e.key === "Enter") {
			const entry = results[activeIndex];
			if (showList && entry) {
				e.preventDefault();
				go(entry);
			}
		} else if (e.key === "Escape") {
			e.preventDefault();
			if (query) setQuery("");
			else inputRef.current?.blur();
		}
	}

	const optionId = (i: number) => `${listId}-option-${i}`;

	return (
		<div className="relative w-full">
			<Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-400" />
			<input
				ref={inputRef}
				type="text"
				role="combobox"
				aria-label="Search components"
				aria-autocomplete="list"
				aria-expanded={showList}
				aria-controls={listId}
				aria-activedescendant={showList && results.length ? optionId(activeIndex) : undefined}
				autoComplete="off"
				spellCheck={false}
				placeholder="Search components..."
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setActive(0);
					setOpen(true);
				}}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onKeyDown={onKeyDown}
				className="h-9 w-full rounded-lg border border-text-200 bg-text-50 pl-9 pr-9 text-sm text-text-900 outline-none transition-colors placeholder:text-text-400 hover:bg-surface focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/15"
			/>
			{!query && (
				<kbd
					aria-hidden
					className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-text-200 bg-surface px-1.5 font-mono text-[11px] leading-5 text-text-400"
				>
					/
				</kbd>
			)}

			<div
				className={cn(
					"absolute right-0 top-full z-50 mt-2 w-full min-w-72 overflow-hidden rounded-xl border border-text-200 bg-surface shadow-lg",
					!showList && "hidden",
				)}
			>
				<ul id={listId} role="listbox" aria-label="Components" className="max-h-96 overflow-y-auto p-1">
					{results.map((entry, i) => (
						<li
							key={entry.slug}
							id={optionId(i)}
							role="option"
							aria-selected={i === activeIndex}
							// Keep focus in the input so the click isn't lost to blur.
							onMouseDown={(e) => e.preventDefault()}
							onMouseMove={() => setActive(i)}
							onClick={() => go(entry)}
							className={cn(
								"flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm",
								i === activeIndex ? "bg-brand-subtle text-brand-fg" : "text-text-800",
							)}
						>
							<span className="font-medium">{entry.title}</span>
							<span className="shrink-0 text-xs text-text-400">{entry.category}</span>
						</li>
					))}
				</ul>
				{results.length === 0 && (
					<p className="px-3 py-6 text-center text-sm text-text-500">
						No components match &ldquo;{query.trim()}&rdquo;.
					</p>
				)}
			</div>
			<p className="sr-only" aria-live="polite">
				{showList ? `${results.length} ${results.length === 1 ? "result" : "results"}` : ""}
			</p>
		</div>
	);
}
