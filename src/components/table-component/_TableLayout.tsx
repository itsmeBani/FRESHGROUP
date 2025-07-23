
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {flexRender} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";

import {type Table as ITable} from "@tanstack/react-table";

interface TableLayoutProps <TData> {
    table:ITable<TData>
    columnsLength:number
}

function TableLayout<TData>({table,columnsLength} : TableLayoutProps<TData>) {
    return (
        <div className="rounded-md border dark:bg-[#191919] dark:border-white/20  border-black/30 p-2">


            <Table>
                <TableHeader className={"p-10"}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-black/30 py-2 ">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}
                                               className="CircularFont dark:text-white/80 pt-5 pb-3 text-gray-600 ">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow className="border-black/30 dark:border-white/10"
                                      key={row.id}
                                      data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}
                                               className="CircularFont dark:text-white/80 text-black/70 font-thin">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columnsLength} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 px-4 py-4">
                <div className="text-muted-foreground flex-1 text-sm CircularFont">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <p className="CircularFont text-muted-foreground">
                    {table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount()}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>

    );
}

export default TableLayout;