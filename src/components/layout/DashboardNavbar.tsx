import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserMenu from "./navbar/UserMenu";
import ProfileDialog from "./navbar/ProfileDialog";
import SettingsDialog from "./navbar/SettingsDialog";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const DashboardNavbar = ({ onMenuClick, showMenuButton = false }: DashboardNavbarProps) => {
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="mr-4 hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-accent relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <UserMenu
            profileImage={profileImage}
            onProfileClick={() => setShowProfileDialog(true)}
            onSettingsClick={() => setShowSettingsDialog(true)}
          />
        </div>
      </div>

      <ProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />

      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
    </nav>
  );
};

export default DashboardNavbar;