import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { SuggestionComment } from "@/types/suggestions";

interface CommentSectionProps {
  comments: SuggestionComment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  onAddComment: () => void;
  readOnly?: boolean;
}

export function CommentSection({
  comments,
  newComment,
  setNewComment,
  onAddComment,
  readOnly = false
}: CommentSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <h3 className="font-medium">Comments</h3>
      </div>

      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {comment.authorName}
                  </span>
                  {comment.authorRole === 'admin' && (
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(comment.createdAt), "PPp")}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No comments yet</p>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="space-y-2">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Button 
            onClick={onAddComment}
            className="w-full"
          >
            Add Comment
          </Button>
        </div>
      )}
    </div>
  );
}