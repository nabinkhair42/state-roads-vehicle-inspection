"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const user = [
  {
    name: "Deepak Ojha",
    email: "deepakjha@gmail.com",
    avatar: "/avatar.jpg",
  },
];

export const AdminUser = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {user.map((item) => (
        <SidebarMenuItem key={item.email}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback className="rounded-lg">NK</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{item.name}</span>
              <span className="truncate text-xs">{item.email}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
