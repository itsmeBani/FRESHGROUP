import {useEffect, useRef, useState} from "react";
import {useDimensions} from "@/hooks/useDimension.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchClusteredData} from "@/Query/fetchClusteredData.ts";
import {DashBoardWidget} from "@/components/sidebar-components/DashboardWidget.tsx";
import {RenderScatterPlot} from "@/components/charts/ScatterPlot.tsx";
import {TabChartType} from "@/components/charts/TabChartType.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChartNetwork, MoveRightIcon, SlidersHorizontal} from "lucide-react";
import type {IStudentData} from "@/Types.ts";
import LoadingState from "@/components/feature/LoadingState.tsx";
import {ScatterPlotSkeleton, SkeletonSectionCards} from "@/components/skeletonLoaders/skeletonLoaders.tsx";


export default function Dashboard() {

    const targetRef = useRef<HTMLDivElement>(null);
    const dimensions = useDimensions(targetRef);
    const WIDTH = dimensions?.width || 0
    const HEIGHT = 400

    const {data, isPending} = useQuery(fetchClusteredData())
    const [plotData, setPlotData] = useState<IStudentData[]>(data ?? [])

    useEffect(() => {
        if (data) setPlotData(data.slice(0, 200))
    }, [data])

    const SliceDataPlot = (divider: number) => {
        if (data) setPlotData(data.slice(0, data.length / divider))
    }

    return (
        <div className="">
            {isPending && <LoadingState/>}
            <div className="flex relative flex-1 flex-col gap-4 p-4">
                {data ? <DashBoardWidget/> : <SkeletonSectionCards/>}
                <section className="grid-cols-1 lg:grid-cols-2 gap-4 h-full grid">

                    <div ref={targetRef} className=" grid grid-cols-1 h-full">
                        {data ?
                            <div className="shadow-sm border h-full rounded-lg ">
                                <div className="flex place-items-center justify-between  p-4 lg:px-6 lg:pt-4">
                                    <div className="lg:pt-4">
                                        <h1 className="CircularFont leading-4 lg:leading-3 dark:text-white text-[#212121]/90 font-bold lg:text-2xl">
                                            Student Clustering Overview
                                        </h1>
                                        <p className="mt-2 text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                                            This overview shows how students are grouped based on their GWA (General
                                            Weighted Average) and family income.
                                        </p>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className={"p-0"}><SlidersHorizontal/></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="" align="start">
                                            <DropdownMenuLabel className="CircularFont pb-0 flex justify-between ">Data
                                                Range <ChartNetwork size={16}/></DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuGroup>
                                                {Array.from({length: 3}).map((_, index) => {
                                                    const total = data.length;
                                                    const step = Math.floor(total / 3);
                                                    const start = index === 0 ? 0 : index * step;
                                                    const end = index === 2 ? total : (index + 1) * step;

                                                    return (
                                                        <DropdownMenuItem className="CircularFont" key={index}
                                                                          onClick={() => SliceDataPlot(3 - index)}>
                                                            {start} <MoveRightIcon/> {end}
                                                        </DropdownMenuItem>
                                                    );
                                                })}

                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="h-[400px] w-full">
                                    <RenderScatterPlot width={WIDTH} height={HEIGHT} data={plotData}/>

                                </div>
                            </div> : <ScatterPlotSkeleton/>
                        }


                    </div>
                    {data ?
                        <div className="w-full h-full ">
                            <div className="h-full shadow-sm border rounded-lg ">
                                <div className="px-7 pt-7">
                                    <h1 className="CircularFont dark:text-white text-[#212121]/90 font-bold text-2xl">Category</h1>

                                </div>


                                <TabChartType/>
                            </div>
                        </div> : <ScatterPlotSkeleton/>}
                </section>

            </div>
        </div>
    )
}