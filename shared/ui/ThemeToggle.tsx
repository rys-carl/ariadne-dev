// shared/ui/ThemeToggle.tsx — switches between the light and dark theme.
// Documented at /components/theme-toggle.
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/lib/theme";
import { Button, IconButton } from "./Button";

export type ThemeToggleProps = {
	/** "icon" for headers; "label" shows the current theme's name, as on the profile page. */
	variant?: "icon" | "label";
	className?: string;
};

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
	const { theme, toggle } = useTheme();
	const dark = theme === "dark";
	const label = dark ? "Switch to light theme" : "Switch to dark theme";

	if (variant === "label") {
		return (
			<Button
				variant="ghost"
				size="sm"
				leftIcon={dark ? <Moon /> : <Sun />}
				onClick={toggle}
				aria-label={label}
				title={label}
				className={className ?? "text-text-700"}
			>
				{dark ? "Dark theme" : "Light theme"}
			</Button>
		);
	}

	return (
		<IconButton
			variant="ghost"
			icon={dark ? <Sun /> : <Moon />}
			onClick={toggle}
			aria-label={label}
			title={label}
			className={className ?? "text-text-700"}
		/>
	);
}
