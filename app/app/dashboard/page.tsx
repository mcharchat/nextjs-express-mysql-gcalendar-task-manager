"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BigNumbersCard from "./components/BigNumbersCard";
import { Overview } from "./components/Overview";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { TooltipWithChildren } from "@/app/components/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { NextTasks } from "./components/NextTasks";
import { ArrowDownToLine } from "lucide-react";

export default function DashboardPage() {
	const { toast } = useToast();
	const [loading, setLoading] = React.useState<boolean>(true);
	const [bigNumbersData, setBigNumbersData] = React.useState<
		{ title: string; type: string; icon: string; value: number | null }[]
	>([
		{
			title: "In progress tasks",
			type: "in progress",
			icon: "lucide:activity",
			value: null,
		},
		{
			title: "Todo tasks",
			type: "todo",
			icon: "lucide:clipboard-list",
			value: null,
		},
		{
			title: "Done tasks",
			type: "done",
			icon: "lucide:beer",
			value: null,
		},
		{
			title: "Backlog tasks",
			type: "backlog",
			icon: "lucide:angry",
			value: null,
		},
	]);

	const [squadCode, setSquadCode] = React.useState<string | null>(null);
	const [overViewData, setOverViewData] = React.useState<{
		myData: { name: string; type: string; value: number; group: string }[];
		allData: { name: string; type: string; value: number; group: string }[];
	} | null>(null);
	const [nextTasksData, setNextTasksData] = React.useState(null);
	const dashRef = useRef(null);

	// get data from /api/dashboard using axios
	React.useEffect(() => {
		axios.get("/api/dashboard").then((res) => {
			setLoading(false);
			setSquadCode(res.data.squadCode);
			setBigNumbersData((prev) => {
				return prev.map((item) => {
					return {
						...item,
						value:
							res.data.bigNumbersData.filter(
								(i: { type: string; value: number }) => i.type === item.type
							)[0]?.value || 0,
					};
				});
			});
			setOverViewData(res.data.overviewData);
			setNextTasksData(res.data.myTasksForThisWeek);
		});
	}, []);

	const copySquadCodeToClipBoard = () => {
		navigator.clipboard.writeText(squadCode as string);
		toast({ title: "Squad code copied to clipboard" });
	};

	const captureImage = () => {
		html2canvas(dashRef.current as unknown as HTMLElement).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const a = document.createElement("a");
			a.href = imgData;
			a.download = "GTaskPro - Dashboard.png";
			a.click();
			a.remove();
		});
	};

	return (
		<>
			<div className='flex-col flex' ref={dashRef}>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<div className='flex items-center justify-between space-y-2'>
						<div className='flex flex-col'>
							<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
							<div className='text-sm text-muted-foreground flex items-center space-x-2'>
								<span className='font-bold'>Squad code:</span>
								{loading ? (
									<Skeleton className='h-[40px] w-[250px]' />
								) : (
									<TooltipWithChildren
										tooltipContent={
											<div className='font-bold'>
												Click to copy to clipboard
											</div>
										}
									>
										<Button
											variant='ghost'
											onClick={() => copySquadCodeToClipBoard()}
										>
											{squadCode}
										</Button>
									</TooltipWithChildren>
								)}
							</div>
						</div>
						<TooltipWithChildren
							tooltipContent={
								<div className='font-bold'>Download the dashboard</div>
							}
						>
							<Button variant='ghost' onClick={captureImage}>
								<ArrowDownToLine className='h-4 w-4' />
							</Button>
						</TooltipWithChildren>
					</div>
					<div className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4'>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							{bigNumbersData.map((item, index) => (
								<BigNumbersCard
									key={index}
									title={item.title}
									icon={item.icon}
									value={item.value}
								/>
							))}
						</div>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-8'>
							<Card className='col-span-4'>
								<CardHeader>
									<CardTitle>Overview</CardTitle>
									<CardDescription>Tasks comparison.</CardDescription>
								</CardHeader>
								<CardContent className='px-0'>
									{loading ? (
										<div className='px-6'>
											<Skeleton className='h-64 w-[100%]'></Skeleton>
										</div>
									) : (
										<Overview overViewData={overViewData} />
									)}
								</CardContent>
							</Card>
							<Card className='col-span-4'>
								<CardHeader>
									<CardTitle>My next tasks</CardTitle>
									<CardDescription>
										In progress + todo tasks for this week.
									</CardDescription>
								</CardHeader>
								<CardContent className='px-0'>
									{loading ? (
										<div className='px-6'>
											<Skeleton className='h-64 w-[100%]'></Skeleton>
										</div>
									) : (
										<NextTasks nextTasksData={nextTasksData} />
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
