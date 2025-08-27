import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useQueries } from "@tanstack/react-query"
import {fetchCommonProgram, fetchFamilyIncomeCategory} from "@/Query/fetchClusteredData.ts"

import RenderBarChart from "@/components/charts/RenderBarChart.tsx";
import {BookIcon, GraduationCapIcon, HandCoins, HomeIcon, Mars, SchoolIcon} from "lucide-react";
import RenderPieChart from "@/components/charts/RenderPieChart.tsx";



interface BarChartProperty {
    name: string
    value: number | string
}

type TFamilyIncome=BarChartProperty
type TCommonProgram=BarChartProperty
export function TabChartType() {

    const result = useQueries({
        queries: [fetchFamilyIncomeCategory(),
                  fetchCommonProgram()
        ],
    })

    const [familyIncomeCategory,commonProgram] = result

    const familyIncomeData:TFamilyIncome[] = [
        { name: "Low Income", value: familyIncomeCategory?.data?.low,},
        { name: "Average Income", value: familyIncomeCategory?.data?.average,},
        { name: "High Income", value: familyIncomeCategory?.data?.high}

    ]

    const commonProgramData:TCommonProgram[]=commonProgram?.data?.map((data : {ProgramEnrolled:string;count:number})=> {
        return {name:data.ProgramEnrolled, value:data.count}
        }

    )

    const Tab=[
        {
        name:"Family Income",
        value:"income",
        icon:<HandCoins/>,
        component :
            <RenderBarChart<TFamilyIncome>
            chartData={familyIncomeData}
            AxisKey="name"
            barDataKey={"value"}
            />,
        description:"Students are  clustered based on their family income level: low, average, and high income groups"
        },
        {
            name:"Gender",
            value:"sex",
            icon:<Mars/>,
            component : <RenderPieChart/>,
            description:"This section clusters students based on their sex to analyze gender-related patterns in academic performance and income groups"
        },
        {
            name:"School Type",
            value:"schooltype",
            icon:<SchoolIcon/>,
            component :"",
            description:"Clusters students by the type of senior high school they attended (public or private), highlighting possible performance and income trends"
        },
        {
            name:"Program Enrolled",
            value:"program",
            icon:<BookIcon/>,
            component :
                <RenderBarChart<TCommonProgram>
                chartData={commonProgramData}
                AxisKey="name"
                barDataKey={"value"}
            />,
            description:"Students are grouped by their chosen academic program to reveal which programs are more common across different clusters."
        },
        {
            name:"Municipality of Origin",
            value:"municipality",
            icon:<HomeIcon/>,
            component :"",
            description:"This clustering shows where students come from by municipality"
        },
        {
            name:"GWA",
            value:"gwa",
            icon:<GraduationCapIcon/>,
            component :"",
            description:"Groups students by their Grade 12 GWA to observe academic performance patterns in each cluster"     }
        ]



    return (
        <div  className="flex w-full p-4  overflow-hidden flex-col gap-6">

            <Tabs   defaultValue="income" className="w-full h-full">
                <TabsList >
                    {Tab?.map(({icon,value},index)=><TabsTrigger key={index} value={value}>{icon}</TabsTrigger>)}
                </TabsList>

                {Tab?.map(({value,component,description},index)=>{
                    return (
                        <TabsContent key={index} value={value}>
                            <p className="text-sm  px-4 mb-2">{description}</p>
                            {component}
                        </TabsContent>

                    )
                })}

            </Tabs>
        </div>
    )
}
