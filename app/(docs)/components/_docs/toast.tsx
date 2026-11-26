import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, Guidelines, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "behavior", title: "Behavior" },
	{ id: "api", title: "API" },
	{ id: "guidelines", title: "Guidelines" },
];

const USAGE = `"use client";
import { useAppToast } from "@/shared/ui/ToastContainer";

const toast = useAppToast();

toast.success("Changes saved successfully.");
toast.error("Something went wrong. Please try again.");
toast.success("24 files uploaded.", "Batch upload complete", 8000);`;

export default function ToastDoc() {
	return (
		<>
			<ComponentPreview name="toast-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						{code("<ToastContainer />")}{" "}is already mounted in {code("app/layout.tsx")}; call {code("useAppToast()")}{" "}
						from any Client Component. The API is unchanged from the original template, so existing calls keep
						working.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection
				id="behavior"
				title="Behavior"
				description={
					<>
						Toasts stack in the top-right corner. The bar at the bottom counts down (4s, or 6s for errors), and
						hovering or focusing a toast pauses it so it can be read. Errors are announced immediately to screen
						readers ({code('role="alert"')}); the rest politely. Toasts show above open dialogs. Text uses the 700
						shade of each color for WCAG AA contrast.
					</>
				}
			/>
			<DocSection id="api" title="API">
				<PropsTable
					rows={[
						{ name: "toast.success", type: "(message, title?, duration?) => void", description: "Green. Something finished." },
						{ name: "toast.info", type: "(message, title?, duration?) => void", description: "Blue. Neutral information." },
						{ name: "toast.warning", type: "(message, title?, duration?) => void", description: "Amber. Needs attention, nothing failed." },
						{ name: "toast.error", type: "(message, title?, duration?) => void", description: "Red. Something failed." },
					]}
				/>
			</DocSection>
			<DocSection id="guidelines" title="Guidelines">
				<Guidelines
					dos={["Confirm that an action finished: “Changes saved successfully.”", "Say how to recover from errors: “Please try again.”"]}
					donts={[
						"Don't put actions or links in a toast. It may disappear before the user reaches it.",
						"Don't use toasts for errors in a form field. Show the error on the field.",
					]}
				/>
			</DocSection>
		</>
	);
}
