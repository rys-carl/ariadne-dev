"use client";

import { useState } from "react";
import { Pagination } from "@/shared/ui/Pagination";

export default function PaginationDemo() {
	const [page, setPage] = useState(4);
	const [pageSize, setPageSize] = useState(10);

	return (
		<Pagination
			className="w-full"
			page={page}
			pageSize={pageSize}
			total={100}
			onPageChange={setPage}
			onPageSizeChange={setPageSize}
		/>
	);
}
