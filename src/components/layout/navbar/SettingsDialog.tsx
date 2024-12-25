import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { toast } = useToast();
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const handleNotificationUpdate = (type: keyof typeof notificationPreferences) => {
    setNotificationPreferences(prev => {
      const newPreferences = {
        ...prev,
        [type]: !prev[type]
      };
      
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      });
      
      return newPreferences;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};

export default SettingsDialog;