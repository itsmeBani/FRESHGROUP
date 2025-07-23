import {
    type ColumnDef,
    type ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, type SortingState
} from "@tanstack/table-core";
import {useReactTable, type Table as TableS} from "@tanstack/react-table";
import {useState} from "react";
import {Input} from "../ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

import {Search} from "lucide-react";
import TableLayout from "@/components/table-component/_TableLayout.tsx";




interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function PermissionDataTable<TData, TValue>({columns, data,}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table: TableS<TData> = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            sorting,
            rowSelection
        }

    })


    return (

        <section className="flex flex-col gap-2">
            <div className="flex place-items-center gap-2  justify-end">



                <div className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm  pl-7 border  border-black/30"
                    />
                    <Search
                        className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"/>
                </div>
            </div>

            <TableLayout table={table} columnsLength={columns.length}/>
        </section>
    )
}