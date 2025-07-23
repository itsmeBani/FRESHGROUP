import {MoonIcon, SidebarIcon, SunIcon} from "lucide-react"


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,

    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Separator} from "@/components/ui/separator.tsx"
import {useSidebar} from "@/components/ui/sidebar.tsx"

import {useTheme} from "@/hooks/useTheme.ts";


export function SiteHeader() {
    const {toggleSidebar} = useSidebar()
    const {setTheme, theme} = useTheme()

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b p-2 px-0">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon/>
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>

                        </BreadcrumbItem>

                    </BreadcrumbList>

                </Breadcrumb>


            </div>
            <div className="pr-4">
                {theme === "dark" ? <Button onClick={()=>setTheme("light")} variant={"outline"} className="p-0">
                        <SunIcon/>
                    </Button> :
                    <Button  onClick={()=>setTheme("dark")} variant={"outline"} className="p-0">
                        <MoonIcon/>
                    </Button>}
            </div>
        </header>
    )
}
