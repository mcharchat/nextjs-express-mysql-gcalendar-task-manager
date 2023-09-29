import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { TooltipWithChildren } from "@/app/components/tooltip";
import { LabelSchema } from "../data/schema";
import { CopyEditLabelDialog } from "./CopyEditLabelDialog";
import { DeleteLabelDialog } from "./DeleteLabelDialog";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<LabelSchema>[] = [
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
						<Badge
							style={{
								backgroundColor: row.original?.bgColor,
								color: row.original?.textColor,
							}}
						>
							{row.getValue('name')}
						</Badge>
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
					<TooltipWithChildren tooltipContent={<div>Edit label</div>}>
						<div>
							<CopyEditLabelDialog label={row?.original} mode='edit'>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<Pencil className='h-4 w-4' />
								</Button>
							</CopyEditLabelDialog>
						</div>
					</TooltipWithChildren>
					<TooltipWithChildren tooltipContent={<div>Delete label</div>}>
						<div>
							<DeleteLabelDialog label={row?.original}>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<Trash className='h-4 w-4' />
								</Button>
							</DeleteLabelDialog>
						</div>
					</TooltipWithChildren>
				</div>
			);
		},
	},
];
