"use client";

import { Pagination } from "@/shared/ui/Pagination";

const noop = () => {};

export default function PaginationStates() {
	return (
		<div className="flex w-full flex-col gap-6">
			<Pagination page={1} pageSize={20} total={100} onPageChange={noop} onPageSizeChange={noop} />
			<Pagination page={5} pageSize={20} total={100} onPageChange={noop} onPageSizeChange={noop} />
			<Pagination page={1} pageSize={100} total={100} onPageChange={noop} onPageSizeChange={noop} />
			<Pagination page={12} pageSize={10} total={480} onPageChange={noop} />
			<Pagination page={1} pageSize={10} total={0} onPageChange={noop} />
		</div>
	);
}
