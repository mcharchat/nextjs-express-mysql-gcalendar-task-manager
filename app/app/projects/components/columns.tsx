import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { TooltipWithChildren } from "@/app/components/tooltip";
import { ProjectSchema } from "../data/schema";
import { CopyEditProjectDialog } from "./CopyEditProjectDialog";
import { DeleteProjectDialog } from "./DeleteProjectDialog";

export const columns: ColumnDef<ProjectSchema>[] = [
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
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[270px] truncate font-medium'>
						{row.getValue("name")}
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<div className='flex gap-2 justify-center'>
					<TooltipWithChildren tooltipContent={<div>Edit project</div>}>
						<div>
							<CopyEditProjectDialog project={row?.original} mode='edit'>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<Pencil className='h-4 w-4' />
								</Button>
							</CopyEditProjectDialog>
						</div>
					</TooltipWithChildren>
					<TooltipWithChildren tooltipContent={<div>Delete project</div>}>
						<div>
							<DeleteProjectDialog project={row?.original}>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<Trash className='h-4 w-4' />
								</Button>
							</DeleteProjectDialog>
						</div>
					</TooltipWithChildren>
				</div>
			);
		},
	},
];
