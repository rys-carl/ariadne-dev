// Text styling for simple, static tables inside content.
// For data grids with sorting or pagination, use the Table component (shared/ui/Table).
const ROWS = [
	["Empty", "Overflowing"],
	["Modest", "Satisfied"],
	["Full", "Ecstatic"],
];

export default function TypographyTable() {
	return (
		<div className="w-full max-w-xl overflow-x-auto">
			<table className="w-full text-left text-base leading-6">
				<thead>
					<tr className="bg-text-100">
						<th className="px-4 py-2 font-semibold text-text-900">King&apos;s Treasury</th>
						<th className="px-4 py-2 font-semibold text-text-900">People&apos;s happiness</th>
					</tr>
				</thead>
				<tbody className="text-text-800">
					{ROWS.map(([treasury, happiness]) => (
						<tr key={treasury} className="even:bg-text-50">
							<td className="px-4 py-2">{treasury}</td>
							<td className="px-4 py-2">{happiness}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
