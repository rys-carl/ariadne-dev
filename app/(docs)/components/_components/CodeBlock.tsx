import CopyButton from "./CopyButton";

export default function CodeBlock({ code, title }: { code: string; title?: string }) {
	return (
		<div className="overflow-hidden rounded-xl border border-text-200 bg-text-50">
			<div className="flex h-10 items-center justify-between border-b border-text-200 pl-4 pr-2">
				<span className="font-mono text-xs text-text-500">{title ?? "tsx"}</span>
				<CopyButton value={code} />
			</div>
			<pre className="max-h-[480px] overflow-auto p-4 text-[13px] leading-relaxed">
				<code className="font-mono text-text-800">{code}</code>
			</pre>
		</div>
	);
}
