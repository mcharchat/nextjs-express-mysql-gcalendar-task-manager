import { Metadata } from "next";
import { PocketKnife } from "lucide-react";

export const metadata: Metadata = {
	title: "GTaskPro - Authentication",
	description: "GTaskPro - Authentication",
};

export default function AuthenticationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className='container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-5 lg:px-0'>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex col-span-3'>
					<div className='absolute inset-0 bg-zinc-900' />
					<div className='relative z-20 flex items-center text-lg font-medium'>
						<PocketKnife className='mx-2' />
						GTaskPro
					</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<p className='text-lg'>
								&ldquo;The only thing that overcomes hard luck is hard
								work.&rdquo;
							</p>
							<footer className='text-sm'>Harry Golden</footer>
						</blockquote>
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
