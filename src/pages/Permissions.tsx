import {useQueries,} from "@tanstack/react-query";

import {fetchUserPermission, type IUserPermission} from "@/Query/fetchUserPermission.ts";
import type {ColumnDef} from "@tanstack/table-core";
import {useMemo} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    ArrowDown,
    ArrowUpDown, Loader,
    Settings, ShieldBan,
    Trash2, UserCheck
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import PermissionDataTable from "@/components/table-component/PermissionDataTable.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Popover, PopoverContent} from "@/components/ui/popover";
import {PopoverTrigger} from "@radix-ui/react-popover";
import {supabase} from "@/utils/supabase.ts";
import {fetchAllRole} from "@/Query/fetchAllRole.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {toast} from "sonner";
import LoadingState from "@/components/feature/LoadingState.tsx";
import {Navigate} from "react-router-dom";


function PermissionPage() {
    const {user}=useAuth()
    const results = useQueries({
        queries: [
            fetchUserPermission(),
            fetchAllRole(),
        ],
    })
    const [permission, roleList] = results;

    const permissionData = permission.data ?? []



    const DeleteUser=async (id:string)=>{

        toast.promise(async ()=> {

                const { data} = await supabase.auth.admin.deleteUser(
                    id
                )
                if (data){
                    await permission.refetch()
                    return data
                }
            }


            , {
            loading: 'Loading...',
            success: () => {
                return "Deleted Successfully";
            },
            error: 'Something Went Wrong Try again!',
        });


    }

    const UpdateRole = async (userID:string,roleID?:string)=>{


        toast.promise(async ()=> {
                const { error } = await supabase
                    .from('user')
                    .update({ role_id: roleID ?? null})
                    .eq('user_id', userID)

                console.log(error)
                if (error){
                  throw new Error(error?.message)
                }
                if (!error){
                    await roleList.refetch()
                    await permission.refetch()
                    return
                }

            }


            , {
                loading: 'Loading...',
                success: () => {
                    return "Updated Successfully";
                },
                error: 'Something Went Wrong Try again!',
            });

    }





    const columns: ColumnDef<IUserPermission>[] = useMemo(() => [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown/>
                    </Button>
                )
            },
            accessorKey: "email",
            enableColumnFilter: true,
        },
        {
            accessorKey: "role", header: "Role",
            cell: ({row}) => {

                return <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {row?.original?.role ?
                                    <Badge variant={"secondary"}
                                       className="hover:border-1 cursor-pointer hover:border-green-500 dark:bg-transparent dark:border-green-300 dark:text-green-300 bg-green-100/90 text-green-600">
                                    {row?.original?.role?.role_name}
                                </Badge> :

                                <Badge  variant={"secondary"} className="cursor-pointer text-black-600 hover:border-1 hover:border-gray-500">
                                    ANONYMOUS
                                </Badge>}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">

                                <DropdownMenuItem className=" p-0 gap-0 focus:bg-unset">
                                    <DropdownMenuLabel className="CircularFont leading-2 pt-3">Current
                                        Role:</DropdownMenuLabel>
                                    {row?.original?.role ?
                                        <Badge variant={"secondary"}
                                               className=" dark:bg-transparent dark:border-green-300 dark:text-green-300 bg-green-100/90 text-green-600">
                                            {row?.original?.role?.role_name}
                                        </Badge> :

                                        <Badge variant={"secondary"} className=" text-black-600">
                                            ANONYMOUS
                                        </Badge>}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuLabel className="CircularFont dark:text-white flex gap-2 place-items-center leading-2 text-black/60 ">Update
                                    Role {roleList.isPending && <Loader size={20} className="text-center  animate-spin"/> }</DropdownMenuLabel>

                                { roleList?.data?.map((list)=>{
                                    return <>
                                        {row?.original?.role?.role_name === list.role_name ? null :
                                            <DropdownMenuItem onClick={()=>UpdateRole(row?.original?.user_id,list?.role_id)}
                                                className="CircularFont text-[12px]"><UserCheck/>{list.role_name} </DropdownMenuItem>

                                            }
                                    </>
                                })}

                                {row.original.role   &&  <DropdownMenuItem onClick={()=>UpdateRole(row?.original?.user_id)}
                                                            className="CircularFont text-[12px]"><ShieldBan/>ANONYMOUS</DropdownMenuItem>
                                }
                                </DropdownMenuContent>
                        </DropdownMenu>


                </>
            }


        }
        ,
        {
            accessorKey: "permission", header: "Permission",

            cell: ({row}) => {

                return <>
                    {
                        row?.original.role ?
                            <Popover>
                                <PopoverTrigger
                                    className="border-[1px]  dark:border-white  border-black/30 px-2 py-1  cursor-pointer  CircularFont rounded-sm flex gap-1">Access<ArrowDown
                                    className="font-bold" size={17}/></PopoverTrigger>
                                <PopoverContent className={"p-0 overflow-hidden"}>
                                    <div className="flex flex-col ">
                                        <div className="p-3">
                                            <h1 className="CircularFont font-bold text-black-300">User Permissions</h1>
                                            <p className=" font-normal text-sm text-muted-foreground leading-2">This are
                                                the allowed access to this role</p>
                                        </div>
                                        <hr/>
                                        {row?.original.role?.role_permission.map((permission) => {

                                            return (
                                                <div className="w-full hover:bg-gray-100 px-3 py-3 ">
                                                    <h1 className="CircularFont text-[13px]">{permission?.permission?.permission_name}</h1>
                                                    <p className=" text-muted-foreground leading-2 text-[14px]">{permission?.permission?.Description}</p>
                                                </div>
                                            )
                                        })
                                        }

                                    </div>


                                </PopoverContent>
                            </Popover> : <p className="CircularFont text-red-500">Unauthorized</p>}
                </>

            }

        },
        {accessorKey: "created_at", header: "Created At",cell:({row})=>

                new Date(row.getValue("created_at")).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                    timeZone: 'Asia/Manila'
                })
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({row}) => {


                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <Settings className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={()=>DeleteUser(row?.original?.user_id)} variant={"destructive"} className="CircularFont"><Trash2/>Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], [roleList,permission])


    if (user?.role !== "REGISTRAR") return <Navigate to="/" replace />;
    return (
        <section className="p-5 ">
            {permission.isPending && <LoadingState/>}
            <PermissionDataTable columns={columns} data={permissionData}/>

        </section>
    );
}

export default PermissionPage;