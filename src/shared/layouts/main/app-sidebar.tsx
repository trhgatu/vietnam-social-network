"use client"

import * as React from "react"
import {
  Home,
  Users,
  MessageSquareText,
} from "lucide-react"

import { NavMain } from "@/shared/layouts/main/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Friends",
      url: "/friends",
      icon: Users,
      items: [],
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageSquareText,
      items: [],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
