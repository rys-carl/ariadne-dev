import { ShieldAlert, Timer } from "lucide-react";
import { AlertIcon } from "@/shared/ui/AlertIcon";

export default function AlertIconDemo() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<AlertIcon tone="warning" />
			<AlertIcon tone="danger" />
			<AlertIcon tone="success" />
			<AlertIcon tone="info" />
			<span className="mx-2 h-8 w-px bg-text-200" />
			<AlertIcon tone="warning" loading />
			<AlertIcon tone="warning" icon={Timer} />
			<AlertIcon tone="danger" icon={ShieldAlert} />
			<AlertIcon tone="info" size="md" />
		</div>
	);
}
