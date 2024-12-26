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
  DollarSign,
  Lightbulb,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/admin" },
  { title: "Events", icon: Calendar, url: "/admin/events" },
  { title: "Announcements", icon: MessageSquare, url: "/admin/announcements" },
  { title: "Polls", icon: Vote, url: "/admin/polls" },
  { title: "Budget", icon: DollarSign, url: "/admin/budget" },
  { title: "Suggestions", icon: Lightbulb, url: "/admin/suggestions" },
  { title: "Analytics", icon: BarChart3, url: "/admin/analytics" },
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
        transition-all duration-300 
        ${isOpen ? (isMobile ? 'w-full' : 'w-64') : 'w-0 -translate-x-full'}
      `}
    >
      <SidebarContent>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-primary font-bold text-xl transition-all duration-300`}>
            Youth Admin
          </h1>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
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
                    className="flex items-center w-full px-4 py-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <Link to={item.url} className="flex items-center space-x-3" onClick={() => isMobile && setIsOpen(false)}>
                      <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="transition-all duration-300">
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