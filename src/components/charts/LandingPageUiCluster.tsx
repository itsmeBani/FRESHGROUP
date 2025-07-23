import {type ReactNode} from 'react';
import {BookAlertIcon, ChartPie, Users} from "lucide-react";
import { motion } from 'framer-motion';
type CircleProps = {
    size: number;               // diameter in px
    top?: number;               // top in px
    left?: number;              // left in %
    right?: number;             // right in %
    bottom?: number;            // bottom in px
    borderColor: string;
    backgroundColor: string;
};


export const Circle = ({
                           size,
                           top,
                           left,
                           right,
                           bottom,
                           borderColor,
                           backgroundColor,
                       }: CircleProps) => {
    const style: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        borderColor,
        backgroundColor: `${backgroundColor}90`,

        ...(top !== undefined && { top: `${top}px` }),
        ...(left !== undefined && { left: `${left}%` }),
        ...(right !== undefined && { right: `${right}%` }),
        ...(bottom !== undefined && { bottom: `${bottom}px` }),
    };

    const randomX = Math.floor(Math.random() * 540 - 200);
    const randomY = Math.floor(Math.random() * 540 - 200);

    return (
        <motion.div
            className="absolute rounded-full border-[5px]"
            style={style}
            initial={{ x: randomX, y: randomY, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 ,}}
            transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: Math.random() * 0.5, // random delay for staggered effect
            }}
        />
    );
};


type ClusterProps = {
    borderColor: string;
    backgroundColor: string;
    rotate?: number;
    children?: ReactNode;
};

export const CircleCluster = ({
                              borderColor,
                              backgroundColor,
                              rotate = 0,
                              children,
                          }: ClusterProps) => {

    const circles = [
        { size: 80,top: 0,left: 50 },
        { size: 80, top: 40, left: 55 },
        { size: 80, top: 80, left: 40 },
        { size: 60, top: 140, left: 30 },
        { size: 60, top: 140, left: 50 },
        { size: 40, top: 200, left: 47 },
        { size: 40, top: 172, left: 22 },
        { size: 24, top: 216, left: 38 },
        { size: 24, top: 232, left: 32 },
        { size: 24, top: 172, left: 15 },
        { size: 24, top: 216, left: 15 },
        { size: 20, top: 180, left: 8 }
    ];



    return (
        <div
            className="flex z-[3] relative  w-full h-full"
            style={{transform: `rotate(${rotate}deg)`}}
        >
            {circles.map((circle, index) => (
                <Circle
                    key={index}
                    size={circle.size}
                    top={circle.top}
                    left={circle.left}
                    borderColor={borderColor}
                    backgroundColor={backgroundColor}
                />
            ))}
            {children}
        </div>
    );
};

type TooltipProps = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    icon: ReactNode;
    title: string,
    description: string,
    backgroundColor: string;
};

export const Tooltip = ({
                            top,
                            left,
                            right,
                            bottom,
                            icon, title, description,
                            backgroundColor,
                        }: TooltipProps) => {
    const positionStyle: React.CSSProperties = {
        ...(top !== undefined && {top: `${top}px`}),
        ...(left !== undefined && {left: `${left}px`}),
        ...(right !== undefined && {right: `${right}px`}),
        ...(bottom !== undefined && {bottom: `${bottom}px`}),
    };
    const randomX = Math.floor(Math.random() * 540 - 200);
    const randomY = Math.floor(Math.random() * 540 - 200);

    return (
        <motion.div
            initial={{ x: randomX, y: randomY, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: Math.random() * 0.5,
            }}
            className=" z-[4] rounded-lg p-2 bg-white shadow-lg absolute border shadow-2xl"
            style={positionStyle}
        >
            <div className="flex items-start w-[300px] gap-2">
                <div style={{backgroundColor: backgroundColor}}
                     className="rounded-md flex place-items-center justify-center w-17 aspect-square ">
                    {icon}
                </div>

                <div className="flex h-full flex-col justify-center">
                    <h1 className="CircularFont dark:text-[#212121] leading-3 pb-1 pt-2">{title}</h1>
                    <p className="leading-4 dark:text-[#212121]      text-[13px]">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};


export const RenderClusterUi = () => {
    return (
        <div className="grid w-full    gap-1 grid-cols-2 ">
            <div className="relative h-[300px] responsive-box w-full">
                <div className="responsive w-full h-full absolute left-10 -top-2 ">
                    <CircleCluster rotate={70} backgroundColor="#35DEA9" borderColor="#35DEA9">
                    </CircleCluster>
                </div>

            </div>

            <div className=" relative h-[300px] responsive-box w-full">
                <div className="w-full responsive h-full absolute -left-40 ">
                    <CircleCluster rotate={200} backgroundColor="#35DEA9" borderColor="#35DEA9">
                        <Circle size={20} top={20} left={45} backgroundColor="#35DEA9" borderColor="#35DEA9"/>
                        <Circle size={20} top={20} left={68} backgroundColor="#35DEA9" borderColor="#35DEA9"/>

                    </CircleCluster>
                    <Tooltip
                        icon={
                            <ChartPie
                                size={32}
                                strokeWidth={3}
                                className="text-white"/>}
                        top={10}
                        right={60}
                        title="Visualizations"
                        description="Charts and tables showing cluster patterns "
                        backgroundColor="#35DEA9"/>

                </div>

            </div>
            <div className=" relative h-[300px] responsive-box w-full">
                <div className="w-full responsive-bottom h-full absolute -top-20 left-10 ">
                    <CircleCluster rotate={10} backgroundColor="#FF8E8E" borderColor="#FF8E8E">
                        <div></div>
                    </CircleCluster>
                    <Tooltip
                        icon={
                            <Users size={32}
                                   strokeWidth={3}
                                   className="text-white"/>}
                        top={50}
                        left={40}
                        title="Clustered Profiles"
                        description="Clustered Student Profiles Based on Similar Traits"
                        backgroundColor="#FF8E8E"/>
                </div>

            </div>
            <div className=" relative h-[300px] responsive-box w-full">
                <div className="w-full responsive-bottom h-full absolute -left-30 -top-30">
                    <CircleCluster rotate={230} backgroundColor="#89ACFF" borderColor="#89ACFF">

                    </CircleCluster>
                    <Tooltip icon={<BookAlertIcon size={32} strokeWidth={3} className="text-white"/>} bottom={0}
                             right={0}
                             title="Insights & Planning"
                             description="Actionable Insights for Planning & Support "
                             backgroundColor="#89ACFF"/>
                </div>

            </div>
        </div>
    )
}