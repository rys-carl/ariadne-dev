import { Trash2 } from "lucide-react";
import { IconButton } from "@/shared/ui/Button";

export default function IconButtonDestructive() {
	return (
		<div className="flex items-center gap-3">
			<IconButton tone="destructive" icon={<Trash2 />} aria-label="Delete (primary)" />
			<IconButton tone="destructive" variant="secondary" icon={<Trash2 />} aria-label="Delete (secondary)" />
			<IconButton tone="destructive" variant="ghost" icon={<Trash2 />} aria-label="Delete (ghost)" />
		</div>
	);
}
