import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import UserMenu from "./navbar/UserMenu";
import ProfileDialog from "./navbar/ProfileDialog";
import SettingsDialog from "./navbar/SettingsDialog";
import { NotificationsDropdown } from "./navbar/NotificationsDropdown";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const DashboardNavbar = ({ onMenuClick, showMenuButton = false }: DashboardNavbarProps) => {
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <nav className="w-full bg-white border-b border-gray-200 shrink-0">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="text-primary text-xl font-bold">GYA</div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {!isMobile && <NotificationsDropdown />}
          {isMobile && (
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Bell className="h-5 w-5" />
            </Button>
          )}
          
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