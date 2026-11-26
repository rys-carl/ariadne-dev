"use client";

import { useState } from "react";
import { SearchInput } from "@/shared/ui/SearchInput";

const DOCUMENTS = ["DOC-2026-0012", "DOC-2026-0047", "DOC-2026-0101", "LOAN-2026-0003", "LOAN-2026-0019"];

export default function SearchInputDemo() {
	const [query, setQuery] = useState("");
	const results = DOCUMENTS.filter((d) => d.toLowerCase().includes(query.toLowerCase()));

	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<SearchInput
				value={query}
				onValueChange={setQuery}
				placeholder="Search document id"
				aria-label="Search document id"
			/>
			<ul className="divide-y divide-text-100 rounded-lg border border-text-200 text-sm">
				{results.length ? (
					results.map((d) => (
						<li key={d} className="px-3 py-2 font-mono text-text-800">
							{d}
						</li>
					))
				) : (
					<li className="px-3 py-2 text-text-500">No documents match &ldquo;{query}&rdquo;.</li>
				)}
			</ul>
		</div>
	);
}
