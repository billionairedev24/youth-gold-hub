import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";

const Index = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome to your youth group admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;