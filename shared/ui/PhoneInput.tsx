// shared/ui/PhoneInput.tsx — phone number with country picker and mask.
// Spec: "🇵🇭 PH ⇕ (+63)000-000-0000". Documented at /components/phone-input.
//
// The value is the national number as digits only ("9171234567");
// onValueChange also gives the E.164 form ("+639171234567") for APIs.
"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useFieldControl } from "./Field";
import { controlInputStyles, controlStyles } from "./Input";

// Flags are inline SVG (not emoji), because Windows doesn't render flag emoji.
const flagPaths: Record<string, ReactNode> = {
	PH: (
		<>
			<rect width="16" height="8" fill="#0038a8" />
			<rect y="8" width="16" height="8" fill="#ce1126" />
			<path d="M0 0 L13.9 8 L0 16 Z" fill="#fff" />
			<circle cx="4.6" cy="8" r="1.7" fill="#fcd116" />
		</>
	),
	US: (
		<>
			<rect width="16" height="16" fill="#fff" />
			{[0, 2, 4, 6, 8, 10, 12, 14].map((y) => (
				<rect key={y} y={y * 1.15} width="16" height="1.15" fill="#b22234" />
			))}
			<rect width="8" height="8.6" fill="#3c3b6e" />
		</>
	),
	SG: (
		<>
			<rect width="16" height="8" fill="#ef3340" />
			<rect y="8" width="16" height="8" fill="#fff" />
			<circle cx="5" cy="4.5" r="2.6" fill="#fff" />
			<circle cx="6.1" cy="4.5" r="2.4" fill="#ef3340" />
		</>
	),
	HK: (
		<>
			<rect width="16" height="16" fill="#de2910" />
			{[0, 72, 144, 216, 288].map((deg) => (
				<ellipse key={deg} cx="8" cy="5.3" rx="1.3" ry="2.6" fill="#fff" transform={`rotate(${deg} 8 8)`} />
			))}
		</>
	),
	JP: (
		<>
			<rect width="16" height="16" fill="#fff" />
			<circle cx="8" cy="8" r="4.2" fill="#bc002d" />
		</>
	),
	AE: (
		<>
			<rect width="16" height="5.33" fill="#00732f" />
			<rect y="5.33" width="16" height="5.34" fill="#fff" />
			<rect y="10.67" width="16" height="5.33" fill="#000" />
			<rect width="4.5" height="16" fill="#ff0000" />
		</>
	),
};

export type Country = {
	/** ISO 3166-1 alpha-2 code. */
	code: string;
	name: string;
	/** Calling code without "+". */
	dial: string;
	/** "#" = digit; anything else is a separator. Also sets the max length. */
	mask: string;
};

export const COUNTRIES: Country[] = [
	{ code: "PH", name: "Philippines", dial: "63", mask: "###-###-####" },
	{ code: "US", name: "United States", dial: "1", mask: "###-###-####" },
	{ code: "SG", name: "Singapore", dial: "65", mask: "####-####" },
	{ code: "HK", name: "Hong Kong", dial: "852", mask: "####-####" },
	{ code: "JP", name: "Japan", dial: "81", mask: "##-####-####" },
	{ code: "AE", name: "United Arab Emirates", dial: "971", mask: "##-###-####" },
];

function Flag({ code }: { code: string }) {
	const id = `flag-clip-${code}`;
	return (
		<svg viewBox="0 0 16 16" className="size-4 shrink-0 rounded-full ring-1 ring-black/10" aria-hidden>
			<clipPath id={id}>
				<circle cx="8" cy="8" r="8" />
			</clipPath>
			<g clipPath={`url(#${id})`}>{flagPaths[code] ?? <rect width="16" height="16" fill="#e5e7eb" />}</g>
		</svg>
	);
}

const maxDigits = (mask: string) => mask.split("").filter((c) => c === "#").length;

