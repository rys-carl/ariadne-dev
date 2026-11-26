import { CircleCheck, Mail, TriangleAlert } from "lucide-react";
import { Icon } from "@/shared/ui/Icon";

export default function IconDemo() {
	return (
		<div className="space-y-3 text-sm text-text-800">
			<p className="flex items-center gap-2">
				<Icon icon={Mail} tone="muted" />
				juan.delacruz@bakawan.com
			</p>
			<p className="flex items-center gap-2">
				<Icon icon={CircleCheck} tone="brand" label="Success" />
				Payroll file uploaded
			</p>
			<p className="flex items-center gap-2">
				<Icon icon={TriangleAlert} tone="danger" label="Error" />
				3 records failed validation
			</p>
		</div>
	);
}
