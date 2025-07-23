import type { IStudentData } from "@/Types";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {ArrowUpDown, EyeIcon, MoreHorizontal, PencilIcon, PrinterIcon, Trash2} from "lucide-react";
import { Badge } from "../ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Checkbox} from "@/components/ui/checkbox.tsx";



export const columns = (): ColumnDef<IStudentData>[] => useMemo(() => [
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Student Name
                    <ArrowUpDown />
                </Button>
            )},
        accessorFn: row => `${row.Firstname} ${row.Lastname}`,
        id: 'fullName',
        filterFn: (row, _columnId, filterValue) => {
            const firstname = row.original.Firstname.toLowerCase();
            const lastname = row.original.Lastname.toLowerCase();
            const fullName = `${firstname} ${lastname}`;
            const reverseFullName = `${lastname} ${firstname}`;
            const search = filterValue.toLowerCase();

            return (
                firstname.includes(search) ||
                lastname.includes(search) ||
                fullName.includes(search) ||
                reverseFullName.includes(search)
            );
        },
        enableColumnFilter: true,
    },
    {accessorKey: "FamilyIncome",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Family Income (₱)
                    <ArrowUpDown />
                </Button>
            )},

        filterFn:  (row, columnId, value) => {
            const val = row.getValue<number>(columnId);

            return val <= value
              },
        cell:({row})=> "₱"+row?.original?.FamilyIncome.toLocaleString()
    },
    {
        accessorKey: "TypeofSeniorHighSchool", header: "SHS Type",
        cell: ({row}) => (
            <Badge variant="outline"
                   className="CircularFont  dark:text-white/80 text-black/70 border-black/30 px-1.5">
                {row.original.TypeofSeniorHighSchool}
            </Badge>
        ),
        filterFn: (row, columnId, filterValue: string[]) => {
            if (filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        },

    },
    {accessorKey: "ProgramEnrolled", header: "Program"},
    {accessorKey: "MunicipalityOfOrigin", header: "Municipality"},
    {accessorKey: "Grade12GWA", header: "GWA"},
    { id: "Sex",accessorKey: "Sex", header: "Sex",
        filterFn: (row, columnId, filterValue: string[]) => {
            if (filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        },


    },
    {
        id: "actions",
        header: "Actions",
        cell:  () => {


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button  variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                            <PrinterIcon/>Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><EyeIcon/>View Student</DropdownMenuItem>
                        <DropdownMenuItem><PencilIcon/>Edit Student</DropdownMenuItem>
                        <DropdownMenuItem><Trash2/>Delete Student</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
], [])