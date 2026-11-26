"use client";

import { Toggle } from "@/shared/ui/Toggle";

// With a label and description, for settings lists. Uncontrolled here.
export default function ToggleSettings() {
	return (
		<div className="flex w-full max-w-md flex-col gap-5 text-left">
			<Toggle label="Email notifications" description="Approvals and escalations assigned to you." defaultChecked />
			<Toggle label="SMS alerts" description="Only for overdue accounts." />
			<Toggle label="Weekly summary" size="sm" defaultChecked />
			<Toggle label="Two-factor sign-in" description="Managed by your administrator." disabled defaultChecked />
		</div>
	);
}
