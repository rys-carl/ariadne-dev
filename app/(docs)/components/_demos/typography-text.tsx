import { Typography } from "@/shared/ui/Typography";

export default function TypographyText() {
	return (
		<div className="w-full max-w-xl space-y-5 text-left">
			<Typography variant="lead">
				A modal dialog that interrupts the user with important content and expects a response.
			</Typography>
			<Typography variant="large">Are you absolutely sure?</Typography>
			<Typography variant="p">
				The king, seeing how much happier his subjects were, realized the error of his ways and
				repealed the joke tax.
			</Typography>
			<Typography variant="body">
				The king, seeing how much happier his subjects were, realized the error of his ways.
			</Typography>
			<Typography variant="body-medium">
				The king, seeing how much happier his subjects were, realized the error of his ways.
			</Typography>
			<div>
				<Typography variant="small">Email address</Typography>
			</div>
			<Typography variant="muted">Enter your email address.</Typography>
		</div>
	);
}
