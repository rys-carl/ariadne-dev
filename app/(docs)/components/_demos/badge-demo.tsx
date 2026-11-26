import { Badge } from "@/shared/ui/Badge";

export default function BadgeDemo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Badge tone="success">Done</Badge>
			<Badge>Notified</Badge>
			<Badge>Upcoming</Badge>
			<Badge tone="warning">Pending review</Badge>
			<Badge tone="danger">Overdue</Badge>
			<Badge tone="info">New</Badge>
		</div>
	);
}
