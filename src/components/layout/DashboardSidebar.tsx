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
  Calendar,
  MessageSquare,
  Users,
  Settings,
  BarChart2,
  Bell,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
  { title: "Events", icon: Calendar, url: "/admin/events" },
  { title: "Announcements", icon: Bell, url: "/admin/announcements" },
  { title: "Polls", icon: FileText, url: "/admin/polls" },
  { title: "Members", icon: Users, url: "/admin/members" },
  { title: "Analytics", icon: BarChart2, url: "/admin/analytics" },
  { title: "Messages", icon: MessageSquare, url: "/admin/messages" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
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
        transition-all duration-300 overflow-hidden
        ${isOpen ? (isMobile ? 'w-full' : 'w-64') : 'w-16'}
      `}
    >
      <SidebarContent>
        <div className={`flex items-center p-4 ${!isOpen ? 'justify-center' : ''}`}>
          <div className="text-primary text-2xl font-bold">GYA</div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      flex items-center w-full px-4 py-2 hover:bg-sidebar-hover rounded-lg transition-colors
                      ${!isOpen ? 'justify-center' : ''}
                    `}
                  >
                    <Link 
                      to={item.url} 
                      className={`flex items-center ${isOpen ? 'space-x-3' : ''}`}
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      {isOpen && <span className="text-gray-700">{item.title}</span>}
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
};

export default DashboardSidebar;