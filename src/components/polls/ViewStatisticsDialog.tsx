import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Poll } from "@/types/polls";
import { PollStatistics } from "./PollStatistics";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewStatisticsDialogProps {
  poll: Poll;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewStatisticsDialog({
  poll,
  open,
  onOpenChange,
}: ViewStatisticsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => onOpenChange(false)}
        >
          <XCircle className="h-4 w-4" />
        </Button>
        <DialogHeader>
          <DialogTitle>{poll.title} - Statistics</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <PollStatistics poll={poll} />
        </div>
      </DialogContent>
    </Dialog>
  );
}