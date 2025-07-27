
import ErrorGif from "../assets/error.gif"

import {Link} from "react-router-dom";
function NotFoundPage() {
    return (
        <div className="flex w-full flex-col h-[100dvh] place-items-center justify-center">
            <h1 className="text-6xl Kerif absolute top-40">Oops!!</h1>
            <img className="aspect-vedio w-[700px]" src={ErrorGif} alt={""}  />
            <div className="flex absolute bottom-40 flex-col gap-2 text-center">
             <div >
                 <h3 className="Kerif  text-3xl">
                     Look like you're lost
                 </h3>

                 <p className="CircularFont">the page you are looking for is not available!</p>

             </div>
                <Link to={"/"}   className="bg-[#191919] rounded-md p-3 text-white CircularFont link_404">Go to Home</Link>
            </div>

        </div>
    );
}

export default NotFoundPage;