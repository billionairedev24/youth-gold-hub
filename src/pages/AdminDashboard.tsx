import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Heart, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AttendanceChart } from "@/components/attendance/AttendanceChart";
import { AttendanceInput } from "@/components/attendance/AttendanceInput";

const stats = [
  {
    title: "Total Members",
    value: "156",
    change: "+12",
    trend: "up",
    icon: Users,
  },
  {
    title: "Weekly Events",
    value: "4",
    change: "+1",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Volunteer Hours",
    value: "280",
    change: "+45",
    trend: "up",
    icon: Heart,
  },
  {
    title: "Bible Studies",
    value: "12",
    change: "+2",
    trend: "up",
    icon: ChartBar,
  },
];

const AdminDashboard = () => {
  const [showAttendanceInput, setShowAttendanceInput] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <Button 
          onClick={() => setShowAttendanceInput(true)}
          className="bg-primary hover:bg-primary/90"
        >
          Record Attendance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="flex items-center text-sm text-green-500">
                  {stat.change} this month
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AttendanceChart />

      <AttendanceInput 
        open={showAttendanceInput} 
        onOpenChange={setShowAttendanceInput}
      />
    </div>
  );
};

export default AdminDashboard;