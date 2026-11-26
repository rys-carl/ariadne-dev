// shared/ui/Button.tsx — Bakawan unified Button + IconButton.
// Source of truth: "Bakawan Button v1" Figma (variants × tone × size × state).
// Documented at /components/button and /components/icon-button.
//
// No "use client": these have no state, so they render in Server Components
// too. Pass onClick from a Client Component as usual.
import type { ComponentProps, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "neutral" | "ghost" | "link";
export type ButtonTone = "default" | "destructive";
export type ButtonSize = "md" | "sm" | "xs";

/** Neutral has no destructive tone in the design spec, so the type forbids it. */
export type ButtonAppearance =
	| { variant?: Exclude<ButtonVariant, "neutral">; tone?: ButtonTone }
	| { variant: "neutral"; tone?: "default" };

/** Icon buttons have no link variant in the design spec. */
export type IconButtonAppearance =
	| { variant?: "primary" | "secondary" | "ghost"; tone?: ButtonTone }
	| { variant: "neutral"; tone?: "default" };

const base = [
	// Border width only: each variant sets exactly one border color. (Without
	// tailwind-merge, a base border-transparent would compete with the variant's
	// color and could win, depending on CSS order.)
	"inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md border",
	"font-medium leading-none transition-colors select-none cursor-pointer",
	"outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
	// Disabled = default color at 50% opacity, per the spec. Hover styles
	// below are gated with not-disabled: so a disabled button never reacts.
	"disabled:cursor-not-allowed disabled:opacity-50",
	"aria-disabled:pointer-events-none aria-disabled:opacity-50",
	"[&_svg]:shrink-0 [&_svg]:pointer-events-none",
].join(" ");

const defaultTone: Record<ButtonVariant, string> = {
	primary:
		"border-transparent bg-brand text-white not-disabled:hover:bg-brand-hover focus-visible:outline-brand",
	secondary:
		"border-brand bg-surface text-brand-fg not-disabled:hover:bg-brand-subtle focus-visible:outline-brand",
	neutral:
		"border-text-300 bg-surface text-text-700 not-disabled:hover:border-text-400 not-disabled:hover:bg-text-100 focus-visible:outline-text-700",
	ghost:
		"border-transparent text-brand-fg not-disabled:hover:bg-brand-subtle focus-visible:outline-brand",
	link: "border-transparent text-brand-fg underline-offset-4 not-disabled:hover:underline focus-visible:outline-brand",
};

const destructiveTone: Record<Exclude<ButtonVariant, "neutral">, string> = {
	primary:
		"border-transparent bg-danger text-white not-disabled:hover:bg-danger-hover focus-visible:outline-danger",
	secondary:
		"border-danger bg-surface text-danger not-disabled:hover:bg-danger-subtle focus-visible:outline-danger",
	ghost:
		"border-transparent text-danger not-disabled:hover:bg-danger-subtle focus-visible:outline-danger",
	link: "border-transparent text-danger underline-offset-4 not-disabled:hover:underline focus-visible:outline-danger",
};

const sizes: Record<ButtonSize, string> = {
	md: "h-9 gap-1.5 px-3.5 text-sm [&_svg]:size-4",
	sm: "h-8 gap-1.5 px-3 text-[13px] [&_svg]:size-3.5",
	xs: "h-6 gap-1 px-2 text-xs [&_svg]:size-3",
};

const iconSizes: Record<ButtonSize, string> = {
	md: "size-9 [&_svg]:size-4",
	sm: "size-8 [&_svg]:size-4",
	xs: "size-6 [&_svg]:size-3.5",
};

type StyleOptions = {
	variant?: ButtonVariant;
	tone?: ButtonTone;
	size?: ButtonSize;
	iconOnly?: boolean;
	className?: string;
};

/**
 * Class names for the button look, for elements that aren't a <button> —
 * e.g. a Next.js <Link> that should look like a button.
 */
export function buttonStyles({
	variant = "primary",
	tone = "default",
	size = "md",
	iconOnly = false,
	className,
}: StyleOptions = {}) {
	const toneClass =
		tone === "destructive" && variant !== "neutral"
			? destructiveTone[variant]
			: defaultTone[variant];
	return cn(base, toneClass, iconOnly ? iconSizes[size] : sizes[size], className);
}

export type ButtonProps = Omit<ComponentProps<"button">, "children"> &
	ButtonAppearance & {
		size?: ButtonSize;
		/** Icon rendered before the label. */
		leftIcon?: ReactNode;
		/** Icon rendered after the label. */
		rightIcon?: ReactNode;
		/** Shows a spinner and disables the button while an action runs. */
		loading?: boolean;
		children: ReactNode;
	};

export function Button({
	variant,
	tone,
	size,
	leftIcon,
	rightIcon,
	loading = false,
	className,
	children,
	type = "button",
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={buttonStyles({ variant, tone, size, className })}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			{...props}
		>
			{loading ? <LoaderCircle className="animate-spin" aria-hidden /> : leftIcon}
			{children}
			{rightIcon}
		</button>
	);
}

export type IconButtonProps = Omit<ComponentProps<"button">, "children" | "aria-label"> &
	IconButtonAppearance & {
		size?: ButtonSize;
		icon: ReactNode;
		/** Required: an icon-only button has no visible label for screen readers. */
		"aria-label": string;
	};

export function IconButton({
	variant,
	tone,
	size,
	icon,
	className,
	type = "button",
	...props
}: IconButtonProps) {
	return (
		<button
			type={type}
			className={buttonStyles({ variant, tone, size, iconOnly: true, className })}
			{...props}
		>
			{icon}
		</button>
	);
}
