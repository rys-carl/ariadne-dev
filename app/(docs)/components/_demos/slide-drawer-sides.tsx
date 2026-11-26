"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { DetailsCard, ReviewField } from "@/shared/ui/DetailsCard";
import { SlideDrawer } from "@/shared/ui/SlideDrawer";

type Side = "right" | "left";

export default function SlideDrawerSides() {
	const [side, setSide] = useState<Side | null>(null);
	const close = () => setSide(null);

	return (
		<>
			<div className="flex flex-wrap gap-3">
				<Button variant="secondary" onClick={() => setSide("right")}>
					Open right
				</Button>
				<Button variant="secondary" onClick={() => setSide("left")}>
					Open left
				</Button>
			</div>
			<SlideDrawer
				open={side !== null}
				onClose={close}
				side={side ?? "right"}
				size="md"
				title="Borrower"
				description={`Slides in from the ${side ?? "right"} edge.`}
				footer={
					<Button variant="neutral" onClick={close}>
						Close
					</Button>
				}
			>
				<DetailsCard title="Personal Information">
					<ReviewField label="Full Name" value="Juan Dela Cruz" />
					<ReviewField label="Branch" value="Cebu City" />
					<ReviewField label="Mobile Number" value="+63 917 123 4567" />
					<ReviewField label="Member Since" value="March 2021" />
				</DetailsCard>
			</SlideDrawer>
		</>
	);
}
