import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Suggestion } from "@/types/suggestions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogHeader } from "./DialogHeader";
import { CommentSection } from "./CommentSection";
import { ActionButtons } from "./ActionButtons";

interface ReviewSuggestionDialogProps {
  suggestion: Suggestion;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuggestionUpdate: (updatedSuggestion: Suggestion) => void;
}

export function ReviewSuggestionDialog({
  suggestion,
  open,
  onOpenChange,
  onSuggestionUpdate,
}: ReviewSuggestionDialogProps) {
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
      comments: [...(suggestion.comments || []), newCommentObj]
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

  if (suggestion.status === 'closed') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[600px] w-[95vw] my-8">
          <div className="space-y-4">
            <DialogHeader
              title={suggestion.title}
              description={suggestion.description}
              status={suggestion.status}
              authorName={suggestion.authorName}
              createdAt={suggestion.createdAt}
              getStatusColor={getStatusColor}
            />
            <div className="text-center text-muted-foreground py-4">
              This suggestion is closed and cannot be reviewed.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] w-[95vw] my-8">
        <div className="flex flex-col space-y-4 max-h-[calc(100vh-120px)]">
          <DialogHeader
            title={suggestion.title}
            description={suggestion.description}
            status={suggestion.status}
            authorName={suggestion.authorName}
            createdAt={suggestion.createdAt}
            getStatusColor={getStatusColor}
          />

          <ScrollArea className="flex-1 h-[calc(100vh-300px)]">
            <div className="space-y-6 pr-4">
              <CommentSection
                comments={suggestion.comments}
                newComment={newComment}
                setNewComment={setNewComment}
                onAddComment={handleAddComment}
              />
            </div>
          </ScrollArea>

          <div className="pt-4 mt-2 border-t bg-background">
            <ActionButtons
              status={suggestion.status}
              onAction={handleSuggestionAction}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}