import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users, Calendar, MessageSquare, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Members",
      value: "156",
      icon: Users,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Events",
      value: "8",
      icon: Calendar,
      change: "+3",
      changeType: "positive",
    },
    {
      title: "Announcements",
      value: "24",
      icon: MessageSquare,
      change: "+5",
      changeType: "positive",
    },
    {
      title: "Engagement Rate",
      value: "78%",
      icon: BarChart3,
      change: "+2.5%",
      changeType: "positive",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your youth group</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;