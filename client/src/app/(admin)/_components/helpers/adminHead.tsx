import React from 'react'
import { SidebarMenuButton } from '../../../../components/ui/sidebar'
import Image from 'next/image'
import Logo from "@/assets/logo.svg";

const AdminHead = () => {
  return (
    <><SidebarMenuButton
    size="lg"
    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
  >
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
      <Image src={Logo} alt="Logo" width={48} height={48} />
    </div>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-semibold">Admin Dashboard</span>
      <span className="truncate text-xs">AutoInspector</span>
    </div>
  </SidebarMenuButton></>
  )
}

export default AdminHead