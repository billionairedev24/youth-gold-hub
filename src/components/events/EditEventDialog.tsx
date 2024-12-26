import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/events";

interface EditEventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: Event) => void;
}

export function EditEventDialog({
  event,
  open,
  onOpenChange,
  onSave,
}: EditEventDialogProps) {
  if (!event) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedEvent = {
      ...event,
      what: formData.get("what") as string,
      objectives: formData.get("objectives") as string,
      personnel: formData.get("personnel") as string,
      where: formData.get("where") as string,
      when: formData.get("when") as string,
      time: formData.get("time") as string,
    };
    onSave(updatedEvent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="what" className="text-sm font-medium">
              What
            </label>
            <Input
              id="what"
              name="what"
              defaultValue={event.what}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="objectives" className="text-sm font-medium">
              Objectives
            </label>
            <Input
              id="objectives"
              name="objectives"
              defaultValue={event.objectives}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="personnel" className="text-sm font-medium">
              Personnel
            </label>
            <Input
              id="personnel"
              name="personnel"
              defaultValue={event.personnel}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="where" className="text-sm font-medium">
              Where
            </label>
            <Input
              id="where"
              name="where"
              defaultValue={event.where}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="when" className="text-sm font-medium">
              When
            </label>
            <Input
              id="when"
              name="when"
              defaultValue={event.when}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="time" className="text-sm font-medium">
              Time
            </label>
            <Input
              id="time"
              name="time"
              defaultValue={event.time}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}