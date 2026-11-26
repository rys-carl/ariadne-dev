import { Plus } from "lucide-react";
import { IconButton } from "@/shared/ui/Button";

export default function IconButtonVariants() {
	return (
		<div className="flex items-center gap-3">
			<IconButton variant="primary" icon={<Plus />} aria-label="Add (primary)" />
			<IconButton variant="secondary" icon={<Plus />} aria-label="Add (secondary)" />
			<IconButton variant="neutral" icon={<Plus />} aria-label="Add (neutral)" />
			<IconButton variant="ghost" icon={<Plus />} aria-label="Add (ghost)" />
		</div>
	);
}
