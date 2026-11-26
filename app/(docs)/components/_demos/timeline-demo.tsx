import { Badge } from "@/shared/ui/Badge";
import { Timeline, TimelineFields, TimelineItem, TimelineNotice } from "@/shared/ui/Timeline";

export default function TimelineDemo() {
	return (
		<Timeline className="w-full max-w-3xl text-left">
			<TimelineItem date="September 14, 2026" status="done">
				<TimelineFields
					fields={[
						{ label: "Day:", value: "Day 0" },
						{ label: "Action:", value: "APE Result Release Date / Countdown Start" },
						{ label: "Recipient:", value: "—" },
						{ label: "Status:", value: <Badge tone="success">Done</Badge> },
					]}
				/>
			</TimelineItem>
			<TimelineItem date="September 15, 2026" status="current">
				<TimelineFields
					fields={[
						{ label: "Day:", value: "Day 1" },
						{ label: "Action:", value: "First Escalation" },
						{
							label: "Recipient:",
							value: (
								<>
									Unit Manager <span className="ml-4 text-text-500">— Juan R. Dela Cruz</span>
								</>
							),
						},
					]}
				/>
				<TimelineNotice>Notification sent to Juan R. Dela Cruz (Unit Manager)</TimelineNotice>
				<TimelineFields fields={[{ label: "Status:", value: <Badge>Notified</Badge> }]} />
			</TimelineItem>
			<TimelineItem date="September 16, 2026" status="upcoming">
				<TimelineFields
					fields={[
						{ label: "Day:", value: "Day 2" },
						{ label: "Action:", value: "Second Escalation" },
						{ label: "Recipient:", value: "Area Manager" },
						{ label: "Status:", value: <Badge>Upcoming</Badge> },
					]}
				/>
			</TimelineItem>
			<TimelineItem date="September 18, 2026" status="upcoming">
				<TimelineFields
					fields={[
						{ label: "Day:", value: "Day 4" },
						{ label: "Action:", value: "Final Escalation / Access Restriction Notice" },
						{ label: "Recipient:", value: "Security Admin" },
						{ label: "Status:", value: <Badge>Upcoming</Badge> },
					]}
				/>
			</TimelineItem>
		</Timeline>
	);
}
