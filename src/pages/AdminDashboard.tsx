import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users, Calendar, MessageSquare, BarChart3, UserPlus, Bell, Settings, Shield } from "lucide-react";
import { auth } from "@/lib/auth";

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
      title: "New Registrations",
      value: "24",
      icon: UserPlus,
      change: "+8",
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
      title: "Pending Approvals",
      value: "12",
      icon: Shield,
      change: "+5",
      changeType: "neutral",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      link: "/admin/users"
    },
    {
      title: "Announcements",
      description: "Create and send notifications",
      icon: Bell,
      link: "/admin/announcements"
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      link: "/admin/settings"
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: BarChart3,
      link: "/admin/analytics"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-500 mt-2">Welcome back, {auth.getCurrentUser()?.name}</p>
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
                  <span className={
                    stat.changeType === "positive" 
                      ? "text-green-600" 
                      : stat.changeType === "negative" 
                      ? "text-red-600" 
                      : "text-gray-600"
                  }>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Card key={action.title} className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 py-2 border-b last:border-0">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;