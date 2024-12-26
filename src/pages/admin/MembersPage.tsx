import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MembersTable } from "@/components/members/MembersTable";
import { Member } from "@/types/members";

const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    imageUrl: "/placeholder.svg",
    email: "john@example.com",
    socialMedia: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
    role: "Member",
  },
];

const MembersPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Members</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Members Management</h2>
        </CardHeader>
        <CardContent>
          <MembersTable data={mockMembers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPage;