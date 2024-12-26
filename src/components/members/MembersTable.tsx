import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member } from "@/types/members";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface MembersTableProps {
  data: Member[];
}

export function MembersTable({ data }: MembersTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-lg text-muted-foreground">No members found</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Social Media</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {member.name}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {member.socialMedia.facebook && (
                    <a
                      href={member.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialMedia.twitter && (
                    <a
                      href={member.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialMedia.instagram && (
                    <a
                      href={member.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialMedia.linkedin && (
                    <a
                      href={member.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}