import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Poll } from "@/types/polls";
import { Badge } from "@/components/ui/badge";

interface PollsTableProps {
  data: Poll[];
}

export function PollsTable({ data }: PollsTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-lg text-muted-foreground">No polls found</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Options</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((poll) => (
            <TableRow key={poll.id}>
              <TableCell>{poll.title}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {poll.options.map((option) => (
                    <li key={option.id}>
                      {option.text} ({option.votes} votes)
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{format(poll.startDate, "PPP")}</TableCell>
              <TableCell>{format(poll.endDate, "PPP")}</TableCell>
              <TableCell>
                <Badge variant={poll.isActive ? "default" : "secondary"}>
                  {poll.isActive ? "Active" : "Ended"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}