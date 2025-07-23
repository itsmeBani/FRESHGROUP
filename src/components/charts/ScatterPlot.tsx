
import * as d3 from 'd3';
import {AxisLeft} from "@/components/charts/AxisLeft.tsx";
import {AxisBottom} from "@/components/charts/AxisBottom.tsx";
import type {IStudentData} from "@/Types.ts";
const MARGIN = { top: 30, right: 60, bottom: 60, left: 60 };

type ScatterPlotProps = {
    width: number;
    height: number;
    data:IStudentData[];
};


export const RenderScatterPlot = ({ width, height, data }: ScatterPlotProps) => {


    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    const pad = 0.0061;

    const xExtent = d3.extent(data, d => d.FamilyIncome) as [number, number];
    const yExtent = d3.extent(data, d => d.Grade12GWA) as [number, number];

    const xPad = (xExtent[1] - xExtent[0]) * pad;
    const yPad = (yExtent[1] - yExtent[0]) * pad;

    const xScale = d3
        .scaleLinear()
        .domain([xExtent[0] - xPad, xExtent[1] + xPad])
        .range([0, boundsWidth])
        .nice();

    const yScale = d3
        .scaleLinear()
        .domain([yExtent[0] - yPad, yExtent[1] + yPad])
        .range([boundsHeight, 0])
        .nice();
    const getStatusColor = (clusterIndex:number) => {
        switch (clusterIndex) {
            case 0:
                return "#ff4d4f";
            case 1:
                return "#ffa940";
            case 2:
                return "#52c41a";
            default:
                return "#8c8c8c";
        }
    };

    const allShapes = data.map((d, i) => {
        const color = getStatusColor(d.cluster);
        return (
            <circle
                key={i}
                r={9}
                cx={xScale(d.FamilyIncome)}
                cy={yScale(d.Grade12GWA)}
                opacity={1}
                stroke={color}
                fill={color}
                fillOpacity={0.4}
                strokeWidth={1}

            />
        );
    });

    return (

        <div style={{ position: "relative" }}>
               <svg width={width} height={height}>
                   <g
                       width={boundsWidth}
                       height={boundsHeight}
                       transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                   >
                       <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />
                       <g transform={`translate(0, ${boundsHeight})`}>
                           <AxisBottom
                               xScale={xScale}
                               pixelsPerTick={60}
                               height={boundsHeight}
                           />
                       </g>
                       {allShapes}
                   </g>
               </svg>

           </div>

    );
};


