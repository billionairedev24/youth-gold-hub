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
  const [menCount, setMenCount] = useState("");
  const [womenCount, setWomenCount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedDate = new Date(date);
    const monthIndex = selectedDate.getMonth();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get existing data or initialize with default
    const existingData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const newData = [...existingData];
    
    const totalAttendance = parseInt(menCount) + parseInt(womenCount);
    
    // Update attendance for the selected month
    const monthEntry = newData.find(entry => entry.month === monthNames[monthIndex]);
    if (monthEntry) {
      monthEntry.attendance = totalAttendance;
      monthEntry.men = parseInt(menCount);
      monthEntry.women = parseInt(womenCount);
      
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
      description: `Recorded ${totalAttendance} attendees (${menCount} men, ${womenCount} women) for ${monthNames[monthIndex]}`,
    });
    
    setMenCount("");
    setWomenCount("");
    setDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Attendance</DialogTitle>
          <DialogDescription>
            Add monthly attendance records with gender breakdown.
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
            <Label htmlFor="menCount">Number of Men</Label>
            <Input
              id="menCount"
              type="number"
              min="0"
              value={menCount}
              onChange={(e) => setMenCount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="womenCount">Number of Women</Label>
            <Input
              id="womenCount"
              type="number"
              min="0"
              value={womenCount}
              onChange={(e) => setWomenCount(e.target.value)}
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