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
import { ProjectSchema } from "./data/schema";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";

export default function ProjectsPage() {
	const [loading, setLoading] = React.useState(true);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const [tableData, setTableData] = React.useState<ProjectSchema[]>([]);

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
		axios.get("/api/projects").then((response) => {
			setTableData(response.data);
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
