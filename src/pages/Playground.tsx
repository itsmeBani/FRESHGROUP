import React, { useState } from 'react';
import {
    DndContext,
    useDraggable,
    useDroppable,
    type DragEndEvent,
} from '@dnd-kit/core';

import {CSS} from '@dnd-kit/utilities';
import {Button} from "@/components/ui/button.tsx";

function Playground() {
    const items = [
        "Lastname",
        "Firstname",
        "FamilyIncome",
        "TypeofSeniorHighSchool",
        "ProgramEnrolled",
        "MunicipalityOfOrigin",
        "Grade12GWA",
        "Sex" ];
const initialValue={

    "Lastname":null,
    "Firstname":null,
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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setItemLocations((prev) => ({
            ...prev,
            [active.id]: over?.id === 'drop-zone' ? 'drop-zone' : null,
        }));
    };

    const droppedItems = items.filter((id) => itemLocations[id] === 'drop-zone');
    const undroppedItems = items.filter((id) => itemLocations[id] === null);

    return (
       <div className={"overflow-hidden p-10"}>
           <DndContext  onDragEnd={handleDragEnd}>
               {/* Items outside */}
               <div className="flex min-h-[100px] gap-2 place-items-start  flex-wrap">
                   {undroppedItems.map((id) => (
                       <Draggable key={id} id={id}>
                           {id}
                       </Draggable>
                   ))}
               </div>
               {/*{JSON.stringify(droppedItems)}*/}
               {/* Drop zone always rendered */}
               <div className="">
                   <Droppable id="drop-zone">
                       {droppedItems.length === 0 ? (
                           <p className="text-gray-500">Drop columns to cluster it</p>
                       ) : (
                           droppedItems.map((id) => (
                               <Draggable key={id} id={id}>
                                   {id}
                               </Draggable>
                           ))
                       )}
                   </Droppable>
               </div>
               <Button className="m-10">Generate Profile</Button>
           </DndContext>
       </div>
    );
}

// Draggable Item
function Draggable({ id, children }: { id: string; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });


// Within your component that receives `transform` from `useDraggable`:
    const style = {
        transform: CSS.Translate.toString(transform),
    }


    return (
        <button className={"text-white px-5 py-2 rounded-md CircularFont bg-[#212121]"}

            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >

            {children}
        </button>
    );
}

// Droppable Container
function Droppable({ id, children }: { id: string; children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[150px] border-2   p-4 rounded  space-x-2 space-y-2 place-items-start  transition-all ${
                isOver ? 'ring-2 ring-green-400' : ''
            }`}
        >
            {children}
        </div>
    );
}

export default Playground;
