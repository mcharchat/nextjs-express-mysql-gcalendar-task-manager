"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function Home() {
	const { data: session, status } = useSession();
	const { push } = useRouter();

	React.useEffect(() => {
		setTimeout(() => {
			push("/auth/signin");
		}, 1000);
	}, [status]);
	return (
		<div>
			<div className='h-screen flex flex-col items-center justify-center'>
				<Icon
					icon='prime:spinner'
					width='96'
					height='96'
					className={`animate-spin transition-all duration-1000 ${
						status == "loading" ? "opacity-100" : "opacity-0"
					}`}
				/>
			</div>
		</div>
	);
}
