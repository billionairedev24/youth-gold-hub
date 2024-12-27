import { Button } from "@/components/ui/button";
import { Check, X, Lock } from "lucide-react";
import { Suggestion } from "@/types/suggestions";

interface SuggestionActionsProps {
  suggestion: Suggestion;
  onAction: (action: 'approved' | 'rejected' | 'closed') => void;
}

export function SuggestionActions({ suggestion, onAction }: SuggestionActionsProps) {
  if (suggestion.status !== 'pending') return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        onClick={() => onAction('approved')}
      >
        <Check className="h-4 w-4 mr-2" />
        Approve
      </Button>
      <Button
        variant="outline"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => onAction('rejected')}
      >
        <X className="h-4 w-4 mr-2" />
        Reject
      </Button>
      <Button
        variant="outline"
        className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
        onClick={() => onAction('closed')}
      >
        <Lock className="h-4 w-4 mr-2" />
        Close
      </Button>
    </div>
  );
}