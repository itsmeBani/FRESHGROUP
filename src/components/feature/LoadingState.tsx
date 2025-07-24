import {Loader} from "lucide-react";


function LoadingState() {
    return (

            <div className=" absolute text-center left-1/2 -translate-x-1/2  top-15 z-[100]   place-items-center ">
                       <div className="dark:bg-[#212121] bg-white shadow-lg border-1 p-2 rounded-full">
                           <Loader size={18} className="dark:text-[#3ECF8E] animate-spin"/>
                       </div>
            </div>


    );
}

export default LoadingState;