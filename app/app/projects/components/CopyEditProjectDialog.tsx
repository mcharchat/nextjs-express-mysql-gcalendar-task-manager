import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { ProjectSchema } from "../data/schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export function CopyEditProjectDialog({
	children,
	project = null,
	mode,
}: {
	children: React.ReactNode;
	project?: ProjectSchema;
	mode: "edit";
}) {
	const { toast } = useToast();
	const [thisProject, setThisProject] = React.useState<any>({
		...project,
	});

	const [openPlusProjectDialog, setOpenPlusProjectDialog] =
		React.useState<boolean>(false);

	const validateFields = new Promise((resolve, reject) => {
		if (
			thisProject?.name 
		) {
			resolve(true);
		} else {
			const emptyFields = [];
			if (!thisProject?.name) emptyFields.push("Name");
			reject(emptyFields);
		}
	});

	const copyEditProject = async () => {
		await validateFields.catch((error) => {
			toast({
				title: "Error",
				description:
					"Please fill all the following required fields: " + error.join(", "),
			});
		});
		await axios
			.put(`/api/projects/${thisProject?.id}`, thisProject)
			.then((response) => {
				toast({
					title: "Project Edited",
					description: `Project "${thisProject?.name}" has been edited. Wait for the page to reload.`,
				});
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: `Project "${thisProject?.name}" has not been edited. Please try again.`,
				});
			});
	};

	return (
		<Dialog open={openPlusProjectDialog} onOpenChange={setOpenPlusProjectDialog}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Project
					</DialogTitle>
					<DialogDescription>Here you can {mode} a project.</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Name</Label>
						<Input
							defaultValue={thisProject?.name}
							className='col-span-3'
							onChange={(e) =>
								setThisProject({ ...thisProject, name: e.target.value } as any)
							}
						/>
					</div>
					
				</div>
				<DialogFooter>
					<Button type='submit' onClick={copyEditProject}>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Project
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
