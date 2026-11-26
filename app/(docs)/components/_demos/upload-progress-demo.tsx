"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { UploadProgress, type UploadStatus } from "@/shared/ui/UploadProgress";

const TOTAL = 24;

// Simulated upload. In a real app, progress comes from your upload code.
export default function UploadProgressDemo() {
	const [run, setRun] = useState(0);
	const [uploaded, setUploaded] = useState(0);
	const [status, setStatus] = useState<UploadStatus>("uploading");
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (status !== "uploading") return;
		const timer = setInterval(() => {
			setUploaded((n) => {
				const next = Math.min(TOTAL, n + 1);
				if (next === TOTAL) setStatus("complete");
				return next;
			});
		}, 400);
		return () => clearInterval(timer);
	}, [status, run]);

	const restart = () => {
		setUploaded(0);
		setStatus("uploading");
		setVisible(true);
		setRun((r) => r + 1);
	};

	return (
		<div className="flex w-full flex-col items-center gap-4">
			{visible ? (
				<UploadProgress
					status={status}
					progress={(uploaded / TOTAL) * 100}
					totalFiles={TOTAL}
					uploadedFiles={uploaded}
					failedFiles={status === "failed" ? TOTAL - uploaded : 0}
					timeRemaining={`about ${Math.ceil(((TOTAL - uploaded) * 0.4) / 60) || 1} min left`}
					onCancel={() => setStatus("failed")}
					onRetry={() => setStatus("uploading")}
					onClose={() => setVisible(false)}
				/>
			) : (
				<p className="text-sm text-text-500">Card closed.</p>
			)}
			<Button size="sm" variant="neutral" onClick={restart}>
				Restart upload
			</Button>
		</div>
	);
}
