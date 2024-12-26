import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Suggestion } from "@/types/suggestions";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SuggestionCommentsDialogProps {
  suggestion: Suggestion | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuggestionCommentsDialog({
  suggestion,
  open,
  onOpenChange,
}: SuggestionCommentsDialogProps) {
  const [newComment, setNewComment] = useState("");

  if (!suggestion) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add comment logic here
    setNewComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{suggestion.title}</DialogTitle>
          <DialogDescription>
            Suggestion by {suggestion.authorName} on{" "}
            {format(suggestion.createdAt, "PPP")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p>{suggestion.description}</p>
          </div>
          <ScrollArea className="h-[200px] rounded-md border p-4">
            {suggestion.comments.map((comment) => (
              <div key={comment.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{comment.authorName}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(comment.createdAt, "PPP")}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button type="submit">Add Comment</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}