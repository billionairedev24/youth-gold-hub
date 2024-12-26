import { Card, CardHeader, CardContent } from "@/components/ui/card";

const MembersPage = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Members</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Members Management</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Members management interface will be implemented here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPage;