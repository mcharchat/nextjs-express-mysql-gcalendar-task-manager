import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function Overview({
	overViewData,
}: {
	overViewData: {
		myData: { name: string; type: string; value: number; group: string }[];
		allData: { name: string; type: string; value: number; group: string }[];
	} | null;
}) {
	return (
		<div style={{ width: "100%", height: "400px" }}>
			<ResponsiveContainer>
				<PieChart width={400} height={400}>
					<Pie
						data={overViewData?.myData}
						dataKey='value'
						nameKey='name'
						cx='50%'
						cy='50%'
						outerRadius={50}
						fill='#8884d8'
					/>
					<Pie
						data={overViewData?.allData}
						dataKey='value'
						nameKey='name'
						cx='50%'
						cy='50%'
						innerRadius={60}
						outerRadius={80}
						fill='#82ca9d'
					/>
					<Tooltip
						formatter={(value, name, entry) => [
							value,
							`${entry.payload.group} - ${name}`,
						]}
					/>
					<Legend
						formatter={(value, entry) => {
							const groupName = entry?.payload?.group;
							return `${groupName} - ${value}`;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
