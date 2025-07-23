import type {Database} from "@/utils/DATABASETYPES.ts";


export interface IStudentData {
    ID: string;
    Lastname:string
    Firstname:string
    FamilyIncome: number;
    TypeofSeniorHighSchool: string;
    ProgramEnrolled: string;
    MunicipalityOfOrigin: string;
    Grade12GWA: number;
    Sex: string;
    cluster: number;
}
export interface USER {
    role: string | null | undefined
    user: Database['public']['Tables']['user']['Row']
    permissions: string[]
}
