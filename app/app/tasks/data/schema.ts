export type TaskSchema = {
	id: string;
	status: "backlog" | "todo" | "in progress" | "done" | "canceled";
	title: string;
	label:
		| {
				name: string;
				bgColor: string;
				textColor: string;
		  }
		| undefined
		| number;
	priority: "low" | "medium" | "high";
	project:
		| {
				id: string;
				name: string;
		  }
		| number;
	creator:
		| {
				id: string;
				name: string;
				email: string;
				picture: string;
		  }
		| number;
	startDate: string | null | Date;
	dueDate: string | null | Date;
} | null;

export type ProjectSchema = {
	id: string;
	name: string;
} | null;

export type LabelSchema = {
	name: string;
	bgColor: string;
	textColor: string;
} | null;
