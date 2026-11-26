"use client";

import { Tabs } from "@/shared/ui/Tabs";

export default function TabsDemo() {
	return (
		<Tabs
			variant="track"
			aria-label="Loan sections"
			className="w-full max-w-lg"
			panelClassName="rounded-xl border border-text-200 p-5 text-sm text-text-700"
			items={[
				{ value: "overview", label: "Overview", content: "Loan amount, term and current balance." },
				{ value: "payments", label: "Payments", content: "Payment schedule and history." },
				{ value: "documents", label: "Documents", content: "Uploaded IDs and signed agreements." },
			]}
		/>
	);
}
