import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export default function ButtonDestructive() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button tone="destructive" leftIcon={<Trash2 />}>
				Delete
			</Button>
			<Button tone="destructive" variant="secondary">
				Revoke access
			</Button>
			<Button tone="destructive" variant="ghost">
				Remove
			</Button>
			<Button tone="destructive" variant="link">
				Discard draft
			</Button>
		</div>
	);
}
