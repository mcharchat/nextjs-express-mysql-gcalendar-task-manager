"use client";
import React from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, PocketKnife } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import pages from "./pages.json";
import { Icon } from "@iconify/react";

function MenuSidebar() {
	const path = usePathname();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					className='inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
					type='button'
					aria-haspopup='dialog'
					aria-expanded='false'
					aria-controls='radix-:R15hja:'
					data-state='closed'
				>
					<Menu />
					<span className='sr-only'>Toggle Menu</span>
				</button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle className='flex justify-center py-10'>
						<Link
							className='mr-6 flex items-center space-x-2'
							href='/app/dashboard'
						>
							<PocketKnife className='mx-2' />
							GTaskPro
						</Link>
					</SheetTitle>
					<Separator className='my-4' />
					<div className='text-sm text-muted-foreground p-4'>
						<ScrollArea>
							<div className='flex flex-col items-start space-y-6 text-sm font-medium'>
								{pages.map((page, key) => (
									<Link
										key={key}
										href={page.href}
										className={`flex flex-row transition-colors hover:text-foreground/80 text-foreground${
											path === page.href
												? " underline underline-offset-4"
												: "/60"
										}`}
									>
										{page.icon && (
											<Icon icon={page.icon} className='w-5 h-5 mr-4' />
										)}
										{page.name}
									</Link>
								))}
							</div>
						</ScrollArea>
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}

export default MenuSidebar;
