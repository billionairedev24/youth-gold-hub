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
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

interface EventsTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Youth Bible Study",
    date: "March 20, 2024",
    time: "7:00 PM",
    location: "Main Hall",
    attendees: 15,
  },
  {
    id: "2",
    title: "Worship Night",
    date: "March 23, 2024",
    time: "6:30 PM",
    location: "Sanctuary",
    attendees: 25,
  },
  {
    id: "3",
    title: "Community Service",
    date: "March 25, 2024",
    time: "9:00 AM",
    location: "Community Center",
    attendees: 10,
  },
  {
    id: "4",
    title: "Young Adults Fellowship",
    date: "March 27, 2024",
    time: "7:30 PM",
    location: "Fellowship Hall",
    attendees: 20,
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
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Attendees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.attendees}</TableCell>
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