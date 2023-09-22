"use client";

import * as React from "react";
import { useSession, signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { data: session } = useSession();

	React.useEffect(() => {
		if (session) {
			setIsLoading(false);
		}
	}, [session]);

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Button
				variant='outline'
				type='button'
				disabled={isLoading}
				onClick={() => {
					signIn();
					setIsLoading(true);
					console.log("clicked");
				}}
			>
				{isLoading ? (
					<Icon
						icon='prime:spinner'
						width='48'
						height='48'
						className='mr-2 h-4 w-4 animate-spin'
					/>
				) : (
					<Icon icon='flat-color-icons:google' className='mr-2 h-4 w-4' />
				)}{" "}
				Google
			</Button>
		</div>
	);
}
