import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/shared/ui/Button";

// Navigation should be a link, not a button. buttonStyles() gives a
// <Link> the same look without nesting a <button> inside an <a>.
export default function ButtonAsLink() {
	return (
		<Link href="/components" className={buttonStyles({ variant: "secondary" })}>
			Browse components
			<ArrowRight />
		</Link>
	);
}
