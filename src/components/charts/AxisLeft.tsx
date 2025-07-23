import { useMemo } from "react";
import type {ScaleLinear} from "d3";

type AxisLeftProps = {
    yScale: ScaleLinear<number, number>;
    pixelsPerTick: number;
    width: number;
};

const TICK_LENGTH = 10;

export const AxisLeft = ({ yScale, pixelsPerTick, width }: AxisLeftProps) => {
    const range = yScale.range();

    const ticks = useMemo(() => {
        const height = range[0] - range[1];
        const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

        return yScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            yOffset: yScale(value),
        }));
    }, [yScale]);

    return (
        <>


            {ticks.map(({ value, yOffset }) => (
                <g
                    key={value}
                    transform={`translate(0, ${yOffset})`}
                    shapeRendering={"crispEdges"}
                >
                    <line
                        x1={-TICK_LENGTH}
                        x2={width + TICK_LENGTH}

                        strokeWidth={0.6}
                        className={"stroke-[rgba(33,33,33,0.30)] dark:stroke-[rgba(43,43,43,1)]"}

                    />
                    <text
                        key={value}  className={"fill-[#212121] dark:fill-[#fff]"}
                        style={{
                            fontSize: "12px",

                            textAnchor: "middle",
                            transform: "translateX(-20px)",

                            fontFamily:"CircularFont"
                        }}

                    >
                        {value}
                    </text>
                </g>
            ))}
        </>
    );
};
