import {type ReactNode, useState} from 'react';
import * as d3 from 'd3';


const MARGIN = { top: 10, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
    width: number;
    height: number;
    data: { name: string; value: number }[];
    hoverIcon:ReactNode

};

export const BarGraph = ({ width, height, data ,hoverIcon}: BarplotProps) => {
   if (!data) return
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        name: string;
        value: number;
    } | null>(null);

    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const groups = data?.sort((a, b) => b.value - a.value).map((d) => d.name);
    const xScale = d3
        .scaleBand()
        .domain(groups)
        .range([0, boundsWidth])
        .padding(BAR_PADDING);

    const max = d3.max(data.map((d) => d.value)) ?? 10;
    const yScale = d3
        .scaleLinear()
        .domain([max * 1.2, 0])
        .range([0, boundsHeight]);

    const BAR_COLORS = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22',
    ];

    const allShapes = data?.map((d, i) => {
        const x = xScale(d.name);
        if (x === undefined) return null;

        const isHovered = hoveredIndex === i;

        const textX = x + xScale.bandwidth() / 2;
        const textY = yScale(d.value) - 10;

        return (
            <g
                key={i}

                onMouseEnter={(e) => {
                    setHoveredIndex(i);
                    setTooltip({
                        x: e.clientX,
                        y: e.clientY,
                        name: d.name,
                        value: d.value,
                    });
                }}
                onMouseMove={(e) => {
                    setTooltip((prev) =>
                        prev ? { ...prev, x: e.clientX, y: e.clientY } : null
                    );
                }}
                onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTooltip(null);
                }}
                style={{ cursor: 'pointer' }}
            >
                <rect
                    x={x}
                    y={yScale(d.value)}
                    width={xScale.bandwidth()}
                    height={boundsHeight - yScale(d.value)}
                    opacity={isHovered ? 0.9 : 0.8}
                    stroke={BAR_COLORS[i % BAR_COLORS.length]}
                    fill={BAR_COLORS[i % BAR_COLORS.length]}
                    fillOpacity={isHovered ? 0.9 : 0.6}
                    strokeWidth={isHovered ? 2 : 1}
                    rx={3}

                />





                <text
                    x={textX}
                    y={textY-8}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={14}
                    className="fill-[#212121] mb-2 CircularFont font-bold dark:fill-[#fff]"
                >
                    {d.value}
                </text>
                <text
                    x={x + xScale.bandwidth() / 2}
                    y={boundsHeight + 15}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={12}
                    className="fill-[#212121] mb-2 CircularFont font-medium dark:fill-[#fff]"
                >
                    {d?.name?.length > 6 ? d.name.substring(0, 6) + '…' : d.name}

                </text>

            </g>
        );
    });


    const grid = yScale.ticks(5).map((value, i) => (
        <g key={i}>
            <line
                x1={0}
                x2={boundsWidth}
                y1={yScale(value)}
                y2={yScale(value)}
                className="stroke-[rgba(33,33,33,0.30)] dark:stroke-[rgba(43,43,43,1)]"
                strokeWidth={0.6}
            />
            <text
                x={-10}
                y={yScale(value)}
                alignmentBaseline="central"
                className="fill-[#212121] dark:fill-[#fff]"
                style={{
                    fontSize: '12px',
                    textAnchor: 'middle',
                    fontFamily: 'CircularFont',
                }}
            >
                {value}
            </text>

        </g>
    ));

    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${MARGIN.left},${MARGIN.top})`}
                >
                    {grid}
                    {allShapes}
                </g>
            </svg>

            {tooltip && (
                <div
                    style={{
                        position: 'fixed',
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,

                        zIndex: 1000,

                    }}
                        className="bg-white px-3 dark:border-white/30 border py-2 shadow-lg dark:bg-[#292929] rounded-full">

                    <p className="CircularFont text-[11px] flex gap-2">{hoverIcon}{tooltip.name}</p>
                </div>
            )}
        </div>
    );
};
