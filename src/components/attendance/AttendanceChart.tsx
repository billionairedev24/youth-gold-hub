import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart
} from 'recharts';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Initialize with empty data
const initialData = [
  { month: 'Jan', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Feb', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Mar', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Apr', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'May', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Jun', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Jul', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Aug', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Sep', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Oct', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Nov', attendance: 0, men: 0, women: 0, average: 0 },
  { month: 'Dec', attendance: 0, men: 0, women: 0, average: 0 },
];

export const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState(initialData);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [averageAttendance, setAverageAttendance] = useState(0);
  const [genderRatio, setGenderRatio] = useState({ men: 0, women: 0 });

  useEffect(() => {
    // Load saved attendance data from localStorage
    const savedData = localStorage.getItem('attendanceData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setAttendanceData(parsedData);
      
      // Calculate statistics
      const nonZeroAttendance = parsedData.filter((month: any) => month.attendance > 0);
      const total = nonZeroAttendance.reduce((sum: number, month: any) => sum + month.attendance, 0);
      const average = nonZeroAttendance.length > 0 ? Math.round(total / nonZeroAttendance.length) : 0;
      
      const totalMen = nonZeroAttendance.reduce((sum: number, month: any) => sum + (month.men || 0), 0);
      const totalWomen = nonZeroAttendance.reduce((sum: number, month: any) => sum + (month.women || 0), 0);
      
      setTotalAttendance(total);
      setAverageAttendance(average);
      setGenderRatio({ men: totalMen, women: totalWomen });
    } else {
      // If no data exists, initialize localStorage with default data
      localStorage.setItem('attendanceData', JSON.stringify(initialData));
    }

    // Subscribe to storage events to update chart when attendance is added
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'attendanceData') {
        const newData = JSON.parse(e.newValue || '[]');
        setAttendanceData(newData);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">Men: {payload[0].value}</p>
          <p className="text-pink-600">Women: {payload[1].value}</p>
          <p className="text-gray-600">Average: {payload[2]?.value || 0}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600">Total Attendance</h3>
              <p className="text-3xl font-bold text-primary">{totalAttendance}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600">Average Attendance</h3>
              <p className="text-3xl font-bold text-primary">{averageAttendance}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600">Gender Ratio</h3>
              <p className="text-3xl font-bold text-primary">
                {genderRatio.men}:{genderRatio.women}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={attendanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Attendance Count', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                />
                <Bar 
                  dataKey="men" 
                  name="Men" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                />
                <Bar 
                  dataKey="women" 
                  name="Women" 
                  fill="#ec4899" 
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Average"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};