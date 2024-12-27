import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Poll } from "@/types/polls";
import { PollStatistics } from "./PollStatistics";

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