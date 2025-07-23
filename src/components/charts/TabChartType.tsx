import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { BarGraph } from "./BarGraph"
import { useQueries } from "@tanstack/react-query"
import {fetchCommonProgram, fetchFamilyIncomeCategory} from "@/Query/fetchClusteredData.ts"
import {BookIcon, Users} from "lucide-react";

export function TabChartType() {

    const result = useQueries({
        queries: [fetchFamilyIncomeCategory(),
              fetchCommonProgram()
        ],
    })

    const [familyIncomeCategory,commonProgram] = result

    const familyIncomeData = [
        { name: "Low Income", value: familyIncomeCategory?.data?.low },
        { name: "Average Income", value: familyIncomeCategory?.data?.average },
        { name: "High Income", value: familyIncomeCategory?.data?.high }

    ]
    const commonProgramData=commonProgram?.data?.map((data : {ProgramEnrolled:string;count:number})=> {
        return {name:data.ProgramEnrolled, value:data.count}
        }

    )

    return (
        <div  className="flex w-full p-4  overflow-auto flex-col gap-6">

            <Tabs  defaultValue="income" className="w-full overflow-auto h-full">
                <TabsList >
                    <TabsTrigger  value="income">Family&nbsp;Income</TabsTrigger>
                    <TabsTrigger value="sex">Sex</TabsTrigger>
                    <TabsTrigger value="schoolType">School&nbsp;Type</TabsTrigger>
                    <TabsTrigger value="program">Program</TabsTrigger>
                    <TabsTrigger value="municipality">Municipality</TabsTrigger>
                    <TabsTrigger value="gwa">Grade 12 GWA</TabsTrigger>
                </TabsList>

                <TabsContent value="income" >
                    <p className="text-sm text-gray-600 px-4 mb-2">
                        Students are  clustered based on their family income level: low, average, and high income groups.      </p>
                    <BarGraph  height={300}  width={500} data={familyIncomeData} hoverIcon={<Users size={15}/>} />
                </TabsContent>

                <TabsContent value="sex">
                    <p className="text-sm text-gray-600 px-4">
                        This section clusters students based on their sex to analyze gender-related patterns in academic performance and income groups.
                    </p>
                </TabsContent>

                <TabsContent value="schoolType">
                    <p className="text-sm text-gray-600 px-4">
                        Clusters students by the type of senior high school they attended (public or private), highlighting possible performance and income trends.
                    </p>
                </TabsContent>

                <TabsContent value="program" >
                    <p className="text-sm text-gray-600 px-4">
                        Students are grouped by their chosen academic program to reveal which programs are more common across different clusters.
                    </p>
                    <BarGraph height={300}  width={500} data={commonProgramData} hoverIcon={<BookIcon size={15}/>}/>
                </TabsContent>

                <TabsContent value="municipality">
                    <p className="text-sm text-gray-600 px-4">
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
