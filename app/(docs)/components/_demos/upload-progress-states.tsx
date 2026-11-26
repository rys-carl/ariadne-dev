import { UploadProgress } from "@/shared/ui/UploadProgress";

const noop = undefined;

export default function UploadProgressStates() {
	return (
		<div className="flex w-full flex-col items-center gap-4">
			<UploadProgress status="uploading" progress={50} totalFiles={24} uploadedFiles={12} timeRemaining="about 2 min left" />
			<UploadProgress status="complete" progress={100} totalFiles={24} uploadedFiles={24} />
			<UploadProgress status="failed" progress={38} totalFiles={24} uploadedFiles={9} failedFiles={3} onRetry={noop} />
			<div className="flex flex-wrap justify-center gap-4">
				<UploadProgress status="uploading" progress={40} totalFiles={3} uploadedFiles={1} defaultMinimized />
				<UploadProgress status="complete" progress={100} totalFiles={3} uploadedFiles={3} defaultMinimized />
				<UploadProgress status="failed" progress={30} totalFiles={2} uploadedFiles={0} defaultMinimized />
			</div>
		</div>
	);
}
