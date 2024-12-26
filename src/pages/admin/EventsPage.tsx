import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const EventsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Manage Events</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Events management interface will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;