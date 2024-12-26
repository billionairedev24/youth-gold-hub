import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  time: string;
}

export const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", message: "New prayer request from John", time: "5m ago" },
    { id: "2", message: "Youth meeting tomorrow at 7 PM", time: "1h ago" },
    { id: "3", message: "Sarah commented on your prayer request", time: "2h ago" },
  ]);

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white">
        <div className="flex flex-col max-h-[400px] overflow-auto">
          <div className="px-4 py-3 font-medium border-b">
            Notifications ({notifications.length})
          </div>
          {notifications.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-accent border-b last:border-b-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{notification.message}</span>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteNotification(notification.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};