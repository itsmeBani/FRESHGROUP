import { useMemo } from "react";
import type {ScaleLinear} from "d3";

type AxisBottomProps = {
    xScale: ScaleLinear<number, number>;
    pixelsPerTick: number;
    height: number;
};

// tick length
const TICK_LENGTH = 20;

export const AxisBottom = ({
                               xScale,
                               pixelsPerTick,
                               height,
                           }: AxisBottomProps) => {
    const range = xScale.range();

    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }));
    }, [xScale]);

    return (
        <>
            {ticks.map(({ value, xOffset }) => (
                <g
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                    shapeRendering={"crispEdges"}
                >
                    <line
                        y1={TICK_LENGTH}
                        y2={-height - TICK_LENGTH}
                        className={"stroke-[rgba(33,33,33,0.30)] dark:stroke-[rgba(43,43,43,1)]"}

                        strokeWidth={0.6}
                    />
                    <text
                        key={value}  className={"fill-[#212121] dark:fill-[#fff]"}
                        style={{
                            fontSize: "12px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",

                            fontFamily:"CircularFont",
                        }}
                    >
                        {value.toLocaleString()}
                    </text>
                </g>
            ))}
        </>
    );
};
