"use client";
import { UserAuthForm } from "@/app/auth/signin/components/user-auth-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function AuthenticationPage() {
	const { data: session, status } = useSession();
	const { push } = useRouter();
	const { toast } = useToast();

	const checkMe = async () => {
		const response = await axios.post("/api/users/me");
		const { data } = response;
		if (data) {
			toast({
				title: "Welcome back!",
				description: "You have successfully logged in",
			});
			push("/app/dashboard");
		} else {
			toast({
				title: "Welcome aboard!",
				description: "Now, let's get you started with your squad",
			});
			push("/auth/squad");
		}
	};

	React.useEffect(() => {
		if (status === "authenticated") {
			checkMe();
		}
	}, [status]);
	return (
		<>
			<div className='lg:p-8 col-span-2'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							{"Let's get started!"}
						</h1>
						<p className='text-sm text-muted-foreground'>
							Sign In using your Google account
						</p>
					</div>
					<UserAuthForm />
				</div>
			</div>
		</>
	);
}
