import {
    type ColumnDef,
    type ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, type SortingState, type VisibilityState
} from "@tanstack/table-core";
import {useReactTable, type Table as TableS} from "@tanstack/react-table";

import {Button, buttonVariants} from "@/components/ui/button.tsx";

import {useState} from "react";
import {Input} from "../ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

import { RotateCcw, Search, SlidersHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import ExportCSV from "@/components/feature/ExportCsv.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {cn} from "@/lib/utils.ts";
import TableLayout from "@/components/table-component/_TableLayout.tsx";
import {ImportCsvFile} from "@/components/feature/ImportCsvFile.tsx";
import {hasPermission} from "@/components/authentication-component/authPermssion.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    hideColumns?: {actions:boolean}
    visibleFeature:{
        export_pdf:boolean
        import_pdf:boolean
    }
}

export default function StudentDataTable<TData, TValue>({columns,visibleFeature, data,hideColumns}: DataTableProps<TData, TValue>) {
    const {user}=useAuth()
    const [sorting, setSorting] = useState<SortingState>([])
    const [incomeRange,setIncomeRange]=useState<number[]>([0])
    const [rowSelection, setRowSelection] = useState({})

    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>(
        {...hideColumns}
    )

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        [

        ]
    )
    const table :TableS<TData> = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            sorting,
            columnVisibility,
            rowSelection
        }

    })
    const SelectedRowData=table?.getSelectedRowModel().flatRows.map((item)=>item.original)
    const ExportedCsvData =SelectedRowData.length > 0 ? SelectedRowData : table.getFilteredRowModel().rows.map((row) => row.original)
    const selectedSex = (table.getColumn("Sex")?.getFilterValue() as string[]) ?? [];
    const selectedSchoolType = (table.getColumn("TypeofSeniorHighSchool")?.getFilterValue() as string[]) ?? [];

    const newFilter =(selectedOption:string[],value:string)=>

        selectedOption.includes(value)
        ? selectedOption.filter((v) => v !== value)
        : [...selectedOption, value];


    const toggleSex = (value: string) => {
        if (newFilter(selectedSex,value)) table.getColumn("Sex")?.setFilterValue(newFilter(selectedSex,value));
    };
    const toggleSchoolType = (value: string) => {
        if (newFilter(selectedSchoolType,value)) table.getColumn("TypeofSeniorHighSchool")?.setFilterValue(newFilter(selectedSchoolType,value));
    };

    const FilterIncomeRange=(value:number[])=>{
        if (value[0] === 0)  table.getColumn("FamilyIncome")?.setFilterValue(null)
        setIncomeRange(value)
        table.getColumn("FamilyIncome")?.setFilterValue(value)
    }


    function ResetFilterOptions() {
        setIncomeRange([0])
        console.log(table?.getSelectedRowModel().flatRows.map((item)=>item.original))
        table.resetColumnFilters()
    }

    const PROGRAM_OPTIONS = [
        "BSIT",
        "BSCS",
        "BSEd",
        "BSEd",
        "BEEd",
        "BSBA",
        "BSHM",
        "BSTM",
        "BS Criminology",
        "BS Agriculture"
    ];
    return (

        <section className="flex flex-col gap-5">
            <div className="flex place-items-center gap-2  justify-end">
               <div className={"flex h-full  gap-2 justify-center place-items-center"}>
                   {table.getState().columnFilters?.map((item:any) => {
                       const isArray = Array.isArray(item.value)
                       if (item?.id === "fullName") return
                       if (isArray)
                       return (
                           <>
                               {item.value.map((value:string)=> <Badge >{item?.id === "FamilyIncome" && "₱"}{value.toLocaleString()}</Badge>) }
                           </>

                   )

                       return  <Badge >{item.value}</Badge>
                   })
                   }

               </div>

                {visibleFeature.export_pdf && <ExportCSV data={ExportedCsvData} />}

                {visibleFeature.import_pdf && (hasPermission(user,"INSERT:CSV") && <ImportCsvFile/>)}

                <DropdownMenu>
                    <DropdownMenuTrigger  className={cn(buttonVariants({ variant:"outline",className:"rounded-md gap-1 text-muted-foreground hover:text-blue-500 border-black/30 CircularFont" }))} >
                        <SlidersHorizontal/>Filter
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="lg:w-[300px] w-[200px]">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <p className="CircularFont px-2 text-sm">Sex</p>
                        <div className="flex gap-1 p-2">
                            <Button
                                onClick={()=>toggleSex("Male")}
                                variant={"outline"}
                                className="p-0 CircularFont h-auto">
                                <Badge   variant={selectedSex.includes("Male") ? "default" : "outline"}>Male</Badge>
                            </Button>
                            <Button  onClick={()=>toggleSex("Female")}
                                    variant={"outline"}
                                    className=" p-0 CircularFont  h-auto">
                                <Badge
                                    variant={selectedSex.includes("Female") ? "default" : "outline"}
                                >Female</Badge>
                            </Button>

                        </div>
                        <DropdownMenuSeparator/>
                        <p className="CircularFont px-3 text-sm">School Type</p>
                        <div className="flex gap-1 p-2">
                            <Button
                                onClick={()=>toggleSchoolType("Public")}
                                variant={"outline"}
                                className="p-0 CircularFont h-auto">
                                <Badge   variant={selectedSchoolType.includes("Public") ? "default" : "outline"}>Public</Badge>

                            </Button>

                            <Button  onClick={()=>toggleSchoolType("Private")}
                                     variant={"outline"}
                                     className=" p-0 CircularFont  h-auto">
                                <Badge
                                    variant={selectedSchoolType.includes("Private") ? "default" : "outline"}
                                >Private</Badge>
                            </Button>

                        </div>
                        <DropdownMenuSeparator/>
                        <p className="CircularFont px-3 text-sm">Family Income Range</p>
                        <p className="CircularFont px-3 py-1 text-sm">(₱) {incomeRange.toLocaleString()}</p>
                        <div className="flex gap-2 p-2">
                            <Slider className="text-green-200" value={incomeRange} onValueChange={(e)=>FilterIncomeRange(e)} defaultValue={[0]} max={100000} step={2}/>
                        </div>

                        <DropdownMenuSeparator/>
                        <p className="CircularFont px-3 text-sm">Programs</p>
                        <div className="flex gap-2 p-2">
                            <Select >
                                <SelectTrigger className="w-full">
                                    <SelectValue className="CircularFont" placeholder="Programs"/>
                                </SelectTrigger>
                                <SelectContent className="CircularFont">
                                    {PROGRAM_OPTIONS.map((value,index)=> <SelectItem value={value} key={index}>{value}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <DropdownMenuSeparator/>
                            <Button onClick={ResetFilterOptions}><RotateCcw/></Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <Input
                        placeholder="Filter names..."
                        value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("fullName")?.setFilterValue(event.target.value)
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