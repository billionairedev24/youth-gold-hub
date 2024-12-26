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
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { SuggestionCommentsDialog } from "./SuggestionCommentsDialog";

interface SuggestionsTableProps {
  data: Suggestion[];
}

export function SuggestionsTable({ data }: SuggestionsTableProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

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
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((suggestion) => (
              <TableRow key={suggestion.id}>
                <TableCell>{suggestion.title}</TableCell>
                <TableCell>{suggestion.description}</TableCell>
                <TableCell>{suggestion.authorName}</TableCell>
                <TableCell>{format(suggestion.createdAt, "PPP")}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(suggestion.status)}>
                    {suggestion.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSuggestion(suggestion)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {suggestion.comments.length}
                  </Button>
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