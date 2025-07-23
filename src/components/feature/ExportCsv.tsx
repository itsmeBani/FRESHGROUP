import {DownloadIcon, Loader} from "lucide-react";
import { Button } from "../ui/button.tsx";
import {useState} from "react";
import type {IStudentData} from "@/Types.ts";


interface ExportProps {
    data:any,
    fileName:string,
}
const studentHeaders = [
    "STUDENT ID",
    "LASTNAME",
    "FIRSTNAME",
    "FAMILY INCOME",
    "TYPE OF SENIOR HIGH SCHOOL",
    "PROGRAM ENROLLED",
    "MUNICIPALITY OF ORIGIN",
    "GRADE 12 GWA",
    "SEX"
];


const ExportCSV = ({ data, fileName } :ExportProps) => {

 const [loading,setLoading]=useState<boolean>(false)
    const downloadCSV = async () => {
        setLoading(true)
     try {
         new Promise(resolve => setTimeout(resolve, 7000));
         const csvString = [
             studentHeaders,
             ...data.map((item :IStudentData )  =>
                 [
                     item.ID,
                     item.Lastname,
                     item.Firstname,
                     item.FamilyIncome,
                     item.TypeofSeniorHighSchool,
                     item.ProgramEnrolled,
                     item.MunicipalityOfOrigin,
                     item.Grade12GWA,
                     item.Sex,
                 ])
         ]
             .map(row => row.join(","))
             .join("\n")
         const blob = new Blob([csvString], { type: 'text/csv' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = fileName || 'download.csv';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
     }catch (e) {
         console.log(e)
     }finally {
         setLoading(false)
     }
    };

    return <Button disabled={loading}  onClick={downloadCSV} variant="outline" className="rounded-md gap-1 text-muted-foreground hover:text-blue-500 border-black/30 CircularFont">
        {loading ? <Loader className="animate-spin"/> :<DownloadIcon/>}Export
    </Button>

};

export default ExportCSV;