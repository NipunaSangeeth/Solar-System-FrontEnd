import {
  ChartColumn,
  ChartLine,
  LayoutDashboard,
  TriangleAlert,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-8 h-8" size={32}/>,
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomaly",
    icon: <TriangleAlert/>,
  },
  {
    title: "Analatics",
    url: "/dashboard/analytics",
    icon: <ChartLine/>,
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: <ChartColumn/>,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-xl font-bold text-foreground"}>
            Aelora
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={"mt-6 te"}>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                    {/* Convert it to react component item.icon */}
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
