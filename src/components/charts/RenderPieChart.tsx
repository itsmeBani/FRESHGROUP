import * as React from "react"

import {Cell, Label, Pie, PieChart} from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {AnimatedNumber} from "@/components/ui/AnimatedNumber.tsx";


const chartData = [
    {name: "Male", value: 275, fill: "var(--color-chrome)"},
    {name: "Female", value: 200, fill: "var(--color-safari)"},

]


const COLORS = [
    '#52c41a', '#8383fd'
];

const chartConfig = {} satisfies ChartConfig

export default function RenderPieChart() {
    const totalGenders = React.useMemo(() => {

        return chartData.reduce((acc, curr) => acc + curr.value, 0)
    }, [])

    return (

        <div className="w-full      flex justify-center flex place-items-center ">
            <div className="flex gap-3 flex-col ">
                <div className=" min-w-[130px] border-[1.6px] dark: border-[1px] shadow-md border-[#52c41a] px-6 rounded-md  py-2 ">
                    <h1 className=" text-[#52c41a] text-center   justify-center dark:text-white flex CircularFont flex place-items-center gap-1 text-2xl font-bold ">  <AnimatedNumber value={2100}/></h1>
                    <p className="CircularFont leading-2  dark:text-white text-xs  text-[#52c41a]  text-center">Male</p>
                </div>
                <div className=" min-w-[130px]  border-[1.6px] dark: border-[1px] shadow-md border-[#8383fd]    rounded-md px-5 py-2 ">
                    <h1 className="text-[#8383fd] text-center dark:text-white flex CircularFont flex  justify-center place-items-center gap-1 text-2xl font-bold  ">  <AnimatedNumber value={270}/></h1>
                    <p className="CircularFont dark:text-white text-xs leading-2 text-[#8383fd] text-center">Female</p>
                </div>
            </div>
            <ChartContainer
                config={chartConfig}
                className=" aspect-square min-h-[280px]  max-h-[300px] "
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel/>}
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
                            content={({viewBox}) => {
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
                                                {totalGenders.toLocaleString()}
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

        </div>
    )
}
