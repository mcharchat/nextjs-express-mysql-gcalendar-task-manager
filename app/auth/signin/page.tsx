
import { UserAuthForm } from "@/app/auth/signin/components/user-auth-form";

export default function AuthenticationPage() {
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
