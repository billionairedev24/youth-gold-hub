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
import { MessageSquare } from "lucide-react";

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
  const [comments, setComments] = useState(suggestion.comments);
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

    const newCommentObj = {
      id: `${Date.now()}`,
      content: newComment,
      createdAt: new Date(),
      authorName: "You", // In a real app, this would come from the authenticated user
    };

    setComments([...comments, newCommentObj]);
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
          <DialogTitle className="text-xl font-semibold">{suggestion.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full overflow-hidden p-6 pt-2">
          <div className="space-y-2 mb-4 bg-muted/50 p-4 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{suggestion.description}</p>
          </div>
          <div className="flex-1 min-h-0 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Comments</h4>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {comments.length} comments
              </span>
            </div>
            <ScrollArea className="flex-1 h-[calc(100%-180px)] rounded-lg border bg-card">
              <div className="p-4 space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="space-y-2 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {comment.authorName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.createdAt), "PPp")}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
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