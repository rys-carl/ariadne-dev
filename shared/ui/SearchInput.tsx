// shared/ui/SearchInput.tsx — search box with a clear button.
// Spec: "Search input" Figma (default / focus / filled with clear ×).
// Documented at /components/search-input.
"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";

export type SearchInputProps = Omit<ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type" | "size"> & {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	/** Called when the clear button or Escape empties the field. */
	onClear?: () => void;
	className?: string;
};

export function SearchInput({
	value: valueProp,
	defaultValue = "",
	onValueChange,
	onClear,
	className,
	id: idProp,
	disabled: disabledProp,
	placeholder = "Search",
	onKeyDown,
	...props
}: SearchInputProps) {
	const { id, disabled, describedBy } = useFieldControl({
		id: idProp,
		disabled: disabledProp,
		"aria-describedby": props["aria-describedby"],
	});
	const [inner, setInner] = useState(defaultValue);
	const value = valueProp ?? inner;
	const inputRef = useRef<HTMLInputElement>(null);

	function update(next: string) {
		if (valueProp === undefined) setInner(next);
		onValueChange?.(next);
	}

	function clear() {
		update("");
		onClear?.();
		inputRef.current?.focus();
	}

	return (
		<div
			className={cn(
				"flex h-11 w-full items-center gap-2 rounded-xl border border-text-200 bg-surface px-3.5 text-sm transition-colors",
				"focus-within:border-search-focus has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
				className,
			)}
		>
			<Search className="size-4 shrink-0 text-text-500" aria-hidden />
			<input
				ref={inputRef}
				id={id}
				type="search"
				role="searchbox"
				disabled={disabled}
				placeholder={placeholder}
				{...props}
				aria-describedby={describedBy}
				value={value}
				onChange={(e) => update(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Escape" && value) {
						e.preventDefault();
						clear();
					}
					onKeyDown?.(e);
				}}
				className="h-full min-w-0 flex-1 bg-transparent text-text-900 outline-none placeholder:text-text-500 disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:appearance-none"
			/>
			{value && !disabled && (
				<button
					type="button"
					onClick={clear}
					aria-label="Clear search"
					className="-mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-700 hover:bg-text-100 focus-visible:outline-2 focus-visible:outline-search-focus"
				>
					<X className="size-4" />
				</button>
			)}
		</div>
	);
}
