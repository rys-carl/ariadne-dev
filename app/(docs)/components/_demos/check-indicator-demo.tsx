import { CheckIndicator, type CheckIndicatorVariant } from "@/shared/ui/CheckIndicator";

const VARIANTS: CheckIndicatorVariant[] = ["subtle", "success", "muted", "solid", "outline"];

export default function CheckIndicatorDemo() {
	return (
		<div className="flex flex-wrap items-end gap-8">
			{VARIANTS.map((variant) => (
				<div key={variant} className="flex flex-col items-center gap-2">
					<div className="flex items-center gap-2">
						<CheckIndicator variant={variant} size="sm" />
						<CheckIndicator variant={variant} />
					</div>
					<span className="font-mono text-xs text-text-500">{variant}</span>
				</div>
			))}
		</div>
	);
}
