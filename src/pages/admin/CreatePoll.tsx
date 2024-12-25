import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const CreatePoll = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New Poll</h1>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Poll Details</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Poll creation form will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;