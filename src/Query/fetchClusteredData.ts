import {queryOptions} from "@tanstack/react-query";
import axios from 'axios';
import type {IStudentData} from "@/Types.ts";

const BASE_URL="https://freshgroup-api.onrender.com"

// http://127.0.0.1:8000
// https://freshgroup-api.onrender.com/

export function fetchClusteredData (){
    return queryOptions({
        queryKey:["clustered-data"],
        queryFn:getClusterData
    })
}




export function fetchFamilyIncomeCategory(){
    return queryOptions({
        queryKey:["family-income-category"],
        queryFn:getFamilyIncome
    })
}

export function fetchCommonProgram(){
    return queryOptions({
        queryKey:["common-program"],
        queryFn:getCommonProgram
    })
}
export function fetchClusteredProfile(){
    return queryOptions({
        queryKey:["clustered-profile"],
        queryFn:({signal})=>getClusteredProfile(signal),

    })
}
const getClusterData:()=>Promise<IStudentData[]>  = async ()=>{
      const response=await axios.get(`${BASE_URL}/clustered-student-data`)
      return response.data
}
const getFamilyIncome = async ()=>{
    const response=await axios.get(`${BASE_URL}/clustered-family-income`)
    return response.data
}

const getCommonProgram = async ()=>{
    const response=await axios.get(`${BASE_URL}/clustered-common-program`)
    return response.data
}

const getClusteredProfile = async (signal:AbortSignal)=>{
    const response=await axios.get(`${BASE_URL}/cluster-student-profile`,{signal})
    return response.data
}