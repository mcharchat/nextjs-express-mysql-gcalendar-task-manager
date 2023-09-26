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
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function UserMenu() {
	const { data: session, status } = useSession();
	const [picture, setPicture] = React.useState<string | undefined>(
		defaultAvatar.src
	);
	const [alt, setAlt] = React.useState<string | undefined | null>("alt");
	const { setTheme } = useTheme();
	const { push } = useRouter();
	const { toast } = useToast();

	React.useEffect(() => {
		if (session?.user?.picture) {
			setPicture(session?.user?.picture);
			setAlt(session?.user?.name);
		}
	}, [session]);

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
				<Avatar className='cursor-pointer'>
					<AvatarImage src={picture as string} alt={alt as string} />
					<AvatarFallback></AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger side="left">
							<SunMoon className='mr-2 h-4 w-4' />
							<span>Theme</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem onClick={() => setTheme("light")} className='cursor-pointer'>
									<span>Light</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")} className='cursor-pointer'>
									<span>Dark</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")} className='cursor-pointer'>
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
