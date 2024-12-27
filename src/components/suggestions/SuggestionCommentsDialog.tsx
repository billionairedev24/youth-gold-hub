import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Suggestion } from "@/types/suggestions";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface SuggestionCommentsDialogProps {
  suggestion: Suggestion;
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

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Comment added successfully",
    });
    setNewComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] w-[95vw] h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">{suggestion.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full overflow-hidden p-6 pt-2">
          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium">Description</p>
            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          </div>
          <div className="flex-1 min-h-0 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Comments</h4>
              <span className="text-xs text-muted-foreground">
                {suggestion.comments.length} comments
              </span>
            </div>
            <ScrollArea className="h-[calc(100%-180px)] rounded-md border p-4">
              <div className="space-y-4">
                {suggestion.comments.map((comment) => (
                  <div key={comment.id} className="space-y-1 pb-3 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(comment.createdAt, "PPp")}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-2 pt-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <Button onClick={handleAddComment} className="w-full">
              Add Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}