import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { auth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface UserMenuProps {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  profileImage: string | null;
}

const UserMenu = ({ onProfileClick, onSettingsClick, profileImage }: UserMenuProps) => {
  const navigate = useNavigate();
  const user = auth.getCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/signin");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Avatar className="h-8 w-8">
            {profileImage && <AvatarImage src={profileImage} />}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          onProfileClick();
          setIsOpen(false);
        }}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          onSettingsClick();
          setIsOpen(false);
        }}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;