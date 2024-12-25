import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const CreateBudget = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New Budget</h1>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Budget Details</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Budget creation form will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateBudget;