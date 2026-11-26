import { Typography } from "@/shared/ui/Typography";

export default function TypographyDemo() {
	return (
		<article className="max-w-xl space-y-4 text-left">
			<Typography variant="h1">Taxing Laughter: The Joke Tax Chronicles</Typography>
			<Typography variant="lead">
				Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on
				his throne.
			</Typography>
			<Typography variant="h2" className="pt-4">
				The King&apos;s Plan
			</Typography>
			<Typography>
				The king thought long and hard, and finally came up with{" "}
				<Typography variant="code">a brilliant plan</Typography>: he would tax the jokes in the
				kingdom.
			</Typography>
			<Typography variant="blockquote">
				&ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so it&apos;s only fair
				that they should pay for the privilege.&rdquo;
			</Typography>
		</article>
	);
}
