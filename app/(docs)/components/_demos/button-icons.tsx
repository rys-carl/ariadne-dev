import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export default function ButtonIcons() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button variant="secondary" leftIcon={<Download />}>
				Left icon
			</Button>
			<Button rightIcon={<ArrowRight />}>Right icon</Button>
			<Button variant="neutral">No icon</Button>
		</div>
	);
}
