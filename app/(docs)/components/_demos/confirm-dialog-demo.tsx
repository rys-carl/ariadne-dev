"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { useAppToast } from "@/shared/ui/ToastContainer";

type Kind = "reject" | "reset" | "deactivate" | "block" | "delete" | "save" | null;
const fakeRequest = () => new Promise((resolve) => setTimeout(resolve, 900));

export default function ConfirmDialogDemo() {
	const [open, setOpen] = useState<Kind>(null);
	const toast = useAppToast();
	const close = () => setOpen(null);

	// Close the dialog yourself once the request succeeds.
	const run = (message: string) => async () => {
		await fakeRequest();
		close();
		toast.success(message);
	};

	return (
		<div className="flex flex-wrap justify-center gap-3">
			<Button size="sm" tone="destructive" variant="secondary" onClick={() => setOpen("reject")}>Reject account</Button>
			<Button size="sm" variant="neutral" onClick={() => setOpen("reset")}>Reset MPIN</Button>
			<Button size="sm" tone="destructive" variant="secondary" onClick={() => setOpen("deactivate")}>Deactivate device</Button>
			<Button size="sm" tone="destructive" variant="secondary" onClick={() => setOpen("block")}>Block account</Button>
			<Button size="sm" tone="destructive" variant="secondary" onClick={() => setOpen("delete")}>Delete record</Button>
			<Button size="sm" onClick={() => setOpen("save")}>Save changes</Button>

			<ConfirmDialog
				open={open === "reject"}
				onCancel={close}
				onConfirm={run("Account rejected.")}
				tone="warning"
				destructive
				title="Reject this client account?"
				description="You are rejecting Maria Santos's account. Provide remarks to explain your decision."
				remarks
				notice="Your remarks will be recorded and the account status will be marked as Rejected."
				confirmLabel="Confirm Rejection"
			/>
			<ConfirmDialog
				open={open === "reset"}
				onCancel={close}
				onConfirm={run("MPIN reset. The client will set a new one on next login.")}
				tone="warning"
				title="Reset MPIN"
				description="Are you sure you want to reset the MPIN for this client? The client will need to set up a new MPIN on their next login."
				details={[
					{ label: "CID", value: "CID20240001" },
					{ label: "Client", value: "Maria Santos" },
				]}
				notice="This action cannot be undone. The client will need to set up a new MPIN on their next login."
				confirmLabel="Reset MPIN"
			/>
			<ConfirmDialog
				open={open === "deactivate"}
				onCancel={close}
				onConfirm={run("Device deactivated.")}
				tone="danger"
				title="Deactivate Device"
				description="Are you sure you want to deactivate this device? The client will no longer be able to access the system from this device."
				details={[
					{ label: "Device ID", value: "DEV-2024-0001" },
					{ label: "Client", value: "Maria Santos" },
				]}
				notice="This action cannot be undone. The client will no longer be able to access the system from this device."
				confirmLabel="Deactivate"
			/>
			<ConfirmDialog
				open={open === "block"}
				onCancel={close}
				onConfirm={run("Account blocked.")}
				tone="danger"
				title="Block Account"
				description="Are you sure you want to block this account? The client will not be able to sign in until the account is unblocked."
				details={[
					{ label: "CID", value: "CID20240001" },
					{ label: "Client", value: "Maria Santos" },
				]}
				notice="Blocked accounts can only be restored by an administrator."
				confirmLabel="Block Account"
			/>
			<ConfirmDialog
				open={open === "delete"}
				onCancel={close}
				onConfirm={async () => {
					await fakeRequest();
					// A failure keeps the dialog open so the user can retry.
					toast.error("Something went wrong. Please try again.");
					throw new Error("Demo failure");
				}}
				tone="danger"
				title="Delete Record"
				description="Are you sure you want to delete this record? It will be permanently removed from the system."
				details={[
					{ label: "Record", value: "REC-2024-0001" },
					{ label: "Created by", value: "Maria Santos" },
				]}
				notice="This action cannot be undone."
				confirmLabel="Delete"
			/>
			<ConfirmDialog
				open={open === "save"}
				onCancel={close}
				onConfirm={run("Changes saved successfully.")}
				tone="info"
				title="Save Changes"
				description="You are about to update this record. Please review the changes before saving."
				details={[
					{ label: "Record", value: "REC-2024-0001" },
					{ label: "Fields changed", value: "3" },
				]}
				notice="The previous values will be kept in the audit trail."
				confirmLabel="Save Changes"
			/>
		</div>
	);
}
