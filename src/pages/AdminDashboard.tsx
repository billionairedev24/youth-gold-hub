import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  UserPlus, 
  Bell, 
  Settings, 
  Shield, 
  PlusCircle,
  Vote,
  DollarSign 
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Link } from "react-router-dom";

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
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Active Events",
      value: "8",
      icon: Calendar,
      change: "+27%",
      changeType: "positive",
    },
    {
      title: "Pending Approvals",
      value: "12",
      icon: Shield,
      change: "+20%",
      changeType: "neutral",
    },
  ];

  const quickActions = [
    { 
      title: "Create Event", 
      description: "Schedule a new event",
      icon: Calendar,
      link: "/admin/events/create"
    },
    {
      title: "Create Announcement",
      description: "Post a new announcement",
      icon: MessageSquare,
      link: "/admin/announcements/create"
    },
    {
      title: "Create Poll",
      description: "Start a new poll",
      icon: Vote,
      link: "/admin/polls/create"
    },
    {
      title: "Create Budget",
      description: "Add new budget entry",
      icon: DollarSign,
      link: "/admin/budget/create"
    }
  ];

  const recentActivities = [
    {
      icon: UserPlus,
      title: "New member registration",
      time: "2 minutes ago"
    },
    {
      icon: Calendar,
      title: "Youth Bible Study event created",
      time: "1 hour ago"
    },
    {
      icon: MessageSquare,
      title: "New announcement posted",
      time: "3 hours ago"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 w-full">
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
              <Link to={action.link} key={action.title}>
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <PlusCircle className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 py-2 border-b last:border-0">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No recent activity to display
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
