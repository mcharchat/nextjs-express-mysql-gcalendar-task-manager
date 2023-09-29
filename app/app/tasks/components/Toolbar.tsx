import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import { DatePickerWithRange } from './date-range-picker';
import { PlusTaskDialog } from './PlusTaskDialog';
import { Button } from '@/components/ui/button';
import { MixerHorizontalIcon, PlusIcon } from '@radix-ui/react-icons';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { statuses, priorities } from "../data/data";
import { Table } from '@tanstack/react-table';
import { LabelSchema, ProjectSchema, TaskSchema } from '../data/schema';

function Toolbar({
	table,
	projects,
	labels,
}: {
	table: Table<TaskSchema>;
	projects: ProjectSchema[];
	labels: LabelSchema[];
}) {
    const [openPlusTaskDialog, setOpenPlusTaskDialog] = React.useState(false);
	return (
		<div className='flex items-center py-4 flex-wrap gap-2'>
			<div className='flex gap-2 flex-wrap flex-col'>
				<div className='flex gap-2 flex-wrap items-center'>
					<Label className='text-right text-xs'>Filter Title:</Label>
					<Input
						value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("title")?.setFilterValue(event.target.value)
						}
						className='h-8 w-[150px] lg:w-[250px]'
					/>
					<Label className='text-right text-xs'>Filter Creator:</Label>
					<Input
						value={
							(table.getColumn("creator")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn("creator")?.setFilterValue(event.target.value)
						}
						className='h-8 w-[150px] lg:w-[250px]'
					/>
				</div>
				<div className='flex gap-2 flex-wrap items-center'>
					<DatePickerWithRange
						column={table.getColumn("dueDate")}
						title='Due Date'
						className='h-8'
					/>
					{table.getColumn("status") && (
						<DataTableFacetedFilter
							column={table.getColumn("status")}
							title='Status'
							options={statuses}
						/>
					)}
					{table.getColumn("priority") && (
						<DataTableFacetedFilter
							column={table.getColumn("priority")}
							title='Priority'
							options={priorities}
						/>
					)}
				</div>
			</div>
			<div className='ml-auto flex gap-2 flex-wrap'>
				<PlusTaskDialog
					projects={projects}
					labels={labels}
					openPlusTaskDialog={openPlusTaskDialog}
                    setOpenPlusTaskDialog={setOpenPlusTaskDialog}
                    mode='add'
				>
					<Button size='sm' className='h-8 flex'>
						<PlusIcon className='mr-2 h-4 w-4' />
						Add task
					</Button>
				</PlusTaskDialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm' className='h-8 flex'>
							<MixerHorizontalIcon className='mr-2 h-4 w-4' />
							View
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id
											.replace(/([A-Z])/g, " $1")
											.replace(/^./, function (match) {
												return match.toUpperCase();
											})}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

export default Toolbar