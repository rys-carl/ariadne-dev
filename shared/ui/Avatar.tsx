// shared/ui/Avatar.tsx — initials avatar and the "client with avatar" cell.
// Spec: "Client wi(th avatar)" Figma. Documented at /components/avatar.
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/** "Maria Santos" → "MS"; "Juan R. Dela Cruz" → "JC". */
export function initials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	const first = parts[0][0];
	const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
	return (first + last).toUpperCase();
}

const sizes = { sm: "size-7 text-[11px]", md: "size-9 text-sm", lg: "size-12 text-base", xl: "size-16 text-2xl" } as const;

export type AvatarProps = {
	name: string;
	/** Photo or avatar image URL. Falls back to initials when left out. */
	src?: string;
	size?: keyof typeof sizes;
	className?: string;
};

/** Decorative: the name is always shown next to it, so it's hidden from screen readers. */
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
	if (src) {
		return (
			// eslint-disable-next-line @next/next/no-img-element -- user uploads are blob: URLs, which next/image can't optimize
			<img
				src={src}
				alt=""
				aria-hidden
				className={cn("shrink-0 select-none rounded-full bg-text-100 object-cover", sizes[size], className)}
			/>
		);
	}
	return (
		<span
			aria-hidden
			className={cn(
				"inline-flex shrink-0 select-none items-center justify-center rounded-full bg-brand font-medium text-white",
				sizes[size],
				className,
			)}
		>
			{initials(name)}
		</span>
	);
}

export type ClientCellProps = {
	name: string;
	/** Secondary line, e.g. the CID. */
	id?: ReactNode;
	size?: AvatarProps["size"];
	className?: string;
};

export function ClientCell({ name, id, size = "md", className }: ClientCellProps) {
	return (
		<span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
			<Avatar name={name} size={size} />
			<span className="min-w-0 leading-tight">
				<span className="block truncate text-base text-text-900">{name}</span>
				{id && <span className="block truncate text-sm text-text-500">{id}</span>}
			</span>
		</span>
	);
}
