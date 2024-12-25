import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="mr-4 hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;