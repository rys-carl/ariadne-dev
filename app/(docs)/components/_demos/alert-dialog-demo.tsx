"use client";

import { useState } from "react";
import { Timer, WifiOff } from "lucide-react";
import { AlertDialog } from "@/shared/ui/AlertDialog";
import { Button } from "@/shared/ui/Button";

type Kind = "syncing" | "session" | "timeout" | "upload" | null;

export default function AlertDialogDemo() {
	const [open, setOpen] = useState<Kind>(null);
	const close = () => setOpen(null);

	return (
		<div className="flex flex-wrap justify-center gap-3">
			<Button variant="neutral" size="sm" onClick={() => setOpen("syncing")}>Syncing data</Button>
			<Button variant="neutral" size="sm" onClick={() => setOpen("session")}>Session timed out</Button>
			<Button variant="neutral" size="sm" onClick={() => setOpen("timeout")}>Service timeout</Button>
			<Button variant="neutral" size="sm" onClick={() => setOpen("upload")}>Can&apos;t upload file</Button>

			{/* No onClose: Escape and the backdrop can't dismiss it, only Cancel. */}
			<AlertDialog
				open={open === "syncing"}
				tone="warning"
				loading
				title="Syncing data"
				description="Please keep this window open while we retrieve the latest data."
				actions={<Button variant="neutral" size="sm" onClick={close}>Cancel</Button>}
			/>
			<AlertDialog
				open={open === "session"}
				tone="warning"
				icon={Timer}
				title="Session timed out"
				description="You were signed out because of inactivity. Please sign in again to continue."
				actions={<Button size="sm" onClick={close}>Sign In</Button>}
			/>
			<AlertDialog
				open={open === "timeout"}
				onClose={close}
				tone="danger"
				icon={WifiOff}
				title="Service timeout"
				description="The service took too long to respond. Please try again in a moment."
				actions={
					<>
						<Button variant="neutral" size="sm" onClick={close}>Close</Button>
						<Button size="sm" onClick={close}>Try Again</Button>
					</>
				}
			/>
			<AlertDialog
				open={open === "upload"}
				onClose={close}
				tone="danger"
				title="Can't Upload File"
				description="The file format is invalid or required columns are missing. Please use the template and try again."
				actions={<Button size="sm" tone="destructive" onClick={close}>Try Again</Button>}
			/>
		</div>
	);
}
