import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export const ScatterPlotSkeleton=()=>{
    return (
        <div className="shadow-sm flex flex-col gap-2 border p-5 rounded-lg  min-h-[500px]  rounded-md h-full">
            <div className="flex w-full gap-2 ">
                <div className="flex w-full flex-col gap-2 ">
                    <div className=" h-[30px] dark:bg-[#292929] w-[60%] rounded-sm bg-gray-200"></div>
                    <div className=" h-[20px] dark:bg-[#292929]  w-[80%] rounded-sm  bg-gray-200"></div>
                </div>
                <div className=" h-[40px]  dark:bg-[#292929] w-[50px] rounded-sm  bg-gray-200 rounded-lg"></div>
            </div>
            <div className=" h-full w-full rounded-sm dark:bg-[#292929]  bg-gray-200"></div>
        </div>
    )
}

export const SkeletonSectionCards=()=> {

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({length:4}).map((_,index)=>{
            return (
                <Card key={index} className="    @container/card gap-3 shadow-sm">
                    <CardHeader >
                        <CardDescription className="text-white font-semibold w-[50%] dark:bg-[#292929] bg-gray-200 p-2"></CardDescription>
                        <CardAction>

                            <div className='border-1 dark:border-[#292929] border-white p-5 bg-gray-200 text-white dark:bg-[#292929]  border-black/15 p-1 rounded-md'>

                            </div>

                        </CardAction>
                        <CardTitle className="text-2xl dark:bg-[#292929] text-white bg-gray-200 w-[80%] h-10 p-2 CircularFont font-bolder tabular-nums @[250px]/card:text-3xl">
                        </CardTitle>

                    </CardHeader>

                    <CardFooter className="flex-col items-start gap-1 text-[13px]">
                        <div className=" line-clamp-1 dark:bg-[#292929] w-[50%] h-3 bg-gray-200 text-white flex gap-2 font-medium">

                        </div>
                        <div className="opacity-80 dark:bg-[#292929]  w-[80%] h-3 bg-gray-200 text-white"></div>
                    </CardFooter>
                </Card>
            )

            }
            )

            }
        </div>
    );
}