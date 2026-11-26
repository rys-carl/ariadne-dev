import { Avatar, ClientCell } from "@/shared/ui/Avatar";

export default function AvatarDemo() {
	return (
		<div className="flex flex-col items-center gap-6">
			<ClientCell name="Maria Santos" id="CID-2024-0001" />
			<div className="flex items-center gap-3">
				<Avatar name="Juan R. Dela Cruz" size="sm" />
				<Avatar name="Juan R. Dela Cruz" />
				<Avatar name="Juan R. Dela Cruz" size="lg" />
			</div>
		</div>
	);
}
