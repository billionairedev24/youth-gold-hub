import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const stats = [
  {
    title: "Total Members",
    value: "2,420",
    change: "+20%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Events",
    value: "45",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Messages",
    value: "1,210",
    change: "-5%",
    trend: "down",
    icon: MessageSquare,
  },
  {
    title: "Revenue",
    value: "$45,200",
    change: "+8.1%",
    trend: "up",
    icon: DollarSign,
  },
];

// Mock data for the attendance chart
const attendanceData = [
  { month: 'Jan', attendance: 150 },
  { month: 'Feb', attendance: 180 },
  { month: 'Mar', attendance: 200 },
  { month: 'Apr', attendance: 220 },
  { month: 'May', attendance: 190 },
  { month: 'Jun', attendance: 240 },
  { month: 'Jul', attendance: 280 },
  { month: 'Aug', attendance: 260 },
  { month: 'Sep', attendance: 300 },
  { month: 'Oct', attendance: 280 },
  { month: 'Nov', attendance: 290 },
  { month: 'Dec', attendance: 310 },
];

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-background h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 ml-1" />
                    )}
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

        <Card className="bg-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Attendance</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#DAA520" 
                    strokeWidth={2}
                    dot={{ fill: '#DAA520' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;