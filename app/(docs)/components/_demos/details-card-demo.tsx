import { DetailsCard, ReviewField } from "@/shared/ui/DetailsCard";

export default function DetailsCardDemo() {
	return (
		<DetailsCard title="Payment Details" className="w-full max-w-2xl text-left">
			<ReviewField label="Interest Amount" value="PHP 736.00" />
			<ReviewField label="LRF" value="PHP 35.00" />
			<ReviewField label="Outstanding Balance" value="PHP 236.00" tone="danger" />
			<ReviewField label="Number of Term" value="23" />
			<ReviewField label="Loan Cycle" value="1" />
		</DetailsCard>
	);
}
