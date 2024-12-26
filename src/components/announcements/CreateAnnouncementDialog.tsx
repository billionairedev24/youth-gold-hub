import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreateAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAnnouncement: (content: string) => void;
}

export function CreateAnnouncementDialog({
  open,
  onOpenChange,
  onCreateAnnouncement,
}: CreateAnnouncementDialogProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAnnouncement(content);
    setContent("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Create a new announcement that will be visible to all members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter announcement content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}