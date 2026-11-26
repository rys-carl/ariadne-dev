import { Star } from "lucide-react";
import { Icon, type IconSize } from "@/shared/ui/Icon";

const SIZES: IconSize[] = ["xs", "sm", "md", "lg", "xl"];

export default function IconSizes() {
	return (
		<div className="flex items-end gap-8">
			{SIZES.map((size) => (
				<div key={size} className="flex flex-col items-center gap-2">
					<Icon icon={Star} size={size} />
					<span className="font-mono text-xs text-text-500">{size}</span>
				</div>
			))}
		</div>
	);
}
