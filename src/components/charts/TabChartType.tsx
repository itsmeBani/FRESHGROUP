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



    return (
        <div  className="flex w-full p-4  overflow-hidden flex-col gap-6">

            <Tabs   defaultValue="municipality" className="w-full h-full">
                <TabsList >
                    <TabsTrigger value="income"><HandCoins/></TabsTrigger>
                    <TabsTrigger value="sex"> <Mars/></TabsTrigger>
                    <TabsTrigger value="schoolType"><SchoolIcon/></TabsTrigger>
                    <TabsTrigger value="program"><BookIcon/></TabsTrigger>
                    <TabsTrigger value="municipality"><HomeIcon/></TabsTrigger>
                    <TabsTrigger value="gwa"><GraduationCapIcon/></TabsTrigger>
                </TabsList>

                <TabsContent value="income" >
                    <p className="text-sm  px-4 mb-2">
                        Students are  clustered based on their family income level: low, average, and high income groups.      </p>

                    <RenderBarChart<TFamilyIncome>
                        chartData={familyIncomeData}
                        AxisKey="name"
                        barDataKey={"value"}
                    />
                 </TabsContent>

                <TabsContent value="sex">
                    <p className="text-sm  px-4">
                        This section clusters students based on their sex to analyze gender-related patterns in academic performance and income groups.
                    </p>
                </TabsContent>

                <TabsContent value="schoolType">
                    <p className="text-sm  px-4">
                        Clusters students by the type of senior high school they attended (public or private), highlighting possible performance and income trends.
                    </p>
                </TabsContent>

                <TabsContent value="program" >
                    <p className="text-sm  px-4">
                        Students are grouped by their chosen academic program to reveal which programs are more common across different clusters.
                    </p>
                    <RenderBarChart<TCommonProgram>
                        chartData={commonProgramData}
                        AxisKey="name"
                        barDataKey={"value"}
                    />
                </TabsContent>

                <TabsContent value="municipality">
                    <p className="text-sm  px-4">
                        This clustering shows where students come from by municipality and how location relates to GWA and family income.
                    </p>


                </TabsContent>

                <TabsContent value="gwa">
                    <p className="text-sm text-gray-600 px-4">
                        Groups students by their Grade 12 GWA to observe academic performance patterns in each cluster.
                    </p>
                </TabsContent>

            </Tabs>
        </div>
    )
}
