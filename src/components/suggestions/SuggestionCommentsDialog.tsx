import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Suggestion } from "@/types/suggestions";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CommentsList } from "./CommentsList";
import { SuggestionActions } from "./SuggestionActions";

interface SuggestionCommentsDialogProps {
  suggestion: Suggestion;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuggestionUpdate: (updatedSuggestion: Suggestion) => void;
}

export function SuggestionCommentsDialog({
  suggestion,
  open,
  onOpenChange,
  onSuggestionUpdate,
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

    const newCommentObj = {
      id: `${Date.now()}`,
      content: newComment,
      createdAt: new Date(),
      authorName: "Admin",
      authorRole: "admin" as const,
    };

    const updatedSuggestion = {
      ...suggestion,
      comments: [...suggestion.comments, newCommentObj]
    };

    onSuggestionUpdate(updatedSuggestion);
    setNewComment("");
    
    toast({
      title: "Success",
      description: "Comment added successfully",
    });
  };

  const handleSuggestionAction = (action: 'approved' | 'rejected' | 'closed') => {
    const updatedSuggestion = {
      ...suggestion,
      status: action
    };

    onSuggestionUpdate(updatedSuggestion);
    
    toast({
      title: "Success",
      description: `Suggestion ${action} successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] w-[95vw] h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2 border-b sticky top-0 bg-background z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold">
                {suggestion.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{suggestion.authorName}</span>
                <span>•</span>
                <span>{format(new Date(suggestion.createdAt), "PPp")}</span>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={getStatusColor(suggestion.status)}
            >
              {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <p className="text-sm whitespace-pre-wrap">{suggestion.description}</p>
          </div>

          <SuggestionActions 
            suggestion={suggestion}
            onAction={handleSuggestionAction}
          />

          <Separator />

          <CommentsList comments={suggestion.comments} />

          <div className="space-y-2">
            <Textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <Button 
              onClick={handleAddComment}
              className="w-full"
            >
              Add Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}