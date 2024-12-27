import { Poll } from "@/types/polls";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart2, Edit, Lock, Unlock, MoreHorizontal } from "lucide-react";

interface PollActionsProps {
  poll: Poll;
  onEdit?: (poll: Poll) => void;
  onToggleStatus?: (poll: Poll) => void;
  onViewStatistics?: (poll: Poll) => void;
}

export function PollActions({ 
  poll, 
  onEdit, 
  onToggleStatus,
  onViewStatistics 
}: PollActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewStatistics?.(poll)}>
          <BarChart2 className="mr-2 h-4 w-4" />
          View Statistics
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit?.(poll)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleStatus?.(poll)}>
          {poll.isActive ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Close Poll
            </>
          ) : (
            <>
              <Unlock className="mr-2 h-4 w-4" />
              Reopen Poll
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}