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

const priorityIcons = {
	low: <ArrowDownIcon className='h-4 w-4' />,
	medium: <ArrowRightIcon className='h-4 w-4' />,
	high: <ArrowUpIcon className='h-4 w-4' />,
};

const statusesIcons = {
	backlog: <QuestionMarkCircledIcon className='h-4 w-4' />,
	todo: <CircleIcon className='h-4 w-4' />,
	"in progress": <StopwatchIcon className='h-4 w-4' />,
	done: <CheckCircledIcon className='h-4 w-4' />,
	canceled: <CrossCircledIcon className='h-4 w-4' />,
};

export function NextTasks({ nextTasksData }: { nextTasksData: any }) {
	const [sort, setSort] = React.useState({
		key: "dueDate",
		order: "asc",
	});

	const sortBy = (key: string) => {
		setSort((prev) => ({
			key,
			order: prev.key === key ? (prev.order === "asc" ? "desc" : "asc") : "asc",
		}));
	};

	const sortNextTasksData = () => {
		nextTasksData.sort((a: any, b: any) => {
			const sortOrder = sort.order === "asc" ? 1 : -1;
			return sortOrder * (a[sort.key] > b[sort.key] ? 1 : -1);
		});
	};

	React.useEffect(() => {
		sortNextTasksData();
	}, [sort.key, sort.order]);

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
					<TableRow key={task.id}>
						<TableCell className='font-medium'>{task.title}</TableCell>
						<TableCell>
							<div className='flex space-x-2 items-center'>
								{
									statusesIcons[
										task.status as
											| "backlog"
											| "todo"
											| "in progress"
											| "done"
											| "canceled"
									]
								}
								<div>
									{task.status.charAt(0).toUpperCase() + task.status.slice(1)}
								</div>
							</div>
						</TableCell>
						<TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
						<TableCell>
							<div className='flex space-x-2 items-center'>
								{priorityIcons[task.priority as "low" | "medium" | "high"]}
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
