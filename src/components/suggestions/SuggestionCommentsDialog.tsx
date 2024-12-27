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
import { MessageSquare, Check, X, Lock } from "lucide-react";

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
      authorName: "Admin",
      status: "pending",
    };

    setComments([...comments, newCommentObj]);
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
    setNewComment("");
  };

  const handleCommentAction = (commentId: string, action: 'approve' | 'reject' | 'close') => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: action }
        : comment
    ));

    toast({
      title: "Success",
      description: `Comment ${action}d successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approve':
        return 'bg-green-100 text-green-800';
      case 'reject':
        return 'bg-red-100 text-red-800';
      case 'close':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
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
                <h4 className="text-sm font-medium">Comments ({comments.length})</h4>
              </div>
            </div>
            <ScrollArea className="flex-1 h-[calc(100%-180px)] rounded-lg border bg-card">
              <div className="p-4 space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="space-y-2 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {comment.authorName}
                        </span>
                        {comment.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(comment.status)}`}>
                            {comment.status}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.createdAt), "PPp")}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words flex-1">
                        {comment.content}
                      </p>
                      {comment.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleCommentAction(comment.id, 'approve')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleCommentAction(comment.id, 'reject')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-gray-600 hover:text-gray-700"
                            onClick={() => handleCommentAction(comment.id, 'close')}
                          >
                            <Lock className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
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