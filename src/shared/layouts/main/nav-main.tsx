"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/shared/contexts/auth-context";
import { type LucideIcon } from "lucide-react";

interface NavItem {
  key: string;
  url: string;
  icon?: LucideIcon;
}

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-6 rounded-md transition ${
                    isActive
                      ? "bg-neutral-100 font-bold dark:bg-neutral-600"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`w-5 h-5 transition ${
                        isActive ? "text-primary dark:text-primary" : "text-neutral-500"
                      }`}
                    />
                  )}
                  <span className="text-base">{t(item.key)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        <Separator />
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
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">@{user.username}</span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
