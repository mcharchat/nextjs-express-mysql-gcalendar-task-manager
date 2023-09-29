import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Copy, Trash } from "lucide-react";
import { priorities, statuses } from "../data/data";
import { TooltipWithChildren } from "@/app/components/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@/images/png/default-avatar.png";
import { UseSessionHook } from "../hooks/UseSessionHook";
import { TaskSchema } from "../data/schema";
import { CopyEditTaskDialog } from "./CopyEditTaskDialog";
import { DeleteTaskDialog } from "./DeleteTaskDialog";

export const columns: ColumnDef<TaskSchema>[] = [
	/*{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},*/
	{
		accessorKey: "project",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Project
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const project = row?.original?.project;

			return (
				<div className='flex space-x-2'>
					{project && (
						<Badge variant='outline'>
							<span className='max-w-[400px] truncate font-medium'>
								{project.name}
							</span>
						</Badge>
					)}
				</div>
			);
		},
		sortingFn: (rowA, rowB, columnId) => {
			const a = rowA?.original?.project?.name as string;
			const b = rowB?.original?.project?.name as string;

			return a < b ? 1 : a > b ? -1 : 0;
		},
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Title
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const label = row?.original?.label;

			return (
				<div className='flex space-x-2'>
					{label && (
						<Badge
							style={{
								backgroundColor: label.bgColor,
								color: label.textColor,
							}}
						>
							{label.name}
						</Badge>
					)}
					<span className='max-w-[270px] truncate font-medium'>
						{row.getValue("title")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status")
			);

			if (!status) {
				return null;
			}

			return (
				<div className='flex w-[100px] items-center justify-center'>
					{status.icon && (
						<status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "priority",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Priorities
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const priority = priorities.find(
				(priority) => priority.value === row.getValue("priority")
			);

			if (!priority) {
				return null;
			}

			return (
				<div className='flex items-center justify-center'>
					{priority.icon && (
						<priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
					)}
					<span>{priority.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "creator",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Creator
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const creator = row?.original?.creator;

			return (
				<div className='flex justify-center'>
					{creator && (
						<TooltipWithChildren
							tooltipContent={
								<>
									<div className='font-bold'>{creator.name}</div>
									<div className=''>{creator.email}</div>
								</>
							}
						>
							<Avatar className='h-8 w-8'>
								<AvatarImage
									src={creator.picture ?? defaultAvatar.src}
									alt={creator.name ?? "alt"}
								/>
								<AvatarFallback></AvatarFallback>
							</Avatar>
						</TooltipWithChildren>
					)}
				</div>
			);
		},
		sortingFn: (rowA, rowB, columnId) => {
			const a = rowA?.original?.creator?.name as string;
			const b = rowB?.original?.creator?.name as string;

			return a < b ? 1 : a > b ? -1 : 0;
		},
		filterFn: (row, id, value) => {
			return row?.original?.creator?.name.includes(value);
		},
	},
	{
		accessorKey: "startDate",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='min-w-[130px]'
				>
					Start Date
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const startDate = row.getValue("startDate") as string;

			return (
				<div className='flex justify-center'>
					{startDate && <span>{new Date(startDate).toLocaleDateString()}</span>}
				</div>
			);
		},
		sortingFn: (rowA, rowB, columnId) => {
			const a = rowA.getValue("startDate") as string;
			const b = rowB.getValue("startDate") as string;

			return a < b ? 1 : a > b ? -1 : 0;
		},
	},
	{
		accessorKey: "dueDate",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='min-w-[130px]'
				>
					Due Date
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const dueDate = row.getValue("dueDate") as string;

			return (
				<div className='flex justify-center'>
					{dueDate && <span>{new Date(dueDate).toLocaleDateString()}</span>}
				</div>
			);
		},
		sortingFn: (rowA, rowB, columnId) => {
			const a = rowA.getValue("dueDate") as string;
			const b = rowB.getValue("dueDate") as string;

			return a < b ? 1 : a > b ? -1 : 0;
		},
		filterFn: (row, id, value) => {
			const dateValue = new Date(row.getValue(id) as string);
			return dateValue >= value.from && dateValue <= value.to;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const { session } = UseSessionHook();
			const email = session?.user?.email;
			return (
				<div className='flex gap-2 justify-center'>
					<TooltipWithChildren tooltipContent={<div>Copy task</div>}>
						<div>
							<CopyEditTaskDialog task={row?.original} mode='copy'>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<Copy className='h-4 w-4' />
								</Button>
							</CopyEditTaskDialog>
						</div>
					</TooltipWithChildren>
					{row?.original?.creator.email == email && (
						<>
							<TooltipWithChildren tooltipContent={<div>Edit task</div>}>
								<div>
									<CopyEditTaskDialog task={row?.original} mode='edit'>
										<Button variant='ghost' className='h-8 w-8 p-0'>
											<Pencil className='h-4 w-4' />
										</Button>
									</CopyEditTaskDialog>
								</div>
							</TooltipWithChildren>
							<TooltipWithChildren tooltipContent={<div>Delete task</div>}>
								<div>
									<DeleteTaskDialog task={row?.original}>
										<Button variant='ghost' className='h-8 w-8 p-0'>
											<Trash className='h-4 w-4' />
										</Button>
									</DeleteTaskDialog>
								</div>
							</TooltipWithChildren>
						</>
					)}
				</div>
			);
		},
	},
];
