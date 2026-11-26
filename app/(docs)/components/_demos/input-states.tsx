import { Plus } from "lucide-react";
import { Field } from "@/shared/ui/Field";
import { Input } from "@/shared/ui/Input";

// The spec's state grid. Click a field to see its focus state.
const STATES = [
	{ name: "Default", props: {} },
	{ name: "Filled", props: { defaultValue: "Placeholder" } },
	{ name: "Disabled", props: { disabled: true } },
];

export default function InputStates() {
	return (
		<div className="grid w-full gap-x-6 gap-y-8 sm:grid-cols-3">
			{STATES.map((state) => (
				<Field key={state.name} label="Label" helper="Enter your placeholder" disabled={state.props.disabled}>
					<Input placeholder="Placeholder" leftIcon={<Plus />} rightIcon={<Plus />} {...state.props} />
				</Field>
			))}
			{STATES.map((state) => (
				<Field
					key={`error-${state.name}`}
					label="Label"
					helper="Enter your placeholder"
					error="Your one-time password must be 6 characters."
					disabled={state.props.disabled}
				>
					<Input placeholder="Placeholder" leftIcon={<Plus />} rightIcon={<Plus />} {...state.props} />
				</Field>
			))}
		</div>
	);
}
