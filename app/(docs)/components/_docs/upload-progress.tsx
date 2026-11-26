import ComponentPreview from "../_components/ComponentPreview";
import CodeBlock from "../_components/CodeBlock";
import { DocSection, PropsTable, type TocItem } from "../_components/DocPrimitives";

const code = (text: string) => <code className="font-mono text-sm">{text}</code>;

export const toc: TocItem[] = [
	{ id: "usage", title: "Usage" },
	{ id: "states", title: "States" },
	{ id: "props", title: "Props" },
];

const USAGE = `import { UploadProgress } from "@/shared/ui/UploadProgress";

<UploadProgress
  status="uploading"            // "uploading" | "complete" | "failed"
  progress={50}
  totalFiles={24}
  uploadedFiles={12}
  timeRemaining="about 2 min left"
  onCancel={cancelUpload}
  onRetry={retryUpload}
  onClose={hideCard}
/>`;

export default function UploadProgressDoc() {
	return (
		<>
			<ComponentPreview name="upload-progress-demo" />
			<DocSection
				id="usage"
				title="Usage"
				description={
					<>
						Shows batch upload status. It&apos;s presentational: your upload code owns the progress and passes it in.
						The ⤡ button switches between the full card and the minimized chip, and the chevron hides the details.
						Typically placed fixed in a corner, e.g. {code("className=\"fixed bottom-6 right-6 z-40\"")}.
					</>
				}
			>
				<CodeBlock code={USAGE} title="Usage" />
			</DocSection>
			<DocSection id="states" title="States" description="Uploading, complete and failed, full and minimized, as in the spec.">
				<ComponentPreview name="upload-progress-states" />
			</DocSection>
			<DocSection id="props" title="Props">
				<PropsTable
					rows={[
						{ name: "status", type: '"uploading" | "complete" | "failed"', description: "Sets the colors, title and captions." },
						{ name: "progress", type: "number", description: "0–100." },
						{ name: "totalFiles / uploadedFiles", type: "number", description: "Shown as “12 of 24 files”." },
						{ name: "failedFiles", type: "number", description: "Shown when failed: “3 failed”." },
						{ name: "timeRemaining", type: "string", description: "Shown while uploading: “about 2 min left”." },
						{ name: "title", type: "ReactNode", description: "Overrides the default title for the status." },
						{ name: "onCancel", type: "() => void", description: "Shows the cancel (⊗) button while uploading." },
						{ name: "onRetry", type: "() => void", description: "Shows the retry button when failed." },
						{ name: "onClose", type: "() => void", description: "Shows the × button." },
						{ name: "minimized / defaultMinimized / onMinimizedChange", type: "boolean / boolean / (v) => void", description: "Full card or chip." },
					]}
				/>
			</DocSection>
		</>
	);
}
