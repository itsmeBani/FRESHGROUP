import {DownloadIcon, Loader} from "lucide-react";
import {Button} from "../ui/button.tsx";
import {useState} from "react";
import axios from "axios";
import {FAST_API_BASE_URL} from "../../../constant.ts";


interface ExportProps {
    data: any,
}


const ExportCSV = ({data}: ExportProps) => {

    const [loading, setLoading] = useState<boolean>(false)
    const downloadCSV = async () => {
        setLoading(true)

        try {
            const response = await axios.post(`${FAST_API_BASE_URL}/export-data`, data,

                {
                    responseType: "blob",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "students.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    };

    return <Button disabled={loading} onClick={downloadCSV} variant="outline"
                   className="rounded-md gap-1 text-muted-foreground hover:text-blue-500 border-black/30 CircularFont">
        {loading ? <Loader className="animate-spin"/> : <DownloadIcon/>}Export
    </Button>

};

export default ExportCSV;