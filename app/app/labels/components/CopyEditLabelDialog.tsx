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
import { LabelSchema } from "../data/schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export function CopyEditLabelDialog({
	children,
	label = null,
	mode,
}: {
	children: React.ReactNode;
	label?: LabelSchema;
	mode: "edit";
}) {
	const { toast } = useToast();
	const [thisLabel, setThisLabel] = React.useState<any>({
		...label,
	});

	const [openPlusLabelDialog, setOpenPlusLabelDialog] =
		React.useState<boolean>(false);

	const validateFields = new Promise((resolve, reject) => {
		if (thisLabel?.name && thisLabel?.bgColor && thisLabel?.textColor) {
			resolve(true);
		} else {
			const emptyFields = [];
			if (!thisLabel?.name) emptyFields.push("Name");
			if (!thisLabel?.bgColor) emptyFields.push("Background Color");
			if (!thisLabel?.textColor) emptyFields.push("Text Color");
			reject(emptyFields);
		}
	});

	const copyEditLabel = async () => {
		await validateFields.catch((error) => {
			toast({
				title: "Error",
				description:
					"Please fill all the following required fields: " + error.join(", "),
			});
		});
		await axios
			.put(`/api/labels/${thisLabel?.id}`, thisLabel)
			.then((response) => {
				toast({
					title: "Label Edited",
					description: `Label "${thisLabel?.name}" has been edited. Wait for the page to reload.`,
				});
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.catch((error) => {
				toast({
					title: "Error",
					description: `Label "${thisLabel?.name}" has not been edited. Please try again.`,
				});
			});
	};

	return (
		<Dialog open={openPlusLabelDialog} onOpenChange={setOpenPlusLabelDialog}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Label
					</DialogTitle>
					<DialogDescription>Here you can {mode} a label.</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label className='text-right'>Name</Label>
						<Input
							defaultValue={thisLabel?.name}
							className='col-span-3'
							onChange={(e) =>
								setThisLabel({ ...thisLabel, name: e.target.value } as any)
							}
						/>
						<Label className='text-right'>Background Color</Label>
						<Input
							defaultValue={thisLabel?.bgColor}
							type='color'
							className='col-span-3'
							onChange={(e) =>
								setThisLabel({ ...thisLabel, bgColor: e.target.value } as any)
							}
						/>
						<Label className='text-right'>Text Color</Label>
						<Input
							defaultValue={thisLabel?.textColor}
							type='color'
							className='col-span-3'
							onChange={(e) =>
								setThisLabel({ ...thisLabel, textColor: e.target.value } as any)
							}
						/>
					</div>
				</div>
				<div className='flex justify-center'>
					<Badge
						style={{
							backgroundColor: thisLabel?.bgColor,
							color: thisLabel?.textColor,
						}}
					>
						{thisLabel?.name}
					</Badge>
				</div>
				<DialogFooter>
					<Button type='submit' onClick={copyEditLabel}>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Label
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
