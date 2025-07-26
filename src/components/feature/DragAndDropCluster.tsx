import React, { useState } from 'react';
import {
    DndContext,
    useDraggable,
    useDroppable,
    type DragEndEvent,
} from '@dnd-kit/core';

import {CSS} from '@dnd-kit/utilities';
import {Button} from "@/components/ui/button.tsx";
import {GripVertical, RotateCw, Settings} from "lucide-react";

function DragAndDropCluster() {
    const items = [

        "FamilyIncome",
        "TypeofSeniorHighSchool",
        "ProgramEnrolled",
        "MunicipalityOfOrigin",
        "Grade12GWA",
        "Sex" ];

    const initialValue={

        "FamilyIncome":null,
        "TypeofSeniorHighSchool":null,
        "ProgramEnrolled":null,
        "MunicipalityOfOrigin":null,
        "Grade12GWA":null,
        "Sex":null,
    }


    const [itemLocations, setItemLocations] = useState<Record<string, string | null>>({
        ...initialValue
    });
   const [loading,setLoading]=useState(false)
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setItemLocations((prev) => ({
            ...prev,
            [active.id]: over?.id === 'drop-zone' ? 'drop-zone' : null,
        }));
    };

    const GenerateClusterProfile=async ()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },3900)
    }


    const droppedItems = items.filter((id) => itemLocations[id] === 'drop-zone');
    const undroppedItems = items.filter((id) => itemLocations[id] === null);

    return (
        <div className={"overflow-hidden flex flex-col place-items-start  gap-5 "}>
            <DndContext   onDragEnd={handleDragEnd}>

                <div style={{height:undroppedItems.length <=0 ? 100 : undefined}} className="flex border-[1.5px]  w-full p-3 rounded-sm  gap-2 place-items-start  flex-wrap">
                    {undroppedItems.map((id) => (
                        <Draggable key={id} id={id}>
                            {id}
                        </Draggable>
                    ))}
                </div>

                <div className="w-full h-full">
                    <Droppable id="drop-zone">
                        {droppedItems.length === 0 ? (
                            <div className="text-gray-500 flex place-items-center justify-center  w-full  h-full ">
                                <div className="flex flex-col place-items-center p-10">

                                    <svg  className="h-30 w-30 fill-[#444] dark:fill-[#fff]"  viewBox="0 0 16 16" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <path
                                              d="M14 12c-0.372 0.011-0.716 0.121-1.008 0.305l-2.212-2.155c0.434-0.547 0.708-1.239 0.74-1.993l1.57-0.157c0.225 0.556 0.76 0.941 1.385 0.941 0.823 0 1.49-0.667 1.49-1.49s-0.667-1.49-1.49-1.49c-0.749 0-1.368 0.552-1.474 1.271l-1.591 0.128c-0.224-1.136-0.973-2.060-1.978-2.521l0.308-0.839h0.26c1.099-0.008 1.986-0.9 1.986-2 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.742 0.404 1.39 1.004 1.735l-0.27 0.855c-0.227-0.054-0.487-0.084-0.754-0.084-0.83 0-1.59 0.296-2.181 0.789l-2.994-3.004c0.141-0.224 0.225-0.497 0.225-0.79 0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 0.823 0.663 1.492 1.484 1.5 0.281-0.001 0.544-0.079 0.767-0.214l2.993 3.004c-0.474 0.588-0.76 1.344-0.76 2.168 0 0.015 0 0.030 0 0.045-0 0.058-0 0.108-0 0.158l-0.66 0.11c-0.313-0.72-1.019-1.214-1.839-1.214-1.105 0-2 0.895-2 2s0.895 2 2 2c1.105 0 2-0.895 2-2 0-0.020-0-0.039-0.001-0.059l0.63-0.097c0.242 0.843 0.768 1.538 1.466 1.992l-0.556 1.188c-0.161-0.049-0.347-0.078-0.539-0.080-0.006-0-0.012-0-0.017-0-1.105 0-2 0.895-2 2s0.895 2 2 2c1.105 0 2-0.895 2-2 0-0.64-0.301-1.211-0.769-1.577l0.566-1.153c0.364 0.146 0.787 0.231 1.229 0.231 0.847 0 1.621-0.311 2.216-0.824l2.176 2.124c-0.25 0.33-0.4 0.748-0.4 1.2 0 1.105 0.895 2 2 2s2-0.895 2-2c0-1.105-0.895-2-2-2 0 0 0 0 0 0zM5 15c-0.552 0-1-0.448-1-1s0.448-1 1-1c0.552 0 1 0.448 1 1s-0.448 1-1 1zM8 10.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z"></path>
                                    </svg>
                                    <p className="text-center pt-5 text-[14px] dark:text-white min-w-full max-w-[400px]">
                                        Drag and drop the relevant columns here to visually organize and cluster similar
                                        data points for better analysis and understanding.
                                    </p>

                                </div>
                            </div>
                        ) : (
                            droppedItems.map((id) => (
                                <Draggable key={id} id={id}>
                                    {id}
                                </Draggable>
                            ))
                        )}
                    </Droppable>
                </div>

            </DndContext>
         <div className="flex gap-2 w-full justify-end">
             <Button onClick={()=>setItemLocations(initialValue)}><RotateCw/></Button>
             <Button onClick={GenerateClusterProfile}  className="">{loading ? <><Settings className="animate-spin"/>Generating </>: "Generate Profile"}</Button>
         </div>
        </div>
    );
}


function Draggable({id, children}: { id: string; children: React.ReactNode }) {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({id});



    const style = {
        transform: CSS.Translate.toString(transform),

    }


    return (
        <button
            className={"shadow-xs dark:bg-[#212121] cursor-grab select-none relative pr-3     overflow-hidden flex place-items-center gap-1 px-2 bg-background rounded-sm border-[1.2px] py-2  CircularFont "}

            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {isDragging && <div className="absolute h-full w-1 left-0 bg-indigo-400"/>}
            <GripVertical color={isDragging ? "#818cf8" : "gray"} size={15}/>{children}
        </button>
    );
}


function Droppable({id, children}: { id: string; children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[130px] border-[1.5px] m-[1px] select-none flex  flex-wrap    p-4 rounded  space-x-2 space-y-2 place-items-start  transition-all ${
                isOver ? 'ring-[1px] ring-indigo-400' : ''
            }`}
        >
            {children}
        </div>
    );
}

export default DragAndDropCluster;
