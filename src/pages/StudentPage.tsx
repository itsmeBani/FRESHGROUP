
import StudentDataTable from "@/components/table-component/StudentDataTable.tsx";
import {fetchClusteredData} from "@/Query/fetchClusteredData.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingState from "@/components/feature/LoadingState.tsx";
import {columns} from "@/components/table-component/Columns.tsx";


export default function StudentPage() {


    const {data,isPending}=useQuery(fetchClusteredData())
    const studentData=data??[]
     return (
        <section className="p-5">
            {isPending && <LoadingState/>}
            <StudentDataTable visibleFeature={{export_pdf:true,import_pdf:true}}  columns={columns()} data={studentData}/>
        </section>
    )
}