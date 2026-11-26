import { geist, inter, poppins } from "@/shared/fonts";

const FONTS = [
	{ name: "Inter", font: inter, note: "Default" },
	{ name: "Poppins", font: poppins },
	{ name: "Geist", font: geist },
];

export default function TypographyFonts() {
	return (
		<div className="grid w-full gap-4 sm:grid-cols-3">
			{FONTS.map(({ name, font, note }) => (
				<div key={name} className={`${font.className} rounded-xl border border-text-200 bg-surface p-5 text-left`}>
					<p className="mb-4 flex items-center justify-between text-xs text-text-500">
						{name}
						{note && <span className="rounded-full bg-brand-subtle px-2 py-0.5 font-medium text-brand-fg">{note}</span>}
					</p>
					<p className="text-5xl font-black leading-none tracking-tight text-text-900">Aa</p>
					<p className="mt-4 text-sm leading-6 text-text-700">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
					<p className="mt-2 text-sm text-text-500">
						<span className="font-normal">Regular</span> · <span className="font-medium">Medium</span> ·{" "}
						<span className="font-semibold">Semibold</span> · <span className="font-bold">Bold</span> ·{" "}
						<span className="font-black">Black</span>
					</p>
				</div>
			))}
		</div>
	);
}
