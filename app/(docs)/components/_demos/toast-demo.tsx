"use client";

import { Button } from "@/shared/ui/Button";
import { useAppToast } from "@/shared/ui/ToastContainer";

export default function ToastDemo() {
	const toast = useAppToast();

	return (
		<div className="flex flex-wrap justify-center gap-3">
			<Button size="sm" variant="neutral" onClick={() => toast.success("Changes saved successfully.")}>Success</Button>
			<Button size="sm" variant="neutral" onClick={() => toast.info("Your changes will be kept in the audit trail.")}>Info</Button>
			<Button size="sm" variant="neutral" onClick={() => toast.warning("Remarks are required before this account can be rejected.")}>Warning</Button>
			<Button size="sm" variant="neutral" onClick={() => toast.error("Something went wrong. Please try again.")}>Error</Button>
			<Button size="sm" variant="neutral" onClick={() => toast.success("24 files uploaded.", "Batch upload complete")}>With title</Button>
		</div>
	);
}
