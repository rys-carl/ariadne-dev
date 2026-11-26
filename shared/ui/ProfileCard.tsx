// shared/ui/ProfileCard.tsx — signed-in user's profile summary and account actions.
// Spec: "Profile Settings" Figma (green banner, avatar, details, actions).
// Documented at /components/profile-card. Opens from UserMenu in the header.
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "./Avatar";

export type ProfileDetail = { icon: LucideIcon; label: string; value: ReactNode };

export type ProfileAction = {
	icon: LucideIcon;
	label: string;
	/** Renders a link. */
	href?: string;
	/** Renders a button. */
	onClick?: () => void;
	/** Shows a › chevron, for actions that open another page. */
	chevron?: boolean;
};

export type ProfileCardProps = {
	name: string;
	/** Photo or avatar image. Initials are shown without it. */
	avatarSrc?: string;
	/** Username or employee number, e.g. "@202309-46832". */
	handle?: string;
	details?: ProfileDetail[];
	actions?: ProfileAction[];
	/** Small button on the banner's top-right (e.g. change cover). */
	bannerAction?: ReactNode;
	className?: string;
};

const actionClass =
	"flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-text-900 transition-colors hover:bg-text-50 focus-visible:outline-2 focus-visible:outline-brand";

export function ProfileCard({ name, avatarSrc, handle, details = [], actions = [], bannerAction, className }: ProfileCardProps) {
	return (
		<section aria-label="Profile" className={cn("w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-surface shadow-lg ring-1 ring-black/5", className)}>
			<div className="relative h-16 bg-linear-to-r from-[#054b03] via-[#065104] via-55% to-[#3f8f2a]">
				{bannerAction && <div className="absolute right-3 top-3">{bannerAction}</div>}
				<Avatar name={name} src={avatarSrc} size="lg" className="absolute -bottom-6 left-4 ring-[3px] ring-surface" />
			</div>

			<div className="px-4 pb-3 pt-8">
				<p className="truncate text-base font-semibold text-text-900">{name}</p>
				{handle && <p className="truncate text-sm text-slate-500">{handle}</p>}
			</div>

			{details.length > 0 && (
				<dl className="space-y-2.5 border-t border-text-200 px-4 py-3">
					{details.map(({ icon: Icon, label, value }) => (
						<div key={label} className="flex gap-2.5">
							<Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-slate-500" strokeWidth={1.75} />
							<div className="min-w-0">
								<dt className="text-xs leading-4 text-slate-500">{label}</dt>
								<dd className="break-words text-sm text-text-900">{value}</dd>
							</div>
						</div>
					))}
				</dl>
			)}

			{actions.length > 0 && (
				<ul className="border-t border-text-200 p-1.5">
					{actions.map(({ icon: Icon, label, href, onClick, chevron }) => {
						const inner = (
							<>
								<Icon aria-hidden className="size-4 shrink-0 text-slate-500" />
								<span className="flex-1">{label}</span>
								{chevron && <ChevronRight aria-hidden className="size-4 text-text-700" />}
							</>
						);
						return (
							<li key={label}>
								{href ? (
									<Link href={href} className={actionClass} onClick={onClick}>
										{inner}
									</Link>
								) : (
									<button type="button" className={actionClass} onClick={onClick}>
										{inner}
									</button>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
