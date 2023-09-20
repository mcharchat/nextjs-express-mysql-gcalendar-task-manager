"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
//import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Button
				variant='outline'
				type='button'
				disabled={isLoading}
				onClick={() => {
					setIsLoading(true);
					console.log("clicked");
				}}
			>
				{isLoading
					? "loading" //<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					: "not loading" //<Icons.google className='mr-2 h-4 w-4' />
				}{" "}
				Google
			</Button>
		</div>
	);
}
