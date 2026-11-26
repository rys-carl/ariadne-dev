import { Readiness } from "@/shared/ui/Readiness";

export default function ReadinessDemo() {
	return (
		<div className="flex flex-wrap justify-center gap-8">
			{[100, 75, 50, 25, 0].map((value) => (
				<Readiness key={value} value={value} />
			))}
		</div>
	);
}
