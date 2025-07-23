import {queryOptions} from "@tanstack/react-query";

import {supabase} from "@/utils/supabase.ts";
import type {Database} from "@/utils/DATABASETYPES.ts";



export interface IUserPermission {
    user_id: string
    created_at: string
    role_id: string | null
    email: string | null
    role: {
        role_name: string | null
        role_permission: {
            permission: {
                permission_name: string | null
               Description:string|null
            } | null }[]
    } | null

}

export function fetchUserPermission (){
    return queryOptions({
        queryKey:["user"],
        queryFn:getPermission
    })
}



export function fetchRolePermission (){
    return queryOptions({
        queryKey:["role_permission"],
        queryFn:getRolePermission
    })
}

const getRolePermission:()=>Promise<Database['public']['Tables']['role_permission']['Row'][]|null>  = async ()=>{

    const { data, error } = await supabase
        .from('role_permission')
        .select()

    if (error) return  null

    return data
}


//get each user permission
const getPermission:()=>Promise<IUserPermission[]>  = async ()=>{

    const {data} = await supabase
        .from('user')
        .select(`
      user_id,
      created_at,
      role_id,
      email,
      role:role_id (
        role_name,
        role_permission (
          permission:permission_id (
            permission_name,
            Description
        
          )
        )
      )
    `)
    return data ?? []
}