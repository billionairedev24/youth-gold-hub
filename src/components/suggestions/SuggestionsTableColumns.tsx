import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Suggestion } from "@/types/suggestions";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

export const getSuggestionsColumns = (
  onView: (suggestion: Suggestion) => void,
  onReview: (suggestion: Suggestion) => void
): ColumnDef<Suggestion>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "PPp"),
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
          case "closed":
            return "bg-gray-100 text-gray-800";
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
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(row.original)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReview(row.original)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Edit className="h-4 w-4" />
          Review
        </Button>
      </div>
    ),
  },
];