import { format } from "date-fns";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SuggestionComment } from "@/types/suggestions";

interface CommentsListProps {
  comments: SuggestionComment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <MessageSquare className="h-4 w-4" />
        Comments ({comments.length})
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {comments.map((comment) => (
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
          ))}
          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No comments yet</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}