import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import { PlusLabelDialog } from './PlusLabelDialog';
import { Button } from '@/components/ui/button';
import { MixerHorizontalIcon, PlusIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { LabelSchema } from '../data/schema';

function Toolbar({
	table,
}: {
	table: Table<LabelSchema>;
}) {
    const [openPlusLabelDialog, setOpenPlusLabelDialog] = React.useState(false);
	return (
		<div className='flex items-center py-4 flex-wrap gap-2'>
			<div className='flex gap-2 flex-wrap flex-col'>
				<div className='flex gap-2 flex-wrap items-center'>
					<Label className='text-right text-xs'>Filter Name:</Label>
					<Input
						value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("name")?.setFilterValue(event.target.value)
						}
						className='h-8 w-[150px] lg:w-[250px]'
					/>
				</div>
			</div>
			<div className='ml-auto flex gap-2 flex-wrap'>
				<PlusLabelDialog
					openPlusLabelDialog={openPlusLabelDialog}
                    setOpenPlusLabelDialog={setOpenPlusLabelDialog}
                    mode='add'
				>
					<Button size='sm' className='h-8 flex'>
						<PlusIcon className='mr-2 h-4 w-4' />
						Add label
					</Button>
				</PlusLabelDialog>
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