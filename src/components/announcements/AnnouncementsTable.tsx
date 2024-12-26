import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Announcement } from "@/types/announcements";

interface AnnouncementsTableProps {
  data: Announcement[];
}

export function AnnouncementsTable({ data }: AnnouncementsTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-lg text-muted-foreground">No announcements found</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Announcement</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((announcement) => (
            <TableRow key={announcement.id}>
              <TableCell>{announcement.content}</TableCell>
              <TableCell>{format(announcement.createdAt, "PPP")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}