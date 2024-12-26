import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Suggestion } from "@/types/suggestions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Check, X } from "lucide-react";
import { useState } from "react";
import { SuggestionCommentsDialog } from "./SuggestionCommentsDialog";
import { useToast } from "@/hooks/use-toast";

interface SuggestionsTableProps {
  data: Suggestion[];
}

export function SuggestionsTable({ data }: SuggestionsTableProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (suggestion: Suggestion, newStatus: 'approved' | 'rejected') => {
    // Handle status change logic here
    toast({
      title: `Suggestion ${newStatus}`,
      description: `The suggestion has been ${newStatus}.`,
    });
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-lg text-muted-foreground">No suggestions found</p>
      </div>
    );
  }

  const getStatusColor = (status: Suggestion["status"]) => {
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
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="max-w-[400px]">Description</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((suggestion) => (
              <TableRow key={suggestion.id}>
                <TableCell className="font-medium">{suggestion.title}</TableCell>
                <TableCell className="max-w-[400px] truncate">
                  {suggestion.description}
                </TableCell>
                <TableCell>{suggestion.authorName}</TableCell>
                <TableCell>{format(suggestion.createdAt, "PPP")}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(suggestion.status)}`}>
                    {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {suggestion.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(suggestion, 'approved')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(suggestion, 'rejected')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSuggestion(suggestion)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="ml-2">{suggestion.comments.length}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <SuggestionCommentsDialog
        suggestion={selectedSuggestion}
        open={!!selectedSuggestion}
        onOpenChange={(open) => !open && setSelectedSuggestion(null)}
      />
    </>
  );
}