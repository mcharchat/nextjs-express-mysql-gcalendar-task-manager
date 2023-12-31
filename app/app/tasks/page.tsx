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
import { LabelSchema, ProjectSchema, TaskSchema } from "./data/schema";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import { addDays } from "date-fns";

export default function TasksPage() {
	const [loading, setLoading] = React.useState(true);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const [tableData, setTableData] = React.useState<TaskSchema[]>([]);
	const [projects, setProjects] = React.useState<ProjectSchema[]>([]);
	const [labels, setLabels] = React.useState<LabelSchema[]>([]);

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
		axios.get("/api/tasks").then((response) => {
			setTableData(response.data);
			table.getColumn("dueDate")?.setFilterValue({
				from: new Date(),
				to: addDays(new Date(), 60),
			});
			setLoading(false);
		});
		axios.get("/api/projects").then((response) => {
			setProjects(response.data);
		});
		axios.get("/api/labels").then((response) => {
			setLabels(response.data);
		});
	}, []);

	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-8'>
			<Toolbar table={table} projects={projects} labels={labels} />
			<DataTable table={table} loading={loading} columns={columns} />
			<Footer table={table} />
		</div>
	);
}
