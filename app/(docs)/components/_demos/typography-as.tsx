import { Typography } from "@/shared/ui/Typography";

// Keep the heading hierarchy correct for screen readers, while
// choosing the look independently: this is an <h2> styled as h4.
export default function TypographyAs() {
	return (
		<Typography variant="h4" as="h2">
			Card title
		</Typography>
	);
}
