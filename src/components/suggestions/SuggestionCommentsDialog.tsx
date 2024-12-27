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
      status: "pending" as const,
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
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {suggestion.title}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({comments.length} comments)
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full p-6 pt-4">
          <div className="space-y-2 mb-4 bg-accent/50 p-4 rounded-lg border border-accent">
            <p className="text-sm font-medium text-foreground">Description</p>
            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          </div>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
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
                    <p className="text-sm leading-relaxed flex-1">
                      {comment.content}
                    </p>
                    {(!comment.status || comment.status === 'pending') && (
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleCommentAction(comment.id, 'approve')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleCommentAction(comment.id, 'reject')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
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
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="mt-4 pt-4 border-t">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none mb-2"
            />
            <Button 
              onClick={handleAddComment} 
              className="w-full"
              size="lg"
            >
              Add Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}