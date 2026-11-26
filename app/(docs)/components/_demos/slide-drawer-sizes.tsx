"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { SlideDrawer } from "@/shared/ui/SlideDrawer";

const sizes = [
	{ size: "sm", width: "448px" },
	{ size: "md", width: "576px" },
	{ size: "lg", width: "768px" },
	{ size: "xl", width: "1024px" },
	{ size: "full", width: "the whole screen" },
] as const;

type Size = (typeof sizes)[number]["size"];

export default function SlideDrawerSizes() {
	const [size, setSize] = useState<Size | null>(null);
	const close = () => setSize(null);
	const current = sizes.find((s) => s.size === size);

	return (
		<>
			<div className="flex flex-wrap gap-3">
				{sizes.map((s) => (
					<Button key={s.size} variant="secondary" onClick={() => setSize(s.size)}>
						{s.size}
					</Button>
				))}
			</div>
			<SlideDrawer
				open={size !== null}
				onClose={close}
				size={size ?? "lg"}
				title={`Size: ${size ?? ""}`}
				description={`Up to ${current?.width ?? ""} wide on screens 640px and up. Full width below that.`}
				footer={
					<Button variant="neutral" onClick={close}>
						Close
					</Button>
				}
			>
				<p className="text-sm text-text-600">
					Pick the smallest size that fits the content without wrapping awkwardly. Detail views usually fit in{" "}
					<span className="font-medium text-text-900">lg</span>.
				</p>
			</SlideDrawer>
		</>
	);
}
