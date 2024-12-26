import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Announcement } from "@/types/announcements";

interface ViewAnnouncementDialogProps {
  announcement: Announcement | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewAnnouncementDialog({
  announcement,
  open,
  onOpenChange,
}: ViewAnnouncementDialogProps) {
  if (!announcement) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Announcement Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Content</h4>
            <p className="mt-1 text-sm text-gray-500">{announcement.content}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Created At</h4>
            <p className="mt-1 text-sm text-gray-500">
              {format(announcement.createdAt, "PPP")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}