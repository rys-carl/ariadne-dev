import { Button } from "@/shared/ui/Button";

export default function ButtonVariants() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="neutral">Neutral</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	);
}
