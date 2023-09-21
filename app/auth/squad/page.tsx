
import { UserSquadForm } from "@/app/auth/squad/components/user-squad-form";

export default function AuthenticationPage() {
	return (
		<>
			<div className='lg:p-8 col-span-2'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							{"You are new here!"}
						</h1>
						<p className='text-sm text-muted-foreground'>
							If you have a squad code, enter it below to join your squad.
						</p>
					</div>
					<UserSquadForm />
				</div>
			</div>
		</>
	);
}
