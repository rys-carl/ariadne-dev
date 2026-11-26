import { Download, Send } from "lucide-react";
import { Button, IconButton } from "@/shared/ui/Button";

// Inside buttons, pass the bare lucide icon: the button sizes it
// to match (16px for md, 14px for sm, 12px for xs).
export default function IconInButton() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button leftIcon={<Send />}>Send</Button>
			<Button size="sm" variant="secondary" leftIcon={<Download />}>
				Download
			</Button>
			<IconButton variant="neutral" icon={<Download />} aria-label="Download" />
		</div>
	);
}
