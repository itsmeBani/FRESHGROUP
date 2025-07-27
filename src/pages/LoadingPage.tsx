
import dinoJSON from "../assets/dino.json"
import Lottie from "react-lottie";

export default function LoadingPage() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: dinoJSON,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className={"flex  h-[100dvh]"}>
           <div className="place-items-center flex pb-10 justify-center w-full h-full">
               <Lottie
                   options={defaultOptions}
                   height={500}
                   width={400}
               />
           </div>
        </div>
    );
}
