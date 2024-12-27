import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AttendanceInputProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AttendanceInput = ({ open, onOpenChange }: AttendanceInputProps) => {
  const { toast } = useToast();
  const [attendance, setAttendance] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the attendance data
    // For now, we'll just show a success message
    toast({
      title: "Attendance Recorded",
      description: `Recorded ${attendance} attendees for ${date}`,
    });
    
    setAttendance("");
    setDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attendance">Number of Attendees</Label>
            <Input
              id="attendance"
              type="number"
              min="0"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Attendance</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};