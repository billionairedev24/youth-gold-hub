import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart2,
  Cloud,
  Network,
  Home,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Main", icon: Home, url: "/admin" },
  { title: "Analytics", icon: BarChart2, url: "/admin/analytics" },
  { title: "Cloud Storage", icon: Cloud, url: "/admin/storage" },
  { title: "Networking", icon: Network, url: "/admin/network" },
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin/dashboard" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar = ({ isOpen, setIsOpen }: DashboardSidebarProps) => {
  const isMobile = useIsMobile();

  return (
    <Sidebar
      className={`
        fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200
        transition-all duration-300 
        ${isOpen ? (isMobile ? 'w-full' : 'w-64') : 'w-0 -translate-x-full'}
      `}
    >
      <SidebarContent>
        <div className="flex items-center p-4">
          <div className="text-primary text-2xl font-bold">GYA</div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center w-full px-4 py-2 hover:bg-sidebar-hover rounded-lg transition-colors"
                  >
                    <Link 
                      to={item.url} 
                      className="flex items-center space-x-3"
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start px-4 py-2 text-gray-700 hover:bg-sidebar-hover rounded-lg"
          >
            <LogOut className="w-5 h-5 text-gray-500 mr-3" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;