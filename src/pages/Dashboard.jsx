import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import GroupIcon from '@mui/icons-material/Group'
import BadgeIcon from '@mui/icons-material/Badge'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

import ServiceShareChart from '@/components/charts/ServiceShareChart'
import StackedBarChart from '@/components/charts/StackedBarChart'
import TrendLineChart from '@/components/charts/TrendLineChart'
import RevenueComposedChart from '@/components/charts/RevenueComposedChart'

import {
  reportDate,
  kpis,
  serviceTrend,
  serviceShareCurrent,
  staffTrend,
  turnoverTrend,
  revenueShareCurrent,
  revenueTrend,
  facilityRankings,
  facilityList,
  GRADE_CONFIG,
  TURNOVER_WARNING_THRESHOLD,
} from '@/features/overview/mockData'

// ── Color tokens ──────────────────────────────────────────
const WARNING = '#ED6C02'
const PRIMARY = '#0097A7'
const PRIMARY_DARK = '#005F64'

const KPI_ICONS = {
  serviceTotal: GroupIcon,
  staffTotal: BadgeIcon,
  monthlyRevenue: AttachMoneyIcon,
  ytdRevenue: AccountBalanceWalletIcon,
}

// ── Shared atoms ──────────────────────────────────────────

function DeltaRow({ delta }) {
  if (!delta) return null
  const color = delta.isWarning
    ? WARNING
    : delta.dir === 'flat'
      ? 'rgba(0,0,0,0.6)'
      : green[500]
  const Icon =
    delta.dir === 'up' ? ArrowUpwardIcon
    : delta.dir === 'down' ? ArrowDownwardIcon
    : TrendingFlatIcon
  return (
    <Box className="flex items-center gap-0.5" sx={{ mt: 0.5 }}>
      <Icon sx={{ fontSize: 12, color }} />
      <Typography variant="caption" sx={{ color, fontWeight: 500 }}>
        {delta.text}
      </Typography>
    </Box>
  )
}

function GradeChip({ grade }) {
  const cfg = GRADE_CONFIG[grade] ?? { bg: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.6)' }
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1,
        py: 0.25,
        borderRadius: '16px',
        bgcolor: cfg.bg,
        color: cfg.color,
        fontSize: 12,
        lineHeight: '18px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {grade}
    </Box>
  )
}

// ── KPI Card ──────────────────────────────────────────────

