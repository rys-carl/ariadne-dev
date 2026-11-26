import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "countries", title: "Countries" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { Field } from "@/shared/ui/Field";
import { PhoneInput } from "@/shared/ui/PhoneInput";

<Field label="Mobile number">
  <PhoneInput
    value={digits}
    onValueChange={(digits, { e164 }) => {
      setDigits(digits);   // "9171234567"
      setPhone(e164);      // "+639171234567"
    }}
  />
</Field>`;

const COUNTRIES = `import { COUNTRIES, PhoneInput, type Country } from "@/shared/ui/PhoneInput";

const countries: Country[] = [
  ...COUNTRIES,
  { code: "SA", name: "Saudi Arabia", dial: "966", mask: "##-###-####" },
];

<PhoneInput countries={countries} />`;

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export default function PhoneInputDoc() {
	return (
		<>
			<ComponentPreview name="phone-input-demo" />

			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						The field formats the number as the user types and strips the leading 0 people habitually type (0917…).
						Store the {code("e164")}{" "}value; it&apos;s the format SMS gateways and APIs expect.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>

			<DocSection id="states" title="States">
				<ComponentPreview name="phone-input-states" />
			</DocSection>

			<DocSection
				id="countries"
				title="Countries"
				description={
					<>
						Ships with the Philippines (default) and common destinations: US, Singapore, Hong Kong, Japan and the
						UAE. Pass {code("countries")}{" "}to change the list. A country without a built-in flag shows a gray dot.
					</>
				}
			>
				<CodeBlock code={COUNTRIES} title="Custom countries" />
			</DocSection>

			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "value", type: "string", description: "National number, digits only. Controlled." },
						{ name: "defaultValue", type: "string", description: "Initial digits when uncontrolled." },
						{
							name: "onValueChange",
							type: "(digits, { e164, country }) => void",
							description: "Called on every change.",
						},
						{ name: "country", type: "string", description: "Selected country code. Controlled." },
						{ name: "defaultCountry", type: "string", default: '"PH"', description: "Initial country when uncontrolled." },
						{ name: "onCountryChange", type: "(country) => void", description: "Called when the country changes." },
						{ name: "countries", type: "Country[]", default: "COUNTRIES", description: "Countries in the picker." },
						{ name: "invalid", type: "boolean", description: "Error state. Inherited from Field when left out." },
					]}
				/>
			</DocSection>
		</>
	);
}
