import React from 'react'

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { TooltipProvider } from '@/components/ui/tooltip';

const DashBoardLayout = () => {
  return (
      <TooltipProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
              <SiteHeader />
          <div>
            <Outlet />
          </div>
            
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
  )
}

export default DashBoardLayout

