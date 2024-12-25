import { Bell, LogOut, Settings, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/auth";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const DashboardNavbar = ({ onMenuClick, showMenuButton = false }: DashboardNavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // This would come from your auth context in a real app
  const user = auth.getCurrentUser();
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/signin");
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    // Mock API call to update profile
    setTimeout(() => {
      auth.updateUserProfile({ name, email, phone });
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setShowProfileDialog(false);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationUpdate = (type: keyof typeof notificationPreferences) => {
    setNotificationPreferences(prev => {
      const newPreferences = {
        ...prev,
        [type]: !prev[type]
      };
      
      // Mock API call to update preferences
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      });
      
      return newPreferences;
    });
  };

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
          
          <DropdownMenu>
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
              <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSettingsDialog(true)}>
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
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {profileImage && <AvatarImage src={profileImage} />}
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={user?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" defaultValue={user?.phone} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notificationPreferences.email}
                onCheckedChange={() => handleNotificationUpdate('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via SMS
                </p>
              </div>
              <Switch
                checked={notificationPreferences.sms}
                onCheckedChange={() => handleNotificationUpdate('sms')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>WhatsApp Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via WhatsApp
                </p>
              </div>
              <Switch
                checked={notificationPreferences.whatsapp}
                onCheckedChange={() => handleNotificationUpdate('whatsapp')}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default DashboardNavbar;