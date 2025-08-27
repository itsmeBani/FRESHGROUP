import {Card, CardAction, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import StudentDataTable from "@/components/table-component/StudentDataTable.tsx";
import {columns} from "@/components/table-component/Columns.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchClusteredProfile} from "@/Query/fetchClusteredData.ts";
import {Button} from "@/components/ui/button.tsx";
import {AwardIcon, SettingsIcon} from "lucide-react";

import type {IStudentData} from "@/Types.ts";
import {useState} from "react";


function Cluster() {

    const {data,isFetching}=useQuery(fetchClusteredProfile())
    const [clusterIndex,setClusterIndex]=useState<number>(0)
    const studentData:IStudentData[]=data?.[clusterIndex]?.students??[]

    const interpretations = [
        {
            cluster: 0,
            label: "Urban High Achievers",
            interpretation: "High-performing students from urban areas with private school backgrounds and higher income. May benefit from enrichment programs."
        },
        {
            cluster: 1,
            label: "Balanced Average Group",
            interpretation: "Students with average performance from mixed backgrounds. May need academic support and financial assistance."
        },
        {
            cluster: 2,
            label: "Struggling Rural Students",
            interpretation: "Low-performing students from rural areas with low income. Require remedial education and targeted intervention."
        }
    ];

    return (
        <section className="p-5 flex flex-col gap-10">

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {interpretations.map((text,index)=>{
                            const className = `dark:text-white`;
                            return (
                        <Card  className={`${index === clusterIndex ? "bg-image" : "text-black"} flex justify-between gap-1 shadow-sm`}>
                            <CardHeader >
                                <CardAction>

                                    {index === 0 &&  <div className='border-1   p-1 rounded-md'>
                                        <AwardIcon className={`${index === clusterIndex ? "dark:text-white text-white" : "dark:text-white text-indigo-500"}`} />
                                    </div>}

                                </CardAction>
                                <CardTitle className={`${index === clusterIndex ? "text-white" : "text-[#212121]"} text-2xl CircularFont font-bolder ${className}  @[250px]/card:text-1xl  gap-3 `}>
                                    {text?.label}
                                </CardTitle>

                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-3 text-[13px]">
                                <div className={`${index === clusterIndex ? " text-white opacity-80 pb-2": "text-[#212121] dark:text-white"}`}>
                                    {text?.interpretation}
                                </div>
                                <Button className={`${index === clusterIndex ?"dark:text-[#212121]  hover:bg-white  dark:bg-white bg-white text-[#212121] " :"dark:text-white"}`} onClick={()=>setClusterIndex(index)}  variant={"outline"}>{isFetching&&<SettingsIcon className={"animate-spin"}/> }Generate</Button>
                            </CardFooter>
                        </Card>

                            )
                        })}
                    </div>


            <StudentDataTable visibleFeature={{export_pdf:true,import_pdf:false}}  columns={columns()} hideColumns={{actions:false}} data={studentData}/>

        </section>
    );
}

export default Cluster;