import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipWithChildren({
	children,
	tooltipContent,
}: {
	children: React.ReactNode;
	tooltipContent: React.ReactNode;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{tooltipContent}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
