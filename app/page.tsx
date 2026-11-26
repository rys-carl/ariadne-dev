import SiteHeader from "@/shared/layout/SiteHeader";
import { GuideWorkspace } from "./_components/GuideWorkspace";

export default function HomePage() {
	return (
		<div className="flex min-h-dvh flex-col bg-canvas">
			<SiteHeader />
			<GuideWorkspace />
		</div>
	);
}
