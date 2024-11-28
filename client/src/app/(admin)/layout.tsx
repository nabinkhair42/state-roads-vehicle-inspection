import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(admin)/_components/helpers/app-sidebar";
import { AdminAuth } from "./_components/AdminAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuth>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
    </AdminAuth>
  );
}
