import StudentDataTable from "@/components/table-component/StudentDataTable.tsx";
import {fetchClusteredData} from "@/Query/fetchClusteredData.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingState from "@/components/feature/LoadingState.tsx";
import {columns} from "@/components/table-component/Columns.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useState} from "react";
import {TriangleAlert} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {toast} from "sonner";
import {useDeleteRecord} from "@/hooks/useDeleteStudent.ts";

export default function StudentPage() {


    const {data, isPending,refetch} = useQuery(fetchClusteredData())
    const studentData = data ?? []
    const [openModal, setOpenModal] = useState(false)
    const [deleteInput, setDeleteInput] = useState("")
    const keyDelete = "Delete-student"
    const [activeDeleteID, setActiveDeleteID] = useState<string | null>(null)
    const {mutate} = useDeleteRecord()

    const OpenDeleteModal = (id: string) => {
        if (!id) return toast.error("Something Went Wrong")
        setActiveDeleteID(id)
        setOpenModal(true)
    }
    const CloseDeleteModal = () => {
        setActiveDeleteID(null)
        setDeleteInput("")
        setOpenModal(false)
    }

    const DeleteStudent = () => {
        if (activeDeleteID) {
            mutate(activeDeleteID)
            refetch().then()
        }
    }
    return (
        <section className="p-5">
            {isPending && <LoadingState/>}
            <StudentDataTable
                visibleFeature={{export_pdf: true, import_pdf: true}}
                columns={columns({OpenDeleteModal})}
                data={studentData}/>


            <Dialog open={openModal}>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="dark:border-red-400/40 dark:border-1" showCloseButton={false}>
                    <DialogHeader>
                        <div className="flex place-items-center gap-3">

                            <div
                                className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10"
                            >
                                <TriangleAlert className="text-red-500 dark:text-red-400"/>
                            </div>
                            <DialogTitle className="CircularFont dark:text-red-400 text-red-500">Delete Student
                                Data</DialogTitle>
                        </div>
                        <DialogDescription className={"text-[#191919] dark:text-white/70"}>
                            Are you sure you want to delete this student’s data? This action is
                            permanent and cannot be undone. All related records will be permanently
                            removed from our system.

                            {activeDeleteID}
                        </DialogDescription>
                        <Label>
                            <h1 className="mt-3 dark:text-white/70 ">
                                To confirm, please type <span
                                className="dark:text-red-400 text-red-500 CircularFont">Delete-student</span> below.
                            </h1>
                        </Label>
                        <Input value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)}
                               className={"border ring-destructive/20 border-red-400 focus:ring-red-400"}
                               placeholder={"Delete-student"}/>

                    </DialogHeader>

                    <DialogFooter>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={CloseDeleteModal}>Cancel</Button>
                            <Button onClick={DeleteStudent}
                                    // disabled={keyDelete !== deleteInput}
                                    className={`bg-red-500 `} variant={"destructive"}>Delete</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}