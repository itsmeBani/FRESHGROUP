import {queryOptions} from "@tanstack/react-query";
import type {Database} from "@/utils/DATABASETYPES.ts";
import {supabase} from "@/utils/supabase.ts";


export function fetchAllRole (){
    return queryOptions({
        queryKey:["role"],
        queryFn:getRole
    })
}

const getRole:()=>Promise<Database['public']['Tables']['role']['Row'][] | null>  = async ()=>{
    const { data } = await supabase
        .from("role")
        .select()
    return data
}