import { Pencil, Plus, Trash2 } from "lucide-react";
import { IconButton } from "@/shared/ui/Button";

export default function IconButtonDemo() {
	return (
		<div className="flex items-center gap-2">
			<IconButton icon={<Plus />} aria-label="Add record" />
			<IconButton variant="neutral" icon={<Pencil />} aria-label="Edit record" />
			<IconButton tone="destructive" variant="ghost" icon={<Trash2 />} aria-label="Delete record" />
		</div>
	);
}
