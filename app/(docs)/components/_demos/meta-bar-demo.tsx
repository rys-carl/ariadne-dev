"use client";

import { Badge } from "@/shared/ui/Badge";
import { MetaBar } from "@/shared/ui/MetaBar";
import { NotificationBell } from "@/shared/ui/NotificationBell";

export default function MetaBarDemo() {
	return (
		<MetaBar
			items={[
				{ label: "S", labelFull: "Start date", value: "March 25, 2026" },
				{ value: "10:30 AM" },
				{ label: "C", labelFull: "Close date", value: "July 30, 2026" },
				{ value: <Badge tone="danger" shape="tag" size="md">Status: Closed</Badge> },
				{ value: <NotificationBell /> },
			]}
		/>
	);
}
