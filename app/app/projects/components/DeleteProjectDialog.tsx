import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProjectSchema } from "../data/schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export function DeleteProjectDialog({
	children,
	project,
}: {
	children: React.ReactNode;
	project: ProjectSchema;
}) {
	const { toast } = useToast();
	const deleteProject = async () => {
		await axios
			.delete(`/api/projects/${project?.id}`)
			.then((response) => {
				toast({
					title: "Project Deleted",
					description: `Project "${project?.name}" has been deleted. Wait for the page to reload.`,
				});
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: `Project "${project?.name}" could not be deleted.`,
				});
			});
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this
						project.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={deleteProject}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
