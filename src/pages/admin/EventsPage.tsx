import { Card } from "@/components/ui/card";
import { CreateEventDialog } from "@/components/events/CreateEventDialog";
import { Button } from "@/components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Archive, Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface Event {
  id: string;
  what: string;
  objectives: string;
  personnel: string;
  where: string;
  when: string;
  time: string;
  status: 'active' | 'archived';
}

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "what",
      header: "What",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        return isEditing ? (
          <Input
            defaultValue={row.original.what}
            onChange={(e) => handleEdit(row.original.id, "what", e.target.value)}
          />
        ) : (
          row.original.what
        );
      },
    },
    {
      accessorKey: "objectives",
      header: "Objective(s)",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        return isEditing ? (
          <Input
            defaultValue={row.original.objectives}
            onChange={(e) => handleEdit(row.original.id, "objectives", e.target.value)}
          />
        ) : (
          row.original.objectives
        );
      },
    },
    {
      accessorKey: "personnel",
      header: "Personnel",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        return isEditing ? (
          <Input
            defaultValue={row.original.personnel}
            onChange={(e) => handleEdit(row.original.id, "personnel", e.target.value)}
          />
        ) : (
          row.original.personnel
        );
      },
    },
    {
      accessorKey: "where",
      header: "Where",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        return isEditing ? (
          <Input
            defaultValue={row.original.where}
            onChange={(e) => handleEdit(row.original.id, "where", e.target.value)}
          />
        ) : (
          row.original.where
        );
      },
    },
    {
      accessorKey: "when",
      header: "When",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        return isEditing ? (
          <Input
            defaultValue={row.original.when}
            onChange={(e) => handleEdit(row.original.id, "when", e.target.value)}
          />
        ) : (
          row.original.when
        );
      },
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        return isEditing ? (
          <Input
            defaultValue={row.original.time}
            onChange={(e) => handleEdit(row.original.id, "time", e.target.value)}
          />
        ) : (
          row.original.time
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const isEditing = row.original.id === editingId;
        const isArchived = row.original.status === 'archived';
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isEditing ? (
                <DropdownMenuItem onClick={() => setEditingId(null)}>
                  Save
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => setEditingId(row.original.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {!isArchived && (
                <DropdownMenuItem onClick={() => handleArchive(row.original.id)}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleEdit = (id: string, field: string, value: string) => {
    setData((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, [field]: value } : event
      )
    );
  };

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <CreateEventDialog />
        </div>
      </div>

      <Card className="p-6">
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No events found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventsPage;