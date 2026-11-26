// shared/ui/ProfileSettings.tsx — building blocks for a profile / settings page.
// Spec: "Profile Settings full info" Figma. Used by app/(private)/profile.
// Documented at /components/profile-settings.
//
//   <ProfileHero name="John Dela Cruz" idLabel="Staff ID" id="202508-78900" onBack={…} />
//   <SettingsLayout sections={[{ id: "personal", label: "Personal Information", icon: CircleUserRound }, …]}>
//     <SettingsSection id="personal" title="Personal Information">
//       <ReviewField label="Full name" value="…" />
//     </SettingsSection>
//   </SettingsLayout>
"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { ArrowLeft, Check, Trash2, Upload, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "./Avatar";
import { AVATAR_PRESETS, type AvatarPreset } from "./avatarPresets";
import { Button } from "./Button";
import { ReviewFields } from "./DetailsCard";

// ── Hero ─────────────────────────────────────────────────────────────────────

export type ProfileHeroProps = {
	name: string;
	avatarSrc?: string;
	/** e.g. "Staff ID". */
	idLabel?: string;
	id?: string;
	/** Shows a "Back" button on the banner. */
	onBack?: () => void;
	/** Right side of the name row, e.g. a theme button. */
	action?: ReactNode;
	className?: string;
};

export function ProfileHero({ name, avatarSrc, idLabel = "Staff ID", id, onBack, action, className }: ProfileHeroProps) {
	return (
		<section aria-label="Profile summary" className={cn("overflow-hidden rounded-xl border border-text-200 bg-surface", className)}>
			<div className="relative h-24 overflow-hidden bg-linear-to-r from-[#054b03] via-[#065104] via-55% to-[#3f8f2a] sm:h-28">
				{onBack && (
					<button
						type="button"
						onClick={onBack}
						className="absolute left-4 top-4 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
					>
						<ArrowLeft className="size-4" aria-hidden />
						Back
					</button>
				)}
				{/* Brand watermark, decorative. */}
				<Image
					src="/Bakawan_Logo.png"
					alt=""
					aria-hidden
					width={160}
					height={160}
					className="pointer-events-none absolute -right-4 -top-6 size-40 opacity-25 brightness-0 invert"
				/>
			</div>
			<div className="flex flex-wrap items-end justify-between gap-3 px-5 pb-4 sm:px-6">
				<div className="flex min-w-0 items-end gap-4">
					{/* relative z-10: sits above the banner, which is positioned and would paint over it. */}
					<Avatar name={name} src={avatarSrc} size="xl" className="relative z-10 -mt-8 size-20 shrink-0 text-2xl ring-4 ring-surface" />
					<div className="min-w-0 pb-1">
						<h2 className="truncate text-2xl font-medium tracking-tight text-text-900">{name}</h2>
						{id && (
							<p className="text-sm text-text-500">
								{idLabel}: <span className="font-semibold text-brand-fg">{id}</span>
							</p>
						)}
					</div>
				</div>
				{action}
			</div>
		</section>
	);
}

// ── Layout with section nav ──────────────────────────────────────────────────

export type SettingsNavItem = { id: string; label: string; icon: LucideIcon };

export type SettingsLayoutProps = {
	sections: SettingsNavItem[];
	children: ReactNode;
	className?: string;
};

/**
 * Section nav + content. The nav highlights the section in view as the page
 * scrolls; clicking an item scrolls to it. On narrow screens the nav becomes a
 * scrollable row above the content.
 */
