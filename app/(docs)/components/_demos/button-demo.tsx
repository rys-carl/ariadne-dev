import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export default function ButtonDemo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button leftIcon={<Plus />}>New record</Button>
			<Button variant="secondary">Export</Button>
			<Button variant="neutral">Cancel</Button>
		</div>
	);
}
