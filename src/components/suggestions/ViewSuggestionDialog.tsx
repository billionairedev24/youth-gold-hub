import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Suggestion } from "@/types/suggestions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogHeader } from "./DialogHeader";
import { CommentSection } from "./CommentSection";

interface ViewSuggestionDialogProps {
  suggestion: Suggestion;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewSuggestionDialog({
  suggestion,
  open,
  onOpenChange,
}: ViewSuggestionDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] w-[95vw]">
        <DialogHeader
          title={suggestion.title}
          description="View suggestion details and comments"
          status={suggestion.status}
          authorName={suggestion.authorName}
          createdAt={suggestion.createdAt}
          getStatusColor={getStatusColor}
        />

        <ScrollArea className="max-h-[60vh] pr-6">
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{suggestion.description}</p>
            </div>

            <CommentSection
              comments={suggestion.comments}
              newComment=""
              setNewComment={() => {}}
              onAddComment={() => {}}
              readOnly
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}