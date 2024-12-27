import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const attendanceData = [
  { month: 'Jan', attendance: 150, average: 145 },
  { month: 'Feb', attendance: 180, average: 155 },
  { month: 'Mar', attendance: 200, average: 165 },
  { month: 'Apr', attendance: 220, average: 175 },
  { month: 'May', attendance: 190, average: 170 },
  { month: 'Jun', attendance: 240, average: 180 },
  { month: 'Jul', attendance: 280, average: 190 },
  { month: 'Aug', attendance: 260, average: 195 },
  { month: 'Sep', attendance: 300, average: 200 },
  { month: 'Oct', attendance: 280, average: 205 },
  { month: 'Nov', attendance: 290, average: 210 },
  { month: 'Dec', attendance: 310, average: 215 },
];

export const AttendanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={attendanceData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="month" 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="attendance"
          stroke="#DAA520"
          strokeWidth={2}
          dot={{ fill: "#DAA520" }}
          name="Monthly Attendance"
        />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#94A3B8"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="Running Average"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};