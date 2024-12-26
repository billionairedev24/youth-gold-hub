import { Button } from "@/components/ui/button";
import { MessageSquare, Eye } from "lucide-react";
import { Suggestion } from "@/types/suggestions";
import { SuggestionCommentsDialog } from "./SuggestionCommentsDialog";
import { useState } from "react";

interface SuggestionActionsProps {
  suggestion: Suggestion;
}

export function SuggestionActions({ suggestion }: SuggestionActionsProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowComments(true)}
        title="View Comments"
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
      <SuggestionCommentsDialog
        suggestion={suggestion}
        open={showComments}
        onOpenChange={setShowComments}
      />
    </div>
  );
}