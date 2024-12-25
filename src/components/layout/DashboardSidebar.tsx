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
import {
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  Vote,
  Home,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Events", icon: Calendar, url: "/events" },
  { title: "Announcements", icon: MessageSquare, url: "/announcements" },
  { title: "Polls", icon: Vote, url: "/polls" },
  { title: "Analytics", icon: BarChart3, url: "/analytics" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  return (
    <Sidebar
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
      style={{ position: 'absolute' }}
    >
      <SidebarContent>
        <div className="p-4">
          <h1 className={`text-primary font-bold ${isOpen ? "text-xl" : "text-sm text-center"}`}>
            Youth Admin
          </h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className={!isOpen ? "sr-only" : ""}>
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className={`${!isOpen ? "sr-only" : ""}`}>
                        {item.title}
                      </span>
                    </a>
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