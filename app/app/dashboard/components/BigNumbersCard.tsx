"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function BigNumbersCard({
	title,
	icon,
	value,
}: {
	title: string;
	icon: string;
	value: number | null;
}) {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				<Icon icon={icon} className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				{value === null ? (
					<Skeleton className='h-8 w-[100px]' />
				) : (
					<div className='text-2xl font-bold'>{value.toLocaleString()}</div>
				)}
			</CardContent>
		</Card>
	);
}

export default BigNumbersCard;
