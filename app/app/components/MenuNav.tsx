"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import pages from "./pages.json";

function MenuNav() {
	const path = usePathname();

	return (
		<nav className='flex items-center space-x-6 text-sm font-medium'>
			{pages.map((page, key) => (
				<Link
					key={key}
					href={page.href}
					className={`transition-colors hover:text-foreground/80 text-foreground${
						path === page.href ? " underline underline-offset-4" : "/60"
					}`}
				>
					{page.name}
				</Link>
			))}
		</nav>
	);
}

export default MenuNav;
