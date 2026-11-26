import { Globe } from "lucide-react";
import { Icon, type IconTone } from "@/shared/ui/Icon";

const TONES: IconTone[] = ["default", "muted", "brand", "danger"];

export default function IconTones() {
	return (
		<div className="flex items-end gap-8">
			{TONES.map((tone) => (
				<div key={tone} className="flex flex-col items-center gap-2">
					<Icon icon={Globe} size="xl" tone={tone} />
					<span className="font-mono text-xs text-text-500">{tone}</span>
				</div>
			))}
			<div className="flex flex-col items-center gap-2">
				<span className="rounded-md bg-brand p-1">
					<Icon icon={Globe} size="lg" tone="inverse" />
				</span>
				<span className="font-mono text-xs text-text-500">inverse</span>
			</div>
		</div>
	);
}
