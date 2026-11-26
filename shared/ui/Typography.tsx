// shared/ui/Typography.tsx — Bakawan unified text styles.
// Source of truth: the "Typography" Figma (Headline / Paragraph / Body / Other).
// Documented at /components/typography.
//
// Where the Figma's written spec (size / line-height / weight / tracking)
// and its suggested class hint disagree, the written numbers win.
// Letter-spacing of -2.5% in the spec equals Tailwind's tracking-tight.
//
// No margins are built in: spacing between text blocks belongs to the
// layout (gap / space-y), so the same style works anywhere.
import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/shared/lib/cn";

type Spec = {
	/** Element rendered by default. Override with the `as` prop. */
	element: ElementType;
	className: string;
	/** Human-readable spec, shown on the docs page. */
	spec: string;
};

export const typographySpec = {
	h1: {
		element: "h1",
		className: "text-4xl font-black leading-none tracking-tight text-text-900 lg:text-5xl",
		spec: "Black · 48px / 100% · -1.25px (36px below lg)",
	},
	h2: {
		element: "h2",
		className: "text-3xl font-semibold leading-9 tracking-tight text-text-900",
		spec: "Semibold · 30px / 36px · -0.75px",
	},
	h3: {
		element: "h3",
		className: "text-2xl font-semibold leading-8 tracking-tight text-text-900",
		spec: "Semibold · 24px / 32px · -0.6px",
	},
	h4: {
		element: "h4",
		className: "text-xl font-semibold leading-7 tracking-tight text-text-900",
		spec: "Semibold · 20px / 28px · -0.5px",
	},
	h5: {
		element: "h5",
		className: "text-lg font-semibold leading-7 text-text-900",
		spec: "Semibold · 18px / 28px · 0",
	},
	h6: {
		element: "h6",
		className: "text-base font-medium leading-6 text-text-900",
		spec: "Medium · 16px / 24px · 0",
	},
	section: {
		element: "h2",
		className: "text-4xl font-bold leading-10 tracking-tight text-text-900",
		spec: "Bold · 36px / 40px · -2.5%",
	},
	lead: {
		element: "p",
		className: "text-xl font-normal leading-7 text-text-500",
		spec: "Regular · 20px / 28px · 0",
	},
	large: {
		element: "div",
		className: "text-lg font-semibold leading-7 text-text-900",
		spec: "Semibold · 18px / 28px · 0",
	},
	p: {
		element: "p",
		className: "text-base font-normal leading-6 text-text-800",
		spec: "Regular · 16px / 24px · 0",
	},
	body: {
		element: "p",
		className: "text-sm font-normal leading-6 text-text-800",
		spec: "Regular · 14px / 24px · 0",
	},
	"body-medium": {
		element: "p",
		className: "text-sm font-medium leading-6 text-text-800",
		spec: "Medium · 14px / 24px · 0",
	},
	small: {
		element: "small",
		className: "text-sm font-normal leading-none text-text-800",
		spec: "Regular · 14px / 14px · 0",
	},
	muted: {
		element: "p",
		className: "text-sm font-normal leading-5 text-text-500",
		spec: "Regular · 14px / 20px · 0",
	},
	blockquote: {
		element: "blockquote",
		className: "border-l-2 border-text-300 pl-6 text-base font-normal leading-6 text-text-800",
		spec: "Regular · 16px / 24px · 0",
	},
	list: {
		element: "ul",
		className: "ml-6 list-disc space-y-2 text-base font-normal leading-6 text-text-800",
		spec: "Regular · 16px / 24px · 0 · 8px between items",
	},
	code: {
		element: "code",
		className:
			"rounded bg-text-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold leading-5 text-text-900",
		spec: "Mono Semibold · 14px / 20px · 0",
	},
} satisfies Record<string, Spec>;

export type TypographyVariant = keyof typeof typographySpec;

/** Class names for a text style, for elements you render yourself. */
export function typographyStyles(variant: TypographyVariant, className?: string) {
	return cn(typographySpec[variant].className, className);
}

export type TypographyProps = HTMLAttributes<HTMLElement> & {
	variant?: TypographyVariant;
	/**
	 * Element to render instead of the variant's default — e.g. an h2 that
	 * should look like h4 to keep the heading hierarchy correct.
	 */
	as?: ElementType;
	ref?: Ref<HTMLElement>;
	children?: ReactNode;
};

export function Typography({ variant = "p", as, className, ...props }: TypographyProps) {
	const Component = as ?? typographySpec[variant].element;
	return <Component className={typographyStyles(variant, className)} {...props} />;
}
