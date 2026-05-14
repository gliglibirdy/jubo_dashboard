import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

const sample = [
  { month: '10月', 住宿空床率: 18.1, 日照出席率: 86.4 },
  { month: '11月', 住宿空床率: 17.5, 日照出席率: 87.1 },
  { month: '12月', 住宿空床率: 17.2, 日照出席率: 87.9 },
  { month: '1月', 住宿空床率: 16.8, 日照出席率: 88.6 },
  { month: '2月', 住宿空床率: 16.4, 日照出席率: 89.4 },
  { month: '3月', 住宿空床率: 15.7, 日照出席率: 90.3 },
]

const axisStyle = {
  fontFamily: "'Noto Sans TC', sans-serif",
  fontSize: 12,
  fill: '#546E7A',
}

export default function OccupancyChart({ data = sample, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 16, right: 16, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
        <XAxis
          dataKey="month"
          tick={axisStyle}
          stroke="rgba(0,0,0,0.12)"
          tickLine={false}
        />
        <YAxis
          tick={axisStyle}
          stroke="rgba(0,0,0,0.12)"
          tickLine={false}
          axisLine={false}
          unit="%"
        />
        <Tooltip
          contentStyle={{
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 8,
            boxShadow: 'none',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 13,
          }}
          cursor={{ stroke: 'rgba(0,151,167,0.2)', strokeWidth: 2 }}
        />
        <Legend
          wrapperStyle={{
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: 13,
            color: '#546E7A',
          }}
        />
        <Line
          type="monotone"
          dataKey="住宿空床率"
          stroke="#0097A7"
          strokeWidth={2}
          dot={{ r: 3, fill: '#0097A7' }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="日照出席率"
          stroke="#005F64"
          strokeWidth={2}
          dot={{ r: 3, fill: '#005F64' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
