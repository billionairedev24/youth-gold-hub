import { Card, CardHeader, CardContent } from "@/components/ui/card";

const PollsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Polls</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Manage Polls</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Polls management interface will be implemented here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PollsPage;