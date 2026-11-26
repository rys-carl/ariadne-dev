import { readFile } from "node:fs/promises";
import path from "node:path";
import { demos, type DemoName } from "../_demos";
import CodeBlock from "./CodeBlock";
import PreviewTabs from "./PreviewTabs";

const DEMO_DIR = path.join(process.cwd(), "app", "(docs)", "components", "_demos");

// Renders a live demo and its real source file side by side, so the Code tab
// can never drift from what the Preview tab shows. Doc pages are statically
// generated, so this file read happens at build time.
export default async function ComponentPreview({ name }: { name: DemoName }) {
	const Demo = demos[name];
	const source = await readFile(path.join(DEMO_DIR, `${name}.tsx`), "utf8");

	return (
		<PreviewTabs
			preview={<Demo />}
			code={<CodeBlock code={source.trim()} title={`${name}.tsx`} />}
		/>
	);
}
