import { Breadcrumb } from "@/shared/ui/Breadcrumb";

export default function BreadcrumbDemo() {
	return (
		<div className="flex flex-col items-start gap-10 text-left">
			{/* Title + text "Home": the pattern used for page headings. */}
			<Breadcrumb title="UI Components" titleAs="p" homeLabel="Home" items={[{ label: "UI Components" }]} />

			{/* Trail only, with the house icon, as inside AppHeader. */}
			<Breadcrumb
				items={[
					{ label: "Parent", href: "/components" },
					{ label: "Section" },
					{ label: "Tab 1" },
				]}
			/>
		</div>
	);
}
