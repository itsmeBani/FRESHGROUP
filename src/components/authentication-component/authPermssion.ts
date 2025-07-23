import type {USER} from "@/Types.ts";


export function hasPermission(user: USER  | null | undefined, permission: string) {
 return user?.permissions.includes(permission)
}

