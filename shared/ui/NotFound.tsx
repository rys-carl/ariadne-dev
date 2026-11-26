// shared/ui/NotFound.tsx — 404 screen. Used by app/not-found.tsx (full page).
import Link from "next/link";
import { BookOpen, Home, SearchX } from "lucide-react";
import { buttonStyles } from "./Button";
import { StatusScreen } from "./StatusScreen";

export type NotFoundProps = {
	message?: string;
	/** Full viewport with logo (outside the app shell). */
	fullPage?: boolean;
};

export default function NotFound({
	message = "The page you're looking for doesn't exist or has been moved. Check the address, or head back to the workspace.",
	fullPage = true,
}: NotFoundProps) {
	return (
		<StatusScreen
			fullPage={fullPage}
			icon={SearchX}
			tone="warning"
			code="404"
			title="Page not found"
			message={message}
			actions={
				<Link href="/" className={buttonStyles()}>
					Back to Ariadne
				</Link>
			}
			links={[
				{ href: "/", label: "Workspace", icon: Home, note: "Add a game guide" },
				{ href: "/components", label: "Components", icon: BookOpen, note: "UI reference" },
			]}
		/>
	);
}
