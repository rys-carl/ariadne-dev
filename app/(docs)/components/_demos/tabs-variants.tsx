"use client";

import { Plus } from "lucide-react";
import { Tabs, type TabItem } from "@/shared/ui/Tabs";

const items: TabItem[] = [
	{ value: "one", label: "Tab 1" },
	{ value: "two", label: "Tab 2" },
];

export default function TabsVariants() {
	return (
		<div className="flex flex-col items-start gap-6">
			<Tabs variant="default" items={items} aria-label="Default tabs" />
			<Tabs variant="track" items={items} aria-label="Track tabs" />
			<Tabs
				variant="track"
				aria-label="Tabs with icons"
				items={items.map((item) => ({ ...item, icon: <Plus /> }))}
			/>
			<Tabs variant="dark" items={items} aria-label="Dark tabs" />
		</div>
	);
}
