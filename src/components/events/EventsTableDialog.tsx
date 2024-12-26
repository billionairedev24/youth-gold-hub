import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Event {
  what: string;
  objectives: string;
  personnel: string;
  where: string;
  when: string;
  time: string;
}

interface EventsTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockEvents: Event[] = [
  {
    what: "[Interactive Discussion] Growing with Jesus",
    objectives: "Deepen our faith in God and love for Jesus as His disciples.",
    personnel: "Sis. Brittany (facilitator)",
    where: "Church Auditorium",
    when: "1/20",
    time: "3-4:30 p.m.",
  },
  {
    what: "[Interactive Discussion] Dating: A Kingdom or Secular Culture?",
    objectives: "Examine the concept of dating through the lens of a kingdom perspective",
    personnel: "Sis. Tosin & Bro. Bryan (facilitators)",
    where: "The Odeyemis' Home",
    when: "2/17",
    time: "3-4:30 p.m.",
  },
];

const EventsTableDialog = ({ open, onOpenChange }: EventsTableDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>All Upcoming Events</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">What</TableHead>
                <TableHead className="min-w-[300px]">Objective(s)</TableHead>
                <TableHead>Personnel</TableHead>
                <TableHead>Where</TableHead>
                <TableHead>When</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{event.what}</TableCell>
                  <TableCell>{event.objectives}</TableCell>
                  <TableCell>{event.personnel}</TableCell>
                  <TableCell>{event.where}</TableCell>
                  <TableCell>{event.when}</TableCell>
                  <TableCell>{event.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventsTableDialog;