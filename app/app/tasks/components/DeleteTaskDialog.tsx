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
import { TaskSchema } from "../data/schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export function DeleteTaskDialog({
	children,
	task,
}: {
	children: React.ReactNode;
	task: TaskSchema;
}) {
	const { toast } = useToast();
	const deleteTask = async () => {
		await axios
			.delete(`/api/tasks/${task?.id}`)
			.then((response) => {
				toast({
					title: "Task Deleted",
					description: `Task "${task?.title}" has been deleted. Wait for the page to reload.`,
				});
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: `Task "${task?.title}" could not be deleted.`,
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
						task.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={deleteTask}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
