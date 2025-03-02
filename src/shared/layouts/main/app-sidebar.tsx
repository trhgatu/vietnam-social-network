"use client"

import * as React from "react"
import {
  Home,
  Users,
  MessageSquareText,
  Bell,
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
      title: "Trang chủ",
      url: "/home",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Bạn bè",
      url: "/friends",
      icon: Users,
      items: [],
    },
    {
      title: "Tin nhắn",
      url: "/messages",
      icon: MessageSquareText,
      items: [],
    },
    {
      title: "Thông báo",
      url: "/notifications",
      icon: Bell,
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
