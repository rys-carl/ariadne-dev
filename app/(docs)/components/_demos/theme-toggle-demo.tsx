"use client";

import { ThemeToggle } from "@/shared/ui/ThemeToggle";

// Both variants change the whole site's theme.
export default function ThemeToggleDemo() {
	return (
		<div className="flex items-center gap-4">
			<ThemeToggle />
			<ThemeToggle variant="label" />
		</div>
	);
}
