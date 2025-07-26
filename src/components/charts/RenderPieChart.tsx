"use client"

import * as React from "react"

import {Cell, Label, Pie, PieChart} from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { name: "Male", value: 275, fill: "var(--color-chrome)" },
    { name: "Female", value: 200, fill: "var(--color-safari)" },

]



const COLORS = [
    '#52c41a', '#ff4d4f', '#52c41a', '#d62728',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22',
];

const chartConfig = {

} satisfies ChartConfig

export default function RenderPieChart() {
    const totalVisitors = React.useMemo(() => {

        return chartData.reduce((acc, curr) => acc + curr.value, 0)
    }, [])

    return (

                <ChartContainer
                    config={chartConfig}
                    className=" aspect-square min-h-[280px] max-h-[280px]"
                >
                    <PieChart >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`${COLORS[index]}90`}
                                    stroke={COLORS[index]}
                                    strokeWidth={2}
                                />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className=" CircularFont dark:fill-white text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className=" fill-muted-foreground"
                                                >
                                                    Gender
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

    )
}
