"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";

interface DataTableDateRangeFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	className?: string;
	title?: string;
}

export function DatePickerWithRange<TData, TValue>({
	className,
	column,
	title,
}: DataTableDateRangeFilterProps<TData, TValue>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 60),
	});

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="flex gap-2 items-center">
					<Label className='text-right text-xs'>
						Filter {title}:
					</Label>
					<Button
						id='date'
						variant={"outline"}
						className={cn(
							"w-[270px] justify-start text-left font-normal",
							!date && "text-muted-foreground",
							className
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Filter {title}</span>
						)}
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					initialFocus
					mode='range'
					defaultMonth={date?.from}
					selected={date}
					onSelect={(e) => {
						setDate(e?.from && e.to ? e : undefined);
						column?.setFilterValue(e?.from && e.to ? e : undefined);
					}}
					numberOfMonths={2}
				/>
			</PopoverContent>
		</Popover>
	);
}
