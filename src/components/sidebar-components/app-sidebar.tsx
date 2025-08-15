import * as React from "react"
import {
  ChartNetwork,

  Command
  , LayoutDashboardIcon,
  LifeBuoy,

  Send, UserLockIcon, Users,

} from "lucide-react"

import { NavMain } from "@/components/sidebar-components/nav-main.tsx"

import { NavUser } from "@/components/sidebar-components/nav-user.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import {useAuth} from "@/contexts/AuthContext.tsx";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {user}=useAuth()
  const data = {
    user: {
      name: user?.role,
      email: user?.user?.email,
      avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboardIcon,
        isActive: true,
        items: [
          // {
          //   title: "History",
          //   url: "#",
          // },
          // {
          //   title: "Starred",
          //   url: "#",
          // },
          // {
          //   title: "Settings",
          //   url: "#",
          // },
        ],
      },
      {
        title: "Student",
        url: "/students",
        icon: Users,
        items: [
        ],
      },
      {
        title: "Cluster",
        url: "/cluster-profile",
        icon: ChartNetwork,
        items: [
        ],
      },
      // {
      //   title: "Playground",
      //   url: "/playground",
      //   icon: PlayIcon,
      //   items: [
      //   ],
      // },

      {
        title: "Permission",
        url: "/permission",
        icon: UserLockIcon,
        items: [
        ],
      },

    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],

  }

  return (

    <Sidebar
      className="h-[100dvh]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FreshGroup</span>
                  <span className="truncate text-xs">HAHHAHAH</span>

                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
