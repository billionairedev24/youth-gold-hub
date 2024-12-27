import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useState, useEffect } from 'react';

// Initialize with empty data
const initialData = [
  { month: 'Jan', attendance: 0, average: 0 },
  { month: 'Feb', attendance: 0, average: 0 },
  { month: 'Mar', attendance: 0, average: 0 },
  { month: 'Apr', attendance: 0, average: 0 },
  { month: 'May', attendance: 0, average: 0 },
  { month: 'Jun', attendance: 0, average: 0 },
  { month: 'Jul', attendance: 0, average: 0 },
  { month: 'Aug', attendance: 0, average: 0 },
  { month: 'Sep', attendance: 0, average: 0 },
  { month: 'Oct', attendance: 0, average: 0 },
  { month: 'Nov', attendance: 0, average: 0 },
  { month: 'Dec', attendance: 0, average: 0 },
];

export const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState(initialData);

  useEffect(() => {
    // Load saved attendance data from localStorage
    const savedData = localStorage.getItem('attendanceData');
    if (savedData) {
      setAttendanceData(JSON.parse(savedData));
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={attendanceData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#DAA520" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#DAA520" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#f0f0f0" 
          vertical={false}
        />
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
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
          itemStyle={{ color: "#666" }}
          labelStyle={{ color: "#888" }}
        />
        <Legend 
          verticalAlign="top"
          height={36}
          iconType="circle"
        />
        <Area
          type="monotone"
          dataKey="attendance"
          stroke="#DAA520"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#attendanceGradient)"
          name="Monthly Attendance"
          dot={{ fill: "#DAA520", strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="average"
          stroke="#94A3B8"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#averageGradient)"
          name="Running Average"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};