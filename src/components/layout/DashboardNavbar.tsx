import { Bell } from "lucide-react";
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
    <nav className="w-full bg-white border-b border-gray-200 shrink-0">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary rounded-full p-3">
            <span className="text-white font-bold text-xl">GYA</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-accent relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
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