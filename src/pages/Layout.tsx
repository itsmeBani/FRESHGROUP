import {
    Outlet,

} from "react-router-dom";
import {AppSidebar} from "@/components/sidebar-components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {SiteHeader} from "@/components/sidebar-components/site-header.tsx";


function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <SiteHeader/>
                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Layout;