/** Formats digits with a mask, adding separators only between typed digits. */
export function formatWithMask(digits: string, mask: string) {
	let out = "";
	let i = 0;
	for (const ch of mask) {
		if (i >= digits.length) break;
		if (ch === "#") out += digits[i++];
		else out += ch;
	}
	return out;
}

export type PhoneInputProps = Omit<
	ComponentProps<"input">,
	"value" | "defaultValue" | "onChange" | "type" | "size"
> & {
	/** National number, digits only. Controlled. */
	value?: string;
	defaultValue?: string;
	onValueChange?: (digits: string, details: { e164: string; country: Country }) => void;
	/** ISO code of the selected country. Controlled. */
	country?: string;
	defaultCountry?: string;
	onCountryChange?: (country: Country) => void;
	/** Countries in the picker. Defaults to COUNTRIES. */
	countries?: Country[];
	invalid?: boolean;
	className?: string;
};

export function PhoneInput({
	value: valueProp,
	defaultValue = "",
	onValueChange,
	country: countryProp,
	defaultCountry = "PH",
	onCountryChange,
	countries = COUNTRIES,
	invalid: invalidProp,
	disabled: disabledProp,
	required: requiredProp,
	id: idProp,
	className,
	placeholder,
	...props
}: PhoneInputProps) {
	const { id, invalid, disabled, required, describedBy } = useFieldControl({
		id: idProp,
		invalid: invalidProp,
		disabled: disabledProp,
		required: requiredProp,
		"aria-describedby": props["aria-describedby"],
	});
	const [innerValue, setInnerValue] = useState(defaultValue);
	const [innerCountry, setInnerCountry] = useState(defaultCountry);
	const digits = valueProp ?? innerValue;
	const countryCode = countryProp ?? innerCountry;
	const country = countries.find((c) => c.code === countryCode) ?? countries[0];

	function updateDigits(next: string, c: Country = country) {
		// Drop the local trunk "0" people habitually type (0917… → 917…).
		const cleaned = next.replace(/\D/g, "").replace(/^0+/, "").slice(0, maxDigits(c.mask));
		if (valueProp === undefined) setInnerValue(cleaned);
		onValueChange?.(cleaned, { e164: cleaned ? `+${c.dial}${cleaned}` : "", country: c });
	}

	return (
		<div className={controlStyles({ invalid, className: cn("h-10 w-full gap-3 px-3", className) })}>
			<span className="relative flex shrink-0 items-center gap-1.5 text-text-900">
				<Flag code={country.code} />
				<span className="text-sm font-medium">{country.code}</span>
				<ChevronsUpDown className="text-text-600!" />
				{/* Native select on top: accessible and keyboard-friendly for free. */}
				<select
					aria-label="Country calling code"
					value={country.code}
					disabled={disabled}
					onChange={(e) => {
						const next = countries.find((c) => c.code === e.target.value) ?? countries[0];
						if (countryProp === undefined) setInnerCountry(next.code);
						onCountryChange?.(next);
						updateDigits(digits, next);
					}}
					className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
				>
					{countries.map((c) => (
						<option key={c.code} value={c.code}>
							{c.name} (+{c.dial})
						</option>
					))}
				</select>
			</span>
			<span className="flex h-full min-w-0 flex-1 items-center">
				<span className={cn("shrink-0", invalid ? "text-danger" : digits ? "text-text-900" : "text-text-500")}>
					(+{country.dial})
				</span>
				<input
					id={id}
					type="tel"
					inputMode="tel"
					autoComplete="tel-national"
					disabled={disabled}
					required={required}
					aria-invalid={invalid || undefined}
					placeholder={placeholder ?? country.mask.replace(/#/g, "0")}
					{...props}
					aria-describedby={describedBy}
					value={formatWithMask(digits, country.mask)}
					onChange={(e) => updateDigits(e.target.value)}
					className={controlInputStyles({ invalid })}
				/>
			</span>
		</div>
	);
}
