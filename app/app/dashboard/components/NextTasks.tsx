import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	CheckCircledIcon,
	CircleIcon,
	CrossCircledIcon,
	QuestionMarkCircledIcon,
	StopwatchIcon,
} from "@radix-ui/react-icons";
import React from "react";

const statuses = [
	{
		value: "backlog",
		icon: <QuestionMarkCircledIcon className='h-4 w-4' />,
	},
	{
		value: "todo",
		icon: <CircleIcon className='h-4 w-4' />,
	},
	{
		value: "in progress",
		icon: <StopwatchIcon className='h-4 w-4' />,
	},
	{
		value: "done",
		icon: <CheckCircledIcon className='h-4 w-4' />,
	},
	{
		value: "canceled",
		icon: <CrossCircledIcon className='h-4 w-4' />,
	},
];

const priorities = [
	{
		value: "low",
		icon: <ArrowDownIcon className='h-4 w-4' />,
	},
	{
		value: "medium",
		icon: <ArrowRightIcon className='h-4 w-4' />,
	},
	{
		value: "high",
		icon: <ArrowUpIcon className='h-4 w-4' />,
	},
];

export function NextTasks({ nextTasksData }: { nextTasksData: any }) {
	const [sort, setSort] = React.useState({
		key: "dueDate",
		order: "asc",
	});

	const sortBy = (key: string) => {
		if (sort.key === key) {
			setSort((prev) => ({
				...prev,
				order: prev.order === "asc" ? "desc" : "asc",
			}));
		} else {
			setSort({
				key,
				order: "asc",
			});
		}
	};

	React.useEffect(() => {
		nextTasksData.sort((a: any, b: any) => {
			if (sort.order === "asc") {
				return a[sort.key] > b[sort.key] ? 1 : -1;
			} else {
				return a[sort.key] < b[sort.key] ? 1 : -1;
			}
		});
	}, [sort]);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead onClick={() => sortBy("title")} className='cursor-pointer'>
						<div className='flex space-x-2 items-center'>
							<span>Title</span>
							{sort.key === "title" && (
								<ArrowDownIcon
									className={`h-4 w-4 transition-all ${
										sort.order === "asc" ? "" : "rotate-180"
									}`}
								/>
							)}
						</div>
					</TableHead>
					<TableHead
						onClick={() => sortBy("status")}
						className='cursor-pointer'
					>
						<div className='flex space-x-2 items-center'>
							<span>Status</span>
							{sort.key === "status" && (
								<ArrowDownIcon
									className={`h-4 w-4 transition-all ${
										sort.order === "asc" ? "" : "rotate-180"
									}`}
								/>
							)}
						</div>
					</TableHead>
					<TableHead
						onClick={() => sortBy("dueDate")}
						className='cursor-pointer'
					>
						<div className='flex space-x-2 items-center'>
							<span>Due Date</span>
							{sort.key === "dueDate" && (
								<ArrowDownIcon
									className={`h-4 w-4 transition-all ${
										sort.order === "asc" ? "" : "rotate-180"
									}`}
								/>
							)}
						</div>
					</TableHead>
					<TableHead
						onClick={() => sortBy("priority")}
						className='cursor-pointer'
					>
						<div className='flex space-x-2 items-center'>
							<span>Priority</span>
							{sort.key === "priority" && (
								<ArrowDownIcon
									className={`h-4 w-4 transition-all ${
										sort.order === "asc" ? "" : "rotate-180"
									}`}
								/>
							)}
						</div>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{nextTasksData.map((task: any) => (
					<TableRow key={task.GCalendarEventId}>
						<TableCell className='font-medium'>{task.title}</TableCell>
						<TableCell>
							<div className='flex space-x-2 items-center'>
								{statuses
									.filter((status) => status.value === task.status)
									.map((status) => status.icon)}
								<div>
									{task.status.charAt(0).toUpperCase() + task.status.slice(1)}
								</div>
							</div>
						</TableCell>
						<TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
						<TableCell>
							<div className='flex space-x-2 items-center'>
								{priorities
									.filter((priority) => priority.value === task.priority)
									.map((priority) => priority.icon)}
								<div>
									{task.priority.charAt(0).toUpperCase() +
										task.priority.slice(1)}
								</div>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
