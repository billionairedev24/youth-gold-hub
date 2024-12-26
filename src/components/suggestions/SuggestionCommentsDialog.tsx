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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  if (!suggestion) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }
    // Add comment logic here
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
    setNewComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{suggestion.title}</DialogTitle>
          <DialogDescription>
            Suggestion by {suggestion.authorName} on{" "}
            {format(suggestion.createdAt, "PPP")}
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-6">
          <div className="bg-accent/50 p-4 rounded-lg">
            <p className="text-sm text-foreground">{suggestion.description}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Comments</h4>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              {suggestion.comments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No comments yet</p>
              ) : (
                suggestion.comments.map((comment) => (
                  <div key={comment.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(comment.createdAt, "PPP")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Comment</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}