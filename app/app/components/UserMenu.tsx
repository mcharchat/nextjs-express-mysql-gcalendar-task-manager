"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import defaultAvatar from "@/images/png/default-avatar.png";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

function UserMenu() {
	const { data: session, status } = useSession();
	
	const { setTheme } = useTheme();
	const { push } = useRouter();
	const { toast } = useToast();

	React.useEffect(() => {
		if (status === "unauthenticated") {
			toast({
				title: "Logged out!",
				description: "Wait for a moment while we send you to the login page",
			});
			push("/auth/signin");
		}
	}, [status]);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage
							src={session?.user?.picture ?? defaultAvatar.src}
							alt={session?.user?.name ?? "alt"}
						/>
						<AvatarFallback></AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>
							{session?.user?.name}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{session?.user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger side='left'>
							<span className='relative'>
								<Sun className='mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
								<Moon className='absolute top-0 mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
							</span>
							<span>Theme</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									onClick={() => setTheme("light")}
									className='cursor-pointer'
								>
									<span>Light</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme("dark")}
									className='cursor-pointer'
								>
									<span>Dark</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme("system")}
									className='cursor-pointer'
								>
									<span>System</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserMenu;
