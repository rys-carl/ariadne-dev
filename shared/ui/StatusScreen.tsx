// shared/ui/StatusScreen.tsx — message screens: 404, 401, coming soon.
// NotFound, Unauthorized and ComingSoon are presets of this.
//
// Inside the app shell (default) it fills the content area as a card; the
// header already renders the page's h1, so the title is an h2.
// fullPage: centers on the whole viewport with the logo on top (for pages
// outside the shell, e.g. app/not-found.tsx); the title is the h1.
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Gamepad2, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { AlertIcon } from "./AlertIcon";
import type { StatusTone } from "./tones";

export type StatusLink = { href: string; label: string; icon: LucideIcon; note?: string };

export type StatusScreenProps = {
	icon: LucideIcon;
	tone?: StatusTone;
	/** Large faded code behind the content, e.g. "404". */
	code?: string;
	/** Small pill above the title, e.g. "In development". */
	badge?: ReactNode;
	title: ReactNode;
	message: ReactNode;
	/** Buttons / links. */
	actions?: ReactNode;
	/** "Where to next" shortcuts under the actions. */
	links?: StatusLink[];
	fullPage?: boolean;
	className?: string;
};

export function StatusScreen({
	icon,
	tone = "info",
	code,
	badge,
	title,
	message,
	actions,
	links,
	fullPage = false,
	className,
}: StatusScreenProps) {
	const Title = fullPage ? "h1" : "h2";

	const body = (
		<div className="relative isolate flex w-full flex-1 items-center justify-center overflow-hidden px-4 py-16">
			{/* Decoration: faded grid, brand glow and the big code, all behind the content. */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,var(--color-text-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-text-100)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
			/>
			<div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
			{code && (
				<span
					aria-hidden
					className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-[60%] select-none text-[9rem] font-black leading-none tracking-tighter text-text-100 sm:text-[14rem]"
				>
					{code}
				</span>
			)}

			<div className="flex max-w-lg flex-col items-center text-center">
				<AlertIcon tone={tone} icon={icon} />
				{badge && <div className="mt-5">{badge}</div>}
				{code && <p className="sr-only">Error {code}</p>}
				<Title className={cn("text-3xl font-bold tracking-tight text-text-900 sm:text-4xl", badge ? "mt-3" : "mt-6")}>{title}</Title>
				<p className="mt-3 text-base leading-relaxed text-text-600">{message}</p>
				{actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}

				{links && links.length > 0 && (
					<nav aria-label="Suggested pages" className="mt-10 w-full">
						<p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-400">Or go to</p>
						<ul className={cn("grid gap-2 text-left", links.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
							{links.map(({ href, label, icon: Icon, note }) => (
								<li key={href}>
									<Link
										href={href}
										className="group flex h-full items-start gap-3 rounded-lg border border-text-200 bg-surface/80 p-3 backdrop-blur-sm transition-colors hover:border-brand/40 hover:bg-brand-subtle focus-visible:outline-2 focus-visible:outline-brand"
									>
										<Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-fg" />
										<span className="min-w-0 flex-1">
											<span className="flex items-center gap-1 text-sm font-medium text-text-900">
												{label}
												<ArrowRight aria-hidden className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
											</span>
											{note && <span className="mt-0.5 block text-xs text-text-500">{note}</span>}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
		</div>
	);

	if (!fullPage) {
		// Fills the content area below the 64px header (main has 24px padding).
		return (
			<div className={cn("flex min-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-xl border border-text-200 bg-surface", className)}>
				{body}
			</div>
		);
	}

	return (
		<div className={cn("flex min-h-dvh flex-col bg-canvas", className)}>
			<div className="px-4 py-5 sm:px-6 lg:px-10">
				<Link href="/" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-brand">
					<span className="flex size-8 items-center justify-center rounded-lg bg-brand-subtle text-brand-fg ring-1 ring-inset ring-brand/20">
						<Gamepad2 className="size-4.5" aria-hidden />
					</span>
					<span className="text-sm font-semibold tracking-tight text-text-900">Ariadne</span>
				</Link>
			</div>
			<main className="flex flex-1 flex-col pb-16">{body}</main>
		</div>
	);
}
