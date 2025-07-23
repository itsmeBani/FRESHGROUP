import {Button, buttonVariants} from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {cn} from "@/lib/utils.ts";
import {FileUpIcon, Loader} from "lucide-react";
import {useCallback, useRef, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {toast} from "sonner";
import Papa from "papaparse";
import {Badge} from "@/components/ui/badge.tsx";
import {supabase} from "@/utils/supabase.ts";
import type {IStudentData} from "@/Types.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchClusteredData} from "@/Query/fetchClusteredData.ts";
export function ImportCsvFile() {
    const {refetch}=useQuery(fetchClusteredData())
    const expectedHeaders = [
        "ID",
        "Lastname",
        "Firstname",
        "FamilyIncome",
        "TypeofSeniorHighSchool",
        "ProgramEnrolled",
        "MunicipalityOfOrigin",
        "Grade12GWA",
        "Sex"
    ];
    const [Csv,setCsv]=useState<File | null |undefined>()
    const  closeBtnRef= useRef<HTMLButtonElement>(null);
   const [loading,setLoading]=useState<boolean>(false)

    const [CsvError,setCsvError]=useState<{
        message:string,
        error:string[]
    }|null>(null)


    const [records,setRecords]=useState<IStudentData[]>()

    const onDrop = useCallback((acceptedFiles:File[]) => {
        setCsv(null)
        const file=acceptedFiles[0]
        if (acceptedFiles[0]?.type !== "text/csv") {
            return toast.error("Upload failed. Make sure the file is in .csv format.");

        }



        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,

                       complete: (results:Papa.ParseResult<IStudentData>) => {
                const parsedHeaders = results.meta.fields ?? [];

                const missingHeaders = expectedHeaders.filter(h => !parsedHeaders.includes(h));
                const extraHeaders = parsedHeaders.filter(h => !expectedHeaders.includes(h));

                if (missingHeaders.length > 0 || extraHeaders.length > 0) {
                    toast.error("Header mismatch detected!");

                    if (missingHeaders.length > 0) {
                        setCsvError({message:"Missing headers in your CSV",error:missingHeaders})

                    }

                    if (extraHeaders.length > 0) {
                        setCsvError({message:"Unexpected headers in your CSV",error:extraHeaders})
                    }
                    return
                }
                console.log(results.data)
                setRecords(results?.data)
                setCsvError(null)
                toast.success("Header match success");
                // Proceed with parsing full file
            },
            error: (err) => {
                console.error("CSV parse error", err);
            }
        });




        console.log(acceptedFiles)
        setCsv(acceptedFiles[0])
    }, [])


    const UploadCsv=async ()=>{
        setLoading(true)
     try {
        if (records){
            const { data, error } = await supabase
                .from('studentTable')
                .upsert(records,{
                    onConflict:"ID"
                })
                .select()
             if (data)
                 toast.success("Imported Successfully")

             if (error)  toast.error(error?.message)
        }
     }catch (e){
         toast.error("Something Went Wrong")
     }finally {
         setCsv(null)
         setLoading(false)
         closeBtnRef?.current?.click();
         await refetch()
     }
    }

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    function formatFileSize(bytes: number | undefined): string | null {
        if (!bytes) return null
        const units = ["B", "KB", "MB", "GB", "TB"];
        let i = 0;

        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }

        return `${bytes.toFixed(2)} ${units[i]}`;
    }

    return (
        <Sheet>
            <SheetTrigger ref={closeBtnRef}  asChild>
                <Button className={cn(buttonVariants({ variant:"outline",className:"rounded-md gap-1 text-muted-foreground hover:text-blue-500 border-black/30 CircularFont" }))} >
                    <FileUpIcon/>  Import</Button>
            </SheetTrigger>
            <SheetContent className="w-full lg:w-[640px]">
                <SheetHeader>
                    <SheetTitle className="CircularFont text-lg">Upload CSV</SheetTitle>
                    <SheetDescription className="">
                        Upload a CSV or TSV file. The first row should be the headers of the table, and your headers should not include any special characters other than hyphens (-) or underscores (_).
                        Tip: Datetime columns should be formatted as YYYY-MM-DD HH:mm:ss
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div  className="flex flex-col  items-center justify-center h-full w-full">
                        <div {...getRootProps()}
                               className="flex flex-col items-center justify-center w-full min-h-64  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-transparent dark:hover:bg-green-700/5  dark:bg-transparent hover:bg-green-300  ">
                            <div className="flex flex-col place-items-center w-full text-center  justify-center pt-5 pb-6">
                                <FileUpIcon size={35}/>
                                <p className="mb-2 pt-3  text-sm text-gray-500 dark:text-gray-400">
                                    <span className="CircularFont dark:text-[#3ECF8E] text-blue-600">Click to upload a file</span> or simply drag and drop it into this area.
                                    Ensure your file is properly formatted before submitting.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Accepted file type: <span className="font-medium">.csv (Comma-Separated Values)</span>
                                </p>

                            </div>
                            <input {...getInputProps()} id="dropzone-file" type="file" className="hidden"/>
                            {Csv &&   <p className="italic underline opacity-80">({Csv?.name} {formatFileSize(Csv?.size)})</p>
                            }


                        </div>

                    </div>

                </div>
                {CsvError &&    <div className="px-4 flex flex-col justify-between h-full">
                    <div className="py-2">
                        <p className="text-red-400 pb-1 ">{CsvError.message} :</p>
                        <div className="gap-2">
                            {CsvError.error.map((col)=> <Badge className="mr-1"  variant={"outline"}>{col}</Badge> )}
                        </div>
                    </div>

                    <div>
                        <div className='italic pb-1'>Tip: The header should follow this format:</div>

                        <div className=" gap-2 "> {expectedHeaders.map((col)=><Badge className="mr-1" variant={"outline"}>{col}</Badge>)}</div>

                    </div>
                </div>}
                <SheetFooter>
                    <Button onClick={UploadCsv} disabled={!!CsvError || loading} type="submit" className={"dark:bg-[#006239] dark:text-white"}>{loading && <Loader className={"animate-spin"}/>}Import File</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
