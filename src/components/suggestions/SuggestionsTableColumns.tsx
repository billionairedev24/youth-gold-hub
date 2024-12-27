import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Suggestion } from "@/types/suggestions";
import { Checkbox } from "@/components/ui/checkbox";
import { SuggestionActions } from "./SuggestionActions";

export const getSuggestionsColumns = (): ColumnDef<Suggestion>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(row.original.createdAt, "PPP"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status) {
          case "approved":
            return "bg-green-100 text-green-800";
          case "rejected":
            return "bg-red-100 text-red-800";
          default:
            return "bg-yellow-100 text-yellow-800";
        }
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <SuggestionActions suggestion={row.original} />,
  },
];