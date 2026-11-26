import { ReviewField, ReviewFields } from "@/shared/ui/DetailsCard";

// Outside a card, group fields in ReviewFields (it renders the <dl>).
export default function ReviewFieldDemo() {
	return (
		<ReviewFields columns={1} className="text-left">
			<ReviewField label="Client name" value="Maria Santos" />
			<ReviewField label="Days past due" value="12" tone="danger" />
		</ReviewFields>
	);
}
