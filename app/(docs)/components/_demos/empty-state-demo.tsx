import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";

export default function EmptyStateDemo() {
	return (
		<EmptyState
			action={
				<Button size="sm" variant="neutral">
					Clear filters
				</Button>
			}
		/>
	);
}
