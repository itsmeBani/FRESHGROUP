import {supabase} from "@/utils/supabase.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { toast } from "sonner";

const deleteRecord = async (id: string) => {

    console.log(id)
   try {

       const { data, error } = await supabase
           .from('studentTable')
           .delete()
           .eq('ID', id)
           .select()

       console.log(data)
       console.log(error)
   }catch (e){
       console.log(e)
   }
};

export function useDeleteRecord() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clustered-student-data"] });
            toast.success("Successfully Deleted")
        },
        onError: (error: Error) => {
            console.error("Delete failed:", error.message);
        },
    });
}