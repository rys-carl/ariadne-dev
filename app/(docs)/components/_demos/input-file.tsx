import { Field } from "@/shared/ui/Field";
import { Input } from "@/shared/ui/Input";

export default function InputFile() {
	return (
		<div className="grid w-full max-w-sm gap-6">
			<Field label="Payroll file" helper="CSV or XLSX, up to 10 MB.">
				<Input type="file" accept=".csv,.xlsx" />
			</Field>
			<Field label="Supporting document" error="Attach a scanned copy of the ID.">
				<Input type="file" accept="image/*,.pdf" />
			</Field>
		</div>
	);
}
