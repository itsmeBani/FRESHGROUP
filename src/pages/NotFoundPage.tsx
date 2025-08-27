

import {BubbleBackground} from "@/components/ui/shadcn-io/bubble-background";
import {Link} from "react-router-dom";
function NotFoundPage() {
    return (

      <div className="w-full h-[100dvh]">
          <BubbleBackground interactive={true}>
              <div className="relative h-full z-10">
                  <div className="flex place-items-center justify-center h-full flex-col gap-6 text-center">
                      <h1 className="text-8xl font-extrabold text-white Kerif">404</h1>
                      <h2 className="text-5xl font-bold text-white Kerif">Page Not Found</h2>
                      <div className="max-w-xl">
                          <p className="Kerif text-3xl text-nowrap text-white font-medium">
                              Oops! Looks like you’ve wandered off track.
                          </p>
                          <p className="CircularFont text-lg text-white mt-2">
                              The page you’re looking for doesn’t exist, has been moved, or is temporarily unavailable.
                          </p>
                      </div>
                      <Link
                          to={"/"}
                          className="bg-white text-black hover:bg-[#2a2a2a] hover:text-white transition-all duration-300 rounded-lg px-6 py-3 CircularFont link_404 shadow-md"
                      >
                          Back to Home
                      </Link>
                  </div>

              </div>

          </BubbleBackground>
      </div>
    );
}

export default NotFoundPage;