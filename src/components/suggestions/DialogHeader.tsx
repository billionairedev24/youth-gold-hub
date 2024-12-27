import { Badge } from "@/components/ui/badge";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { User, Clock } from "lucide-react";
import { format } from "date-fns";

interface DialogHeaderProps {
  title: string;
  description: string;
  status: string;
  authorName: string;
  createdAt: Date;
  getStatusColor: (status: string) => string;
}

export function DialogHeader({
  title,
  description,
  status,
  authorName,
  createdAt,
  getStatusColor,
}: DialogHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-2">
        <DialogTitle className="text-xl font-semibold">
          {title}
        </DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{format(new Date(createdAt), "PPp")}</span>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={`${getStatusColor(status)}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    </div>
  );
}