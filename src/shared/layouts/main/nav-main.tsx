"use client"

import Link from "next/link"
import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
}

interface NavMainProps {
  items: NavItem[]
}
import { useAuth } from "@/shared/contexts/auth-context"
import { Separator } from "@/components/ui/separator"
export function NavMain({ items }: NavMainProps) {
  const { user } = useAuth();
  const pathname = usePathname()
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-6 rounded-md transition ${isActive
                    ? "bg-neutral-100 font-bold dark:bg-neutral-600"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
                    }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span className="text-base">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
        <Separator/>
        <SidebarMenuItem>
          <Link href={`/${user.username}/timeline`}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">@{user.username}</span>
              </div>

            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}