import { twMerge } from "tailwind-merge";

// Joins class names, skipping falsy values, and resolves Tailwind conflicts:
// when two classes set the same property (px-3.5 vs px-0, inline-flex vs
// hidden), the later one wins. That makes a `className` passed to a shared
// component a reliable override, regardless of CSS generation order.
export function cn(...classes: Array<string | false | null | undefined>) {
	return twMerge(...classes);
}
