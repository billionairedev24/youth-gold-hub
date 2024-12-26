import { Card } from "@/components/ui/card";
import { CreateEventDialog } from "@/components/events/CreateEventDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Archive, Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Event } from "@/types/events";
import { EventsTable } from "@/components/events/EventsTable";
import { EditEventDialog } from "@/components/events/EditEventDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockEvents: Event[] = [
  {
    id: "1",
    what: "[Interactive Discussion] Growing with Jesus",
    objectives: "Deepen our faith in God and love for Jesus as His disciples.",
    personnel: "Sis. Brittany (facilitator)",
    where: "Church Auditorium",
    when: "1/20",
    time: "3-4:30 p.m.",
    status: 'active'
  },
  {
    id: "2",
    what: "[Interactive Discussion] Dating: A Kingdom or Secular Culture?",
    objectives: "Examine the concept of dating through the lens of a kingdom perspective",
    personnel: "Sis. Tosin & Bro. Bryan (facilitators)",
    where: "The Odeyemis' Home",
    when: "2/17",
    time: "3-4:30 p.m.",
    status: 'active'
  },
];

const EventsPage = () => {
  const [data, setData] = useState<Event[]>(mockEvents);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "what",
      header: "What",
    },
    {
      accessorKey: "objectives",
      header: "Objective(s)",
    },
    {
      accessorKey: "personnel",
      header: "Personnel",
    },
    {
      accessorKey: "where",
      header: "Where",
    },
    {
      accessorKey: "when",
      header: "When",
    },
    {
      accessorKey: "time",
      header: "Time",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingEvent(event)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleArchive(event.id)}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(event.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleArchive = (id: string) => {
    setData((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, status: 'archived' as const } : event
      )
    );
    toast({
      title: "Event Archived",
      description: "The event has been archived successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((event) => event.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully.",
    });
  };

  const handleSaveEdit = (updatedEvent: Event) => {
    setData((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    toast({
      title: "Event Updated",
      description: "The event has been updated successfully.",
    });
  };

  const exportToCSV = () => {
    const headers = ["What", "Objectives", "Personnel", "Where", "When", "Time"];
    const csvContent = [
      headers.join(","),
      ...data.map((event) =>
        [
          event.what,
          event.objectives,
          event.personnel,
          event.where,
          event.when,
          event.time,
        ]
          .map((field) => `"${field}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeEvents = data.filter(event => event.status === 'active');
  const archivedEvents = data.filter(event => event.status === 'archived');

  return (
    <div className="p-6 max-w-[100vw]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <CreateEventDialog />
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Events</TabsTrigger>
          <TabsTrigger value="archived">Archived Events</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card className="p-6">
            <EventsTable data={activeEvents} columns={columns} />
          </Card>
        </TabsContent>
        <TabsContent value="archived">
          <Card className="p-6">
            <EventsTable data={archivedEvents} columns={columns} />
          </Card>
        </TabsContent>
      </Tabs>

      <EditEventDialog
        event={editingEvent}
        open={!!editingEvent}
        onOpenChange={(open) => !open && setEditingEvent(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default EventsPage;