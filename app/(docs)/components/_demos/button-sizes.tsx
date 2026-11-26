import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export default function ButtonSizes() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button size="md" leftIcon={<Plus />}>
				Medium
			</Button>
			<Button size="sm" leftIcon={<Plus />}>
				Small
			</Button>
			<Button size="xs" leftIcon={<Plus />}>
				Extra small
			</Button>
		</div>
	);
}
