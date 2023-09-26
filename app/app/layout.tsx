import { Metadata } from "next";
import { PocketKnife } from "lucide-react";
import Link from "next/link";
import MenuNav from "./components/MenuNav";
import MenuSidebar from "./components/MenuSidebar";
import UserMenu from "./components/UserMenu";

export const metadata: Metadata = {
	title: "GTaskPro - App",
	description: "GTaskPro - App",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='relative h-screen flex-col'>
				<header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
					<div className='px-8 flex h-14 items-center justify-between'>
						<div className='mr-4 hidden md:flex'>
							<Link
								className='mr-6 flex items-center space-x-2'
								href='/app/dashboard'
							>
								<PocketKnife className='mr-2' />
								GTaskPro
							</Link>
							<MenuNav />
						</div>
						<MenuSidebar />
						<UserMenu />
					</div>
				</header>
				{children}
			</div>
		</>
	);
}
