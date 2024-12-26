import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Welcome to Admin Dashboard</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Admin dashboard overview will be implemented here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;