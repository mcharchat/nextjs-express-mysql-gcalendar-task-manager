import { DatePicker } from "@/app/components/pick-date";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { statuses, priorities } from "../data/data";
import { Badge } from "@/components/ui/badge";
import { LabelSchema, ProjectSchema, TaskSchema } from "../data/schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export function CopyEditTaskDialog({
	children,
	task = null,
	mode,
}: {
	children: React.ReactNode;
	task?: TaskSchema;
	mode: "edit" | "copy";
}) {
	const { toast } = useToast();
	const [thisTask, setThisTask] = React.useState<any>({
		...task,
		startDate: task?.startDate ? new Date(task?.startDate) : null,
		dueDate: task?.dueDate ? new Date(task?.dueDate) : null,
	});

	const [projects, setProjects] = React.useState<ProjectSchema[]>([]);
	const [labels, setLabels] = React.useState<LabelSchema[]>([]);
	const [openPlusTaskDialog, setOpenPlusTaskDialog] =
		React.useState<boolean>(false);

	React.useEffect(() => {
		if (openPlusTaskDialog) {
			axios.get("/api/projects").then((response) => {
				setProjects(response.data);
			});
			axios.get("/api/labels").then((response) => {
				setLabels(response.data);
			});
		}
	}, [openPlusTaskDialog]);

	const validateFields = new Promise((resolve, reject) => {
		if (
			thisTask?.title &&
			thisTask?.startDate &&
			thisTask?.dueDate &&
			thisTask?.priority &&
			thisTask?.status
		) {
			resolve(true);
		} else {
			const emptyFields = [];
			if (!thisTask?.title) emptyFields.push("Title");
			if (!thisTask?.startDate) emptyFields.push("Start Date");
			if (!thisTask?.dueDate) emptyFields.push("Due Date");
			if (!thisTask?.priority) emptyFields.push("Priority");
			if (!thisTask?.status) emptyFields.push("Status");
			reject(emptyFields);
		}
	});

	const validateDates = new Promise((resolve, reject) => {
		if (!thisTask?.startDate || !thisTask?.dueDate) {
			reject("Start Date and Due Date are required");
		} else if (thisTask?.startDate <= thisTask?.dueDate) {
			resolve(true);
		} else {
			reject("Start Date cannot be greater than Due Date");
		}
	});

	const copyEditTask = async () => {
		await validateFields.catch((error) => {
			toast({
				title: "Error",
				description:
					"Please fill all the following required fields: " + error.join(", "),
			});
		});
		await validateDates.catch((error: string) => {
			toast({
				title: "Error",
				description: error,
			});
		});
		if (mode === "copy") {
			await axios
				.post(`/api/tasks`, thisTask)
				.then((response) => {
					toast({
						title: "Task Copied",
						description: `Task "${thisTask?.title}" has been copied. Wait for the page to reload.`,
					});
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				})
				.catch((error) => {
					toast({
						title: "Error",
						description: `Task "${thisTask?.title}" has not been copied. Please try again.`,
					});
				});
		} else if (mode === "edit") {
			await axios
				.put(`/api/tasks/${thisTask?.id}`, thisTask)
				.then((response) => {
					toast({
						title: "Task Edited",
						description: `Task "${thisTask?.title}" has been edited. Wait for the page to reload.`,
					});
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				})
				.catch((error) => {
					toast({
						title: "Error",
						description: `Task "${thisTask?.title}" has not been edited. Please try again.`,
					});
				});
		}
	};

	return (
		<Dialog open={openPlusTaskDialog} onOpenChange={setOpenPlusTaskDialog}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Task
					</DialogTitle>
					<DialogDescription>Here you can {mode} a task.</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Project
						</Label>
						<Select
							defaultValue={thisTask?.project?.id}
							onValueChange={(e) =>
								setThisTask({ ...thisTask, project: e as any } as any)
							}
						>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select a Project' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Projects</SelectLabel>
									{projects.map((project: any, index: number) => (
										<SelectItem value={project.id} key={index}>
											<div className='flex gap-2 items-center'>
												<Badge variant='outline'>
													<span className='max-w-[400px] truncate font-medium'>
														{project.name}
													</span>
												</Badge>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Title</Label>
						<Input
							defaultValue={thisTask?.title}
							className='col-span-3'
							onChange={(e) =>
								setThisTask({ ...thisTask, title: e.target.value } as any)
							}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Description</Label>
						<Textarea
							defaultValue={thisTask?.description}
							className='col-span-3'
							onChange={(e) =>
								setThisTask({
									...thisTask,
									description: e.target.value,
								} as any)
							}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Start Date</Label>
						<DatePicker
							date={thisTask?.startDate as any}
							setDate={(e) =>
								setThisTask({ ...thisTask, startDate: e as any } as any)
							}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Due Date</Label>
						<DatePicker
							date={thisTask?.dueDate as any}
							setDate={(e) =>
								setThisTask({ ...thisTask, dueDate: e as any } as any)
							}
							minIsToday={true}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Priority</Label>
						<Select
							defaultValue={thisTask?.priority}
							onValueChange={(e) =>
								setThisTask({ ...thisTask, priority: e as any } as any)
							}
						>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select a Priority' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Priorities</SelectLabel>
									{priorities.map((priority, index) => (
										<SelectItem value={priority.value} key={index}>
											<div className='flex gap-2 items-center'>
												<priority.icon className='h-4 w-4' />
												<span>{priority.label}</span>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Status</Label>
						<Select
							defaultValue={thisTask?.status}
							onValueChange={(e) =>
								setThisTask({ ...thisTask, status: e as any } as any)
							}
						>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select a Status' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Statuses</SelectLabel>
									{statuses.map((status, index) => (
										<SelectItem value={status.value} key={index}>
											<div className='flex gap-2 items-center'>
												<status.icon className='h-4 w-4' />
												<span>{status.label}</span>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Label</Label>
						<Select
							defaultValue={thisTask?.label?.id}
							onValueChange={(e) =>
								setThisTask({ ...thisTask, label: e as any } as any)
							}
						>
							<SelectTrigger className='col-span-3'>
								<SelectValue placeholder='Select a Label' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Labels</SelectLabel>
									{labels.map((label: any, index: number) => (
										<SelectItem value={label.id} key={index}>
											<div className='flex gap-2 items-center'>
												<Badge
													style={{
														backgroundColor: label.bgColor,
														color: label.textColor,
													}}
												>
													{label.name}
												</Badge>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button type='submit' onClick={copyEditTask}>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Task
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
