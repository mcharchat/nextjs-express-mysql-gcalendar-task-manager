"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Icon } from "@iconify/react";

export default function Home() {
	const { data: session, status } = useSession();

	React.useEffect(() => {
		if (status === "authenticated") {
			setTimeout(() => {
				window.location.href = "/app/dashboard";
			}, 1000);
		}
		if (status === "unauthenticated") {
			setTimeout(() => {
				window.location.href = "/auth/signin";
			}, 1000);
		}
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
