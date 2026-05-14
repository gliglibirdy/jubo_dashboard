import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function StackedBarChart({
  months,
  series,
  yAxisSuffix = '',
  height = 240,
  valueFormatter,
}) {
  const data = months.map((month, i) => ({
    month,
    ...series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] }), {}),
  }))
  const format = valueFormatter ?? ((v) => `${v}${yAxisSuffix}`)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}${yAxisSuffix}`}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          formatter={(value, name) => [format(value), name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => <span style={{ color: 'rgba(0,0,0,0.6)' }}>{value}</span>}
        />
        {series.map((s) => (
          <Bar
            key={s.name}
            dataKey={s.name}
            stackId="a"
            fill={s.color}
            maxBarSize={26}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
