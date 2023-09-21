"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { validate as uuidValidate, v4 as uuidv4, NIL as NIL_UUID } from "uuid";

interface UserSquadFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSquadForm({ className, ...props }: UserSquadFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [squadValue, setSquadValue] = React.useState<string>("");
	const [isSquadValid, setIsSquadValid] = React.useState<boolean>(true);

	async function joinSquad(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		if (uuidValidate(squadValue)) {
			setIsSquadValid(true);
		} else {
			setIsLoading(false);
			setIsSquadValid(false);
		}
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={joinSquad}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='squad'>
							Squad Code
						</Label>
						<Input
							id='squad'
							placeholder={NIL_UUID}
							type='text'
							autoCapitalize='none'
							autoComplete='squad'
							autoCorrect='off'
							disabled={isLoading}
							onChange={(e) => setSquadValue(e.target.value)}
						/>
						{!isSquadValid && (
							<div className='text-red-500 text-sm text-muted-foreground text-center'>
								Please enter a valid squad code
							</div>
						)}
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icon
								icon='prime:spinner'
								width='48'
								height='48'
								className='mr-2 h-4 w-4 animate-spin'
							/>
						)}
						Join Squad
					</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or create a new squad
					</span>
				</div>
			</div>
			<Button
				variant='outline'
				type='button'
				disabled={isLoading}
				onClick={() => {
					setIsLoading(true);
					console.log("clicked");
				}}
			>
				{isLoading && (
					<Icon
						icon='prime:spinner'
						width='48'
						height='48'
						className='mr-2 h-4 w-4 animate-spin'
					/>
				)}
				Create Squad
			</Button>
		</div>
	);
}
