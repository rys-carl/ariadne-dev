import { Plus } from "lucide-react";
import { IconButton } from "@/shared/ui/Button";

export default function IconButtonSizes() {
	return (
		<div className="flex items-center gap-3">
			<IconButton size="md" icon={<Plus />} aria-label="Add (medium)" />
			<IconButton size="sm" icon={<Plus />} aria-label="Add (small)" />
			<IconButton size="xs" icon={<Plus />} aria-label="Add (extra small)" />
			<IconButton size="md" disabled icon={<Plus />} aria-label="Add (disabled)" />
		</div>
	);
}
