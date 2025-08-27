//
// import * as d3 from 'd3';
// import {AxisLeft} from "@/components/charts/AxisLeft.tsx";
// import {AxisBottom} from "@/components/charts/AxisBottom.tsx";
// import type {IStudentData} from "@/Types.ts";
// const MARGIN = { top: 30, right: 50, bottom: 60, left: 60 };
//
// type ScatterPlotProps = {
//     width: number;
//     height: number;
//     data:IStudentData[];
// };
//
//
// export const RenderScatterPlot = ({ width, height, data }: ScatterPlotProps) => {
//
//
//     const boundsWidth = width - MARGIN.right - MARGIN.left;
//     const boundsHeight = height - MARGIN.top - MARGIN.bottom;
//     const pad = 0.0061;
//
//     const xExtent = d3.extent(data, d => d.FamilyIncome) as [number, number];
//     const yExtent = d3.extent(data, d => d.Grade12GWA) as [number, number];
//
//     const xPad = (xExtent[1] - xExtent[0]) * pad;
//     const yPad = (yExtent[1] - yExtent[0]) * pad;
//
//     const xScale = d3
//         .scaleLinear()
//         .domain([xExtent[0] - xPad, xExtent[1] + xPad])
//         .range([0, boundsWidth])
//         .nice();
//
//     const yScale = d3
//         .scaleLinear()
//         .domain([yExtent[0] - yPad, yExtent[1] + yPad])
//         .range([boundsHeight, 0])
//         .nice();
//
//     const getStatusColor = (clusterIndex:number) => {
//         switch (clusterIndex) {
//             case 0:
//                 return "#ff4d4f";
//             case 1:
//                 return "#ffa940";
//             case 2:
//                 return "#52c41a";
//             default:
//                 return "#8c8c8c";
//         }
//     };
//
//     const allShapes = data.map((d, i) => {
//         const color = getStatusColor(d.cluster);
//         return (
//             <circle
//                 key={i}
//                 r={9}
//                 cx={xScale(d.FamilyIncome)}
//                 cy={yScale(d.Grade12GWA)}
//                 opacity={1}
//                 stroke={color}
//                 fill={color}
//                 fillOpacity={0.4}
//                 strokeWidth={1}
//
//             />
//         );
//     });
//
//     return (
//
//         <div style={{ position: "relative" }}>
//                <svg width={width} height={height}>
//                    <g
//                        width={boundsWidth}
//                        height={boundsHeight}
//                        transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
//                    >
//                        <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />
//                        <g transform={`translate(0, ${boundsHeight})`}>
//                            <AxisBottom
//                                xScale={xScale}
//                                pixelsPerTick={60}
//                                height={boundsHeight}
//                            />
//                        </g>
//                        {allShapes}
//                    </g>
//                </svg>
//
//            </div>
//
//     );
// };



import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer, type TooltipProps,
} from 'recharts';
import type { IStudentData } from "@/Types.ts";
import type {ScatterPointItem} from "recharts/types/cartesian/Scatter";
import type {SVGAttributes} from "react";
import type {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";


// Colors for each data point
const COLORS = ['#ff4d4f', '#ffa940', '#52c41a'];

// Props type
type ScatterPlotProps = {
    width: number;
    height: number;
    data: IStudentData[];
};

// Custom circle with larger radius
const CustomCircle = (props:SVGAttributes<ScatterPointItem>) => {
    const { cx, cy, fill } = props;
    return <circle  fillOpacity={0.4} stroke={fill} cx={cx} cy={cy}  strokeWidth={1.3}     r={10} fill={fill} />;
};

// Apply "nice" rounding (like D3's .nice())
const niceExtent = (min: number, max: number): [number, number] => {
    const span = max - min;
    const step = Math.pow(10, Math.floor(Math.log10(span)) - 1);
    const niceMin = Math.floor(min / step) * step;
    const niceMax = Math.ceil(max / step) * step;
    return [niceMin, niceMax];
};

export const RenderScatterPlot = ({ width, height, data }: ScatterPlotProps) => {
    const pad = 0.002; // same as in your snippet

    // const xValues = data.map(d => d.FamilyIncome);
    const yValues = data.map(d => d.Grade12GWA);

    // const xExtentRaw: [number, number] = [Math.min(...xValues), Math.max(...xValues)];

    const yExtentRaw: [number, number] = [Math.min(...yValues), Math.max(...yValues)];

    // const xPad = (xExtentRaw[1] - xExtentRaw[0]) * pad;
    const yPad = (yExtentRaw[1] - yExtentRaw[0]) * pad;

    // const xExtent = niceExtent(xExtentRaw[0] - xPad, xExtentRaw[1] + xPad);
    //
    const yExtent = niceExtent(yExtentRaw[0] - yPad, yExtentRaw[1] + yPad);

    const CustomTooltip = ({ active, payload } :TooltipProps<ValueType, NameType>) => {
        const isVisible = active && payload && payload.length;
        return (
            <div className="bg-white dark:bg-[#191919] dark:border-white/60 p-3 rounded-md border-1 border-black/60" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
                {isVisible && (
                    <div className={"flex gap-5"}>


                         <div >

                             <h1 className="flex font-thin CircularFont  dark:text-white/80 text-md  place-items-center gap-1">12,3090</h1>
                             <p className="CircularFont text-black/60 text-xs dark:text-white/60  font-thin">FAMILY INCOME</p>
                         </div>
                        <div>
                            <h1 className={"flex font-thin CircularFont  dark:text-white/80  text-md place-items-center gap-1 text-center"}>93</h1>
                            <p className="CircularFont text-black/60 text-xs dark:text-white/60  font-thin">GWA</p>
                        </div>
                        {/*<p className="label CircularFont font-midium">{`Family Income : ${payload[0].value}`}</p>*/}
                        {/*<p className="label CircularFont font-midium">{`GWA : ${payload[1]?.value}`}</p>*/}


                    </div>
                )}
            </div>
        );
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                width={width}
                height={height}
                margin={{ top: 20, right: 40, bottom: 20, left: 0 }}
            >
                <CartesianGrid />
                <XAxis className=" fill-red-5"  tick={{fontSize: 13, fontFamily: 'CircularFont' }}
                       type="number"
                    dataKey="FamilyIncome"
                    name="Family Income"

                />
                <YAxis  tick={{fontSize: 13, fontFamily: 'CircularFont' }}
                    type="number"
                    dataKey="Grade12GWA"
                    name="Grade 12 GWA"
                    domain={yExtent}
                />
                <Tooltip content={({active,payload,label})=><CustomTooltip label={label} active={active} payload={payload}/> } />

                    <Scatter name="Students" data={data} shape={<CustomCircle  />}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} stroke={COLORS[entry?.cluster]}  fill={COLORS[entry?.cluster]}  />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
};