function KpiCard({ title, value, unit, delta, hint, icon: Icon }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box className="flex items-start justify-between">
          <Typography variant="body1">{title}</Typography>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: '#C5F0F7',
              color: PRIMARY_DARK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              '& svg': { fontSize: 20 },
            }}
          >
            <Icon />
          </Box>
        </Box>
        <Box className="mt-3 flex items-baseline gap-1">
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: 0,
              color: 'text.primary',
            }}
          >
            {value}
          </Typography>
          {unit && (
            <Typography variant="body2" color="textSecondary" sx={{ pb: '4px' }}>
              {unit}
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 1 }}>
          {delta && <DeltaRow delta={delta} />}
          {hint && !delta && (
            <Typography variant="caption" color="textSecondary">
              {hint}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

// ── Section card wrapper (with optional right-side header element) ─

function SectionCard({ title, subtitle, headerRight, children }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: 2 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box className="flex items-start justify-between" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {headerRight}
        </Box>
        <Box sx={{ flex: 1 }}>{children}</Box>
      </CardContent>
    </Card>
  )
}

// ── Pie + legend rows (for service / revenue share) ────────

function ShareCardContent({ data, totalLabel, unit, valueFormatter }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const fmt = valueFormatter ?? ((v) => v.toLocaleString())
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
      <Box sx={{ width: 220, flexShrink: 0 }}>
        <ServiceShareChart
          data={data}
          totalLabel={totalLabel}
          unit={unit}
          totalFormatter={fmt}
          height={220}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(1)
          return (
            <Box
              key={item.name}
              className="flex items-center justify-between"
              sx={{ py: 0.75 }}
            >
              <Box className="flex items-center gap-2">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: item.color,
                  }}
                />
                <Typography variant="body1">{item.name}</Typography>
              </Box>
              <Box className="flex items-baseline gap-4">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {fmt(item.value)} {unit}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {pct}%
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

// ── Health rank card (Top 3 + Bottom 2, single visual per user choice) ─

function RankCard({ item }) {
  return (
    <Card sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.08)' }}>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box className="flex items-start gap-2">
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: PRIMARY,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            #{item.rank}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box className="flex items-start justify-between gap-1">
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </Typography>
              <GradeChip grade={item.grade} />
            </Box>
            <Typography variant="caption" color="textSecondary">
              {item.type}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box className="flex flex-col gap-1">
          {item.metrics.map((m) => {
            const isOk = m.status === 'ok'
            const Icon = isOk ? CheckCircleIcon : WarningAmberIcon
            const iconColor = isOk ? green[500] : WARNING
            return (
              <Box
                key={m.label}
                className="flex items-center justify-between"
                sx={{ py: 0.25 }}
              >
                <Typography variant="body2" color="textSecondary">
                  {m.label}
                </Typography>
                <Box className="flex items-center gap-1">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {m.value}
                  </Typography>
                  <Icon sx={{ fontSize: 14, color: iconColor }} />
                </Box>
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}

// ── Facility list table ───────────────────────────────────

const headCellSx = {
  bgcolor: '#ECEFF1',
  color: '#546E7A',
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: '0.17px',
  py: 1,
  px: 2,
  borderBottom: 'none',
  whiteSpace: 'nowrap',
}

const bodyCellSx = {
  py: 1.25,
  px: 2,
  fontSize: 14,
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  verticalAlign: 'middle',
}

function YoyCell({ value }) {
  if (value == null) {
    return <Typography variant="body2" color="textSecondary">—</Typography>
  }
  const isUp = value >= 0
  const Icon = isUp ? ArrowUpwardIcon : ArrowDownwardIcon
  const color = isUp ? green[500] : WARNING
  return (
    <Box className="flex items-center gap-0.5">
      <Icon sx={{ fontSize: 14, color }} />
      <Typography variant="body2" sx={{ color, fontWeight: 500 }}>
        {isUp ? `+${value}` : value}%
      </Typography>
    </Box>
  )
}

function FacilityTable() {
  return (
    <TableContainer>
      <Table size="small" sx={{ '& th, & td': { whiteSpace: 'nowrap' } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>機構名稱 / 類型</TableCell>
            <TableCell sx={headCellSx} align="right">服務人數</TableCell>
            <TableCell sx={headCellSx} align="right">員工數（新入）</TableCell>
            <TableCell sx={headCellSx} align="right">流動率</TableCell>
            <TableCell sx={headCellSx} align="center">照護比</TableCell>
            <TableCell sx={headCellSx} align="right">意外事件</TableCell>
            <TableCell sx={headCellSx} align="right">當月營收</TableCell>
            <TableCell sx={headCellSx} align="right">YOY</TableCell>
            <TableCell sx={headCellSx} align="center">健康度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilityList.map((row) => {
            const warnTurnover = row.turnover > TURNOVER_WARNING_THRESHOLD
            return (
              <TableRow key={row.name} hover>
                <TableCell sx={bodyCellSx}>
                  <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                    {row.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.type}
                  </Typography>
                </TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
                    {row.service}
                  </Typography>
                  <Typography component="span" variant="caption" color="textSecondary" sx={{ ml: 0.5 }}>
                    （+{row.serviceNew}）
                  </Typography>
                </TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
                    {row.staff}
                  </Typography>
                  <Typography component="span" variant="caption" color="textSecondary" sx={{ ml: 0.5 }}>
                    （+{row.staffNew}）
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    color: warnTurnover ? WARNING : 'text.primary',
                    fontWeight: warnTurnover ? 700 : 400,
                  }}
                  align="right"
                >
                  {row.turnover}%
                </TableCell>
                <TableCell sx={bodyCellSx} align="center">{row.careRatio}</TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  {row.incidents > 0 ? row.incidents : ''}
                </TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  ${row.revenue.toLocaleString()} 萬
                </TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  <Box sx={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
                    <YoyCell value={row.yoy} />
                  </Box>
                </TableCell>
                <TableCell sx={bodyCellSx} align="center">
                  <GradeChip grade={row.grade} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// ── Page sections ─────────────────────────────────────────

function PageHeader() {
  return (
    <Paper sx={{ borderRadius: '8px' }}>
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            集團總覽
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            全集團當月營運快照與近 13 個月趨勢
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, flexShrink: 0 }}>
          {reportDate}
        </Typography>
      </Box>
    </Paper>
  )
}

function KpiRow() {
  return (
    <Grid container spacing={2}>
      {kpis.map((kpi) => (
        <Grid key={kpi.key} size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title={kpi.title}
            value={kpi.value}
            unit={kpi.unit}
            delta={kpi.delta}
            hint={kpi.hint}
            icon={KPI_ICONS[kpi.key]}
          />
        </Grid>
      ))}
    </Grid>
  )
}

function ServiceRow() {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard title="服務人數趨勢" subtitle="近 13 個月（住宿 / 日照 / 居服）">
          <StackedBarChart
            months={serviceTrend.months}
            series={serviceTrend.series}
            yAxisSuffix=" 人"
            height={280}
          />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard title="服務人數佔比" subtitle="當月（2026/05）">
          <ShareCardContent
            data={serviceShareCurrent}
            totalLabel="服務人數"
            unit="人"
          />
        </SectionCard>
      </Grid>
    </Grid>
  )
}

function StaffRow() {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard title="員工人數趨勢" subtitle="近 13 個月（住宿 / 日照 / 居服）">
          <StackedBarChart
            months={staffTrend.months}
            series={staffTrend.series}
            yAxisSuffix=" 人"
            height={280}
          />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard title="流動率趨勢" subtitle="近 13 個月（虛線為整體平均）">
          <TrendLineChart
            months={turnoverTrend.months}
            series={turnoverTrend.series}
            yAxisSuffix="%"
            height={280}
          />
        </SectionCard>
      </Grid>
    </Grid>
  )
}

function RevenueRow() {
  const yoyBadge = (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: 'rgba(46,125,50,0.12)',
        color: green[700],
        px: 1,
        py: 0.25,
        borderRadius: '16px',
        flexShrink: 0,
      }}
    >
      <ArrowUpwardIcon sx={{ fontSize: 14 }} />
      <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
        本月 YoY +{revenueTrend.yoyCurrent}%
      </Typography>
    </Box>
  )

  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard title="營收佔比" subtitle="當月（2026/05，單位：萬元）">
          <ShareCardContent
            data={revenueShareCurrent}
            totalLabel="本月營收"
            unit="萬元"
          />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="營收月趨勢"
          subtitle="近 13 個月（柱狀為各服務別、折線為 YoY 成長率）"
          headerRight={yoyBadge}
        >
          <RevenueComposedChart
            months={revenueTrend.months}
            series={revenueTrend.series}
            yoy={revenueTrend.yoy}
            height={280}
          />
        </SectionCard>
      </Grid>
    </Grid>
  )
}

function RankingSection() {
  return (
    <Paper sx={{ borderRadius: '8px', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          機構健康度排名
        </Typography>
        <Typography variant="caption" color="textSecondary">
          當月（2026/05）— Top 3 + Bottom 2
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        {facilityRankings.map((item) => (
          <Grid key={item.rank} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <RankCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

function FacilityListSection() {
  return (
    <Paper sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          各機構概況
        </Typography>
        <Typography variant="caption" color="textSecondary">
          當月（2026/05）— 流動率超過 {TURNOVER_WARNING_THRESHOLD}% 以橙色加粗顯示
        </Typography>
      </Box>
      <FacilityTable />
    </Paper>
  )
}

// ── Page ──────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <PageHeader />
      <KpiRow />
      <ServiceRow />
      <StaffRow />
      <RevenueRow />
      <RankingSection />
      <FacilityListSection />
    </Box>
  )
}
