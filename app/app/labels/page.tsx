"use client";

import * as React from "react";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { columns } from "./components/columns";
import { LabelSchema } from "./data/schema";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";

export default function LabelsPage() {
	const [loading, setLoading] = React.useState(true);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const [tableData, setTableData] = React.useState<LabelSchema[]>([]);

	const table = useReactTable({
		data: tableData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	React.useEffect(() => {
		axios.get("/api/labels").then((response) => {
			setTableData(response.data);
			console.log("🚀 ~ file: page.tsx:55 ~ axios.get ~ response.data:", response.data)
			setLoading(false);
		});
	}, []);

	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-8'>
			<Toolbar table={table} />
			<DataTable table={table} loading={loading} columns={columns} />
			<Footer table={table} />
		</div>
	);
}
