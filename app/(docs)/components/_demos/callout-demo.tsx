import { Callout } from "@/shared/ui/Callout";

export default function CalloutDemo() {
	return (
		<div className="grid w-full max-w-md gap-3 text-left">
			<Callout tone="warning">This action cannot be undone. The client will need to set up a new MPIN on their next login.</Callout>
			<Callout tone="danger">Blocked accounts can only be restored by an administrator.</Callout>
			<Callout tone="info">The previous values will be kept in the audit trail.</Callout>
			<Callout tone="success">All 24 files passed validation.</Callout>
		</div>
	);
}
