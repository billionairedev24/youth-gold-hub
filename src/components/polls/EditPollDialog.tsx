import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Poll } from "@/types/polls";
import { Plus, Minus } from "lucide-react";

interface EditPollDialogProps {
  poll: Poll | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (poll: Poll) => void;
}

export function EditPollDialog({
  poll,
  open,
  onOpenChange,
  onSave,
}: EditPollDialogProps) {
  const [title, setTitle] = useState(poll?.title || "");
  const [options, setOptions] = useState(
    poll?.options.map((opt) => ({ ...opt })) || []
  );
  const [startDate, setStartDate] = useState(
    poll?.startDate.toISOString().split("T")[0] || ""
  );
  const [endDate, setEndDate] = useState(
    poll?.endDate.toISOString().split("T")[0] || ""
  );

  useEffect(() => {
    if (poll) {
      setTitle(poll.title);
      setOptions(poll.options.map((opt) => ({ ...opt })));
      setStartDate(poll.startDate.toISOString().split("T")[0]);
      setEndDate(poll.endDate.toISOString().split("T")[0]);
    }
  }, [poll]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poll) return;

    const updatedPoll: Poll = {
      ...poll,
      title,
      options,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    onSave(updatedPoll);
    onOpenChange(false);
  };

  const addOption = () => {
    setOptions([...options, { id: Date.now().toString(), text: "", votes: 0 }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  if (!poll) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Poll</DialogTitle>
          <DialogDescription>
            Make changes to the poll details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Options</Label>
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = {
                          ...newOptions[index],
                          text: e.target.value,
                        };
                        setOptions(newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeOption(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}