import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateEventDialog } from "@/components/events/CreateEventDialog";

const mockEvents = [
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

const EventsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <CreateEventDialog />
      </div>

      <Card className="p-6">
        <div className="rounded-md border">
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
      </Card>
    </div>
  );
};

export default EventsPage;