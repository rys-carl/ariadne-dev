"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { DetailsCard, ReviewField } from "@/shared/ui/DetailsCard";
import { Dialog } from "@/shared/ui/Dialog";
import { Stepper } from "@/shared/ui/Stepper";

export default function DialogDemo() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button variant="secondary" onClick={() => setOpen(true)}>
				View loan details
			</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				title="Loan Details"
				description="View loan account information and payment schedule."
				footer={
					<Button variant="neutral" onClick={() => setOpen(false)}>
						Close
					</Button>
				}
			>
				<Stepper steps={["Verify Staff", "Account Details", "Set Role"]} current={0} className="px-6" />
				<DetailsCard title="Payment Details">
					<ReviewField label="Interest Amount" value="PHP 736.00" />
					<ReviewField label="LRF" value="PHP 35.00" />
					<ReviewField label="Outstanding Balance" value="PHP 236.00" tone="danger" />
					<ReviewField label="Number of Term" value="23" />
					<ReviewField label="Loan Cycle" value="1" />
				</DetailsCard>
			</Dialog>
		</>
	);
}
