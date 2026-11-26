"use client";

// All doc pages share the /components/[slug] route, so a static import of
// IconBrowser (which pulls in all ~1,750 Lucide icons) would ship that code
// to every doc page. Loading it dynamically keeps it out of the shared
// bundle; it is only fetched when the Icons page renders it.
import dynamic from "next/dynamic";

const IconBrowserLazy = dynamic(() => import("./IconBrowser"), {
	ssr: false,
	loading: () => (
		<div className="space-y-4" aria-busy="true" aria-label="Loading icons">
			<div className="h-10 animate-pulse rounded-lg bg-text-100" />
			<div className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-2">
				{Array.from({ length: 24 }, (_, i) => (
					<div key={i} className="h-20 animate-pulse rounded-lg bg-text-50" />
				))}
			</div>
		</div>
	),
});

export default IconBrowserLazy;
