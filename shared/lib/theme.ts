// shared/lib/theme.ts — light / dark theme.
// The theme is a .dark class on <html>; globals.css redefines the color
// tokens under it. The choice is saved in localStorage ("theme"), and an
// inline script in app/layout.tsx applies it before the first paint, so the
// page never flashes the wrong theme.
"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export const THEME_KEY = "theme";

/** Runs before React loads (inlined into <head>). Keep it dependency-free. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

const listeners = new Set<() => void>();
const read = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

export function setTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {
		// Storage blocked: the theme still applies for this visit.
	}
	listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
	listeners.add(onChange);
	// Keep other tabs in sync.
	const onStorage = (e: StorageEvent) => {
		if (e.key === THEME_KEY) {
			document.documentElement.classList.toggle("dark", e.newValue === "dark");
			onChange();
		}
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(onChange);
		window.removeEventListener("storage", onStorage);
	};
}

/** Current theme and a setter. Renders "light" on the server. */
export function useTheme() {
	const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);
	return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}
