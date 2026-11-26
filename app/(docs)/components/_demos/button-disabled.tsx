import { Button } from "@/shared/ui/Button";

export default function ButtonDisabled() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button disabled>Primary</Button>
			<Button variant="secondary" disabled>
				Secondary
			</Button>
			<Button variant="neutral" disabled>
				Neutral
			</Button>
			<Button tone="destructive" disabled>
				Destructive
			</Button>
		</div>
	);
}
