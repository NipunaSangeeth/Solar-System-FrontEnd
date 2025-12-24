import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 bg-slate-200 w-full">
          <SidebarTrigger className="block" />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}
