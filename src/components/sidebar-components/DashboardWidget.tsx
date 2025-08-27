
import {
    Card, CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";

import { MoveRightIcon, TrendingDownIcon, TrendingUp, Users} from "lucide-react";
import {type ReactNode} from "react";
import {AnimatedNumber} from "@/components/ui/AnimatedNumber.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchClusteredProfile} from "@/Query/fetchClusteredData.ts";
import type {IStudentData} from "@/Types.ts";



type StatCard = {
    description: string;
    value: number;
    delta: string;
    footerHeadline: string;
    footerSub: string;
    positive?: boolean;
    icon:ReactNode;
};

interface Income {
    common:IStudentData
    students:IStudentData[]
}



const stats =(lowIncomeData:Income,averageIncomeData:Income,highIncomeData:Income):StatCard[] =>[
    {
        description: "Total Student",
        value: (highIncomeData?.students?.length ?? 0)
            + (lowIncomeData?.students?.length ?? 0)
            + (averageIncomeData?.students?.length ?? 0),
         delta: "+12.5%",
        footerHeadline: "Total students enrolled",
        footerSub: "Across all programs this year",
        positive: true,
        icon:<Users  className="text-white  p-1"/>,
    },
    {
        description: "Low Income",
        value: lowIncomeData?.students?.length ?? 0,
        delta: "-20%",
        footerHeadline: "Students in low‑income bracket",
        footerSub: "Family income below set threshold",
        positive: false,
        icon:<TrendingDownIcon className=" text-white  p-1"/>,
    },
    {
        description: "Average Income",
        value:  averageIncomeData?.students?.length ?? 0,
        delta: "+12.5%",
        footerHeadline: "Students in average‑income bracket",
        footerSub: "Family income within median range",
        positive: true,
        icon:<MoveRightIcon className="text-white  p-1"/>,
    },
    {
        description: "High Income",
        value:  highIncomeData?.students?.length ?? 0,
        delta: "+4.5%",
        footerHeadline: "Students in high‑income bracket",
        footerSub: "Family income above set threshold",
        positive: true,
        icon:<TrendingUp className="text-white  p-1"/>,
    },

];

export function DashBoardWidget() {
    const {data}=useQuery(fetchClusteredProfile())
    const lowIncome=data?.[2]
    const averageIncome=data?.[1]
    const highIncome=data?.[0]
    const statisticalData=stats(lowIncome,averageIncome,highIncome)
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statisticalData.map(({
                        description,
                        value,icon,
                        footerHeadline,
                        footerSub}, index
                ) => (
                    <Card key={index} className="bg-image @container/card gap-3 shadow-sm">
                        <CardHeader >
                            <CardDescription className="text-white font-semibold">{description}</CardDescription>
                            <CardAction>

                                   <div className='border-1 border-white text-white  border-black/15 p-1 rounded-md'>
                                       {icon}
                                   </div>

                            </CardAction>
                            <CardTitle className="text-2xl text-white CircularFont font-bolder tabular-nums @[250px]/card:text-3xl">
                              <AnimatedNumber value={value}/>
                            </CardTitle>

                        </CardHeader>

                        <CardFooter className="flex-col items-start gap-1 text-[13px]">
                            <div className=" line-clamp-1 text-white flex gap-2 font-medium">
                                {footerHeadline}
                            </div>
                            <div className="opacity-80 text-white">{footerSub}</div>
                        </CardFooter>
                    </Card>
                )
            )}


        </div>
    );
}


