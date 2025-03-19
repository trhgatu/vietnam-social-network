"use client";

import * as React from "react";
import { Home, Users, MessageSquareText, Bell } from "lucide-react";
import { NavMain } from "@/shared/layouts/main/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

const data = {
  navMain: [
    { key: "home", url: "/home", icon: Home },
    { key: "friends", url: "/friends", icon: Users },
    { key: "messages", url: "/messages", icon: MessageSquareText },
    { key: "notifications", url: "/notifications", icon: Bell },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
