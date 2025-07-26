    
    import {Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
    import {Users} from "lucide-react";
    
    

    interface BarChartProps<TData> {
        AxisKey: string;
        chartData: TData[];
        barDataKey: string;
    }






    const BAR_COLORS = [
        '#ff4d4f', '#ffa940', '#52c41a', '#d62728',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22',
    ];
    export default function RenderBarChart<TData >({AxisKey,chartData,barDataKey} : BarChartProps<TData> ) {
        return (
            <div className="h-full">
    
                        <div className="h-[300px]  max-h-[400px] w-full">
                            <ResponsiveContainer  width="100%" height="100%">
                                <BarChart  data={chartData}  margin={{ top: 30, right: 0, left: 0, bottom: 5 }}>
                                   <CartesianGrid  className="dark:stroke-white/20 stroke-[#212121]/20"  vertical={false}/>
                                    <XAxis className="CircularFont    hidden lg:block"
                                        dataKey={AxisKey}
                                        tickLine={false}
                                        tickMargin={10}
                                           fontSize={13}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 11)}
                                    />
                                    <YAxis  fontSize={10} tickMargin={13} className="CircularFont " />
                                    <Tooltip
                                        cursor={false}
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="rounded-lg min-w-[100px] max-w-[200px] border bg-background p-2 shadow-sm">
                                                        <div className="grid 1 gap-2">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-semibold text-muted-foreground">{label}</span>
                                                                <span className="font-bold text-muted-foreground flex place-items-center gap-1"><Users size={15}/>{payload[0].value}</span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey={barDataKey} radius={[4, 4, 0, 0]}>
                                        {chartData?.map(({}, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={`${BAR_COLORS[index]}90`}
                                                stroke={BAR_COLORS[index]}
                                                strokeWidth={2}
                                            />
                                        ))}
                                        <LabelList

                                            position="top"
                                            offset={12}
                                            fontSize={12}
                                          content={renderCustomizedLabel}
                                        />
                                    </Bar>
    
                                 </BarChart>
                            </ResponsiveContainer>
                        </div>
    
    
            </div>
        )
    }
    const renderCustomizedLabel = (props:any) => {
        const { x, y, width, value } = props;


        return (
            <g>

                <text x={x + width /2.4} y={y-20} className={"CircularFont dark:fill-[#fff]"}  dominantBaseline="middle">
                    {value}
                </text>
            </g>
        );
    };