export function SettingsLayout({ sections, children, className }: SettingsLayoutProps) {
	const [active, setActive] = useState(sections[0]?.id);
	// Set when the user clicks a nav item; cleared when they scroll themselves.
	// Keeps the clicked item selected even if the page is too short to bring
	// its section to the top.
	const pinnedRef = useRef(false);

	useEffect(() => {
		const THRESHOLD = 120; // just below the sticky app header
		let frame = 0;
		const update = () => {
			frame = 0;
			if (pinnedRef.current) return;
			const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
			let current = sections[0]?.id;
			for (const s of sections) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= THRESHOLD) current = s.id;
			}
			if (atBottom && window.scrollY > 0) current = sections[sections.length - 1]?.id;
			setActive(current);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		const unpin = () => {
			pinnedRef.current = false;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("wheel", unpin, { passive: true });
		window.addEventListener("touchmove", unpin, { passive: true });
		window.addEventListener("keydown", unpin);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("wheel", unpin);
			window.removeEventListener("touchmove", unpin);
			window.removeEventListener("keydown", unpin);
		};
	}, [sections]);

	function go(id: string) {
		setActive(id);
		pinnedRef.current = true;
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	return (
		<div className={cn("rounded-xl border border-text-200 bg-surface p-4 sm:p-6 lg:flex lg:gap-8", className)}>
			<nav aria-label="Settings sections" className="mb-4 lg:mb-0 lg:w-52 lg:shrink-0">
				<ul className="flex gap-1 overflow-x-auto lg:sticky lg:top-24 lg:flex-col">
					{sections.map(({ id, label, icon: Icon }) => (
						<li key={id} className="shrink-0">
							<a
								href={`#${id}`}
								onClick={(e) => {
									e.preventDefault();
									go(id);
								}}
								aria-current={active === id ? "true" : undefined}
								className={cn(
									"flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand",
									active === id ? "bg-brand-subtle font-medium text-brand-fg" : "text-text-600 hover:bg-text-50 hover:text-text-900",
								)}
							>
								<Icon className="size-4 shrink-0" aria-hidden />
								{label}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<div className="min-w-0 flex-1 divide-y divide-text-100">{children}</div>
		</div>
	);
}

export type SettingsSectionProps = {
	id: string;
	title: string;
	/** Fields in a two-column grid. Pass `raw` to render children as-is. */
	children: ReactNode;
	raw?: boolean;
};

export function SettingsSection({ id, title, children, raw = false }: SettingsSectionProps) {
	return (
		<section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-6 first:pt-0 last:pb-0">
			<h3 id={`${id}-title`} className="mb-4 text-base font-semibold text-text-900">
				{title}
			</h3>
			{raw ? children : <ReviewFields columns={2}>{children}</ReviewFields>}
		</section>
	);
}

// ── Avatar picker ────────────────────────────────────────────────────────────

const MAX_BYTES = 2 * 1024 * 1024;
const VISIBLE_PRESETS = 5;

export type AvatarPickerProps = {
	name: string;
	/** Current photo or preset URL. */
	value?: string;
	onChange: (src: string | undefined) => void;
	presets?: AvatarPreset[];
};

export function AvatarPicker({ name, value, onChange, presets = AVATAR_PRESETS }: AvatarPickerProps) {
	const fileRef = useRef<HTMLInputElement>(null);
	const errorId = useId();
	const [error, setError] = useState<string>();
	const [showAll, setShowAll] = useState(false);
	const selectedIndex = presets.findIndex((p) => p.src === value);
	// Keep the chosen preset visible even when it's past the first row.
	const shown = showAll || selectedIndex >= VISIBLE_PRESETS ? presets : presets.slice(0, VISIBLE_PRESETS);
	const hidden = presets.length - VISIBLE_PRESETS;

	function onFile(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		e.target.value = ""; // allow picking the same file again
		if (!file) return;
		if (!["image/jpeg", "image/png"].includes(file.type)) return setError("Choose a JPG or PNG image.");
		if (file.size > MAX_BYTES) return setError("The image must be 2 MB or smaller.");
		setError(undefined);
		onChange(URL.createObjectURL(file));
	}

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-center gap-4">
				<Avatar name={name} src={value} size="xl" />
				<div className="space-y-2">
					<p className="text-xs text-text-500">JPG or PNG, up to 2 MB</p>
					<div className="flex flex-wrap gap-2">
						<Button size="sm" leftIcon={<Upload />} onClick={() => fileRef.current?.click()} aria-describedby={error ? errorId : undefined}>
							Upload photo
						</Button>
						<Button
							size="sm"
							variant="neutral"
							leftIcon={<Trash2 />}
							disabled={!value}
							onClick={() => {
								setError(undefined);
								onChange(undefined);
							}}
						>
							Remove
						</Button>
					</div>
					<input ref={fileRef} type="file" accept="image/jpeg,image/png" className="sr-only" tabIndex={-1} aria-hidden onChange={onFile} />
					{error && (
						<p id={errorId} role="alert" className="text-sm text-danger">
							{error}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-2.5">
				<p id={`${errorId}-presets`} className="text-sm text-text-600">
					No photo? Choose an avatar
				</p>
				<div role="radiogroup" aria-labelledby={`${errorId}-presets`} className="flex flex-wrap gap-2.5">
					{shown.map((preset) => {
						const selected = preset.src === value;
						return (
							<button
								key={preset.id}
								type="button"
								role="radio"
								aria-checked={selected}
								aria-label={preset.label}
								title={preset.label}
								onClick={() => {
									setError(undefined);
									onChange(preset.src);
								}}
								className={cn(
									"relative size-11 cursor-pointer rounded-full transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
									selected ? "ring-2 ring-brand ring-offset-2" : "hover:ring-2 hover:ring-text-300 hover:ring-offset-1",
								)}
							>
								{/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data URI */}
								<img src={preset.src} alt="" className="size-full rounded-full" />
								{selected && (
									<span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-brand text-white ring-2 ring-surface">
										<Check className="size-2.5" strokeWidth={3} aria-hidden />
									</span>
								)}
							</button>
						);
					})}
					{hidden > 0 && (
						<button
							type="button"
							onClick={() => setShowAll((s) => !s)}
							aria-expanded={showAll}
							className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-text-100 text-sm font-medium text-text-700 transition-colors hover:bg-text-200 focus-visible:outline-2 focus-visible:outline-brand"
							aria-label={showAll ? "Show fewer avatars" : `Show ${hidden} more avatars`}
						>
							{showAll ? "−" : `+${hidden}`}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
