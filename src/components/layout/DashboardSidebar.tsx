import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
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
  PlusCircle,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/admin" },
  { title: "Events", icon: Calendar, url: "/admin/events" },
  { title: "Announcements", icon: MessageSquare, url: "/admin/announcements" },
  { title: "Polls", icon: Vote, url: "/admin/polls" },
  { title: "Budget", icon: DollarSign, url: "/admin/budget" },
  { title: "Analytics", icon: BarChart3, url: "/admin/analytics" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
];

const createItems = [
  { title: "Create Event", icon: Calendar, url: "/admin/events/create" },
  { title: "Create Announcement", icon: MessageSquare, url: "/admin/announcements/create" },
  { title: "Create Poll", icon: Vote, url: "/admin/polls/create" },
  { title: "Create Budget", icon: DollarSign, url: "/admin/budget/create" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  return (
    <Sidebar
      className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
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
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className={`${!isOpen ? "sr-only" : ""}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={!isOpen ? "sr-only" : ""}>
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {createItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <PlusCircle className="w-5 h-5 text-primary" />
                      <span className={`${!isOpen ? "sr-only" : ""}`}>
                        {item.title}
                      </span>
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