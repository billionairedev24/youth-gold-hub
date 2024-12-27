import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
    
    const selectedDate = new Date(date);
    const monthIndex = selectedDate.getMonth();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get existing data or initialize with default
    const existingData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const newData = [...existingData];
    
    // Update attendance for the selected month
    const monthEntry = newData.find(entry => entry.month === monthNames[monthIndex]);
    if (monthEntry) {
      monthEntry.attendance = parseInt(attendance);
      
      // Recalculate running average
      let sum = 0;
      let count = 0;
      newData.forEach((entry, idx) => {
        if (entry.attendance > 0) {
          sum += entry.attendance;
          count++;
          entry.average = Math.round(sum / count);
        }
      });
    }
    
    // Save updated data
    localStorage.setItem('attendanceData', JSON.stringify(newData));
    
    // Trigger storage event for chart update
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'attendanceData',
      newValue: JSON.stringify(newData)
    }));

    toast({
      title: "Attendance Recorded",
      description: `Recorded ${attendance} attendees for ${monthNames[monthIndex]}`,
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
          <DialogDescription>
            Add monthly attendance records to track young adult participation.
          </DialogDescription>